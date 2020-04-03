import { html } from "lit-html";
import {
  component,
  useState,
  useEffect,
  useRef,
  useLayoutEffect
} from "haunted";
import { ArgdownMark } from "./ArgdownMark";
import "./snow-in-spring.argdown-theme.css";
import "./global-styles.css";
import { ExpandIcon } from "./ExpandIcon";
import { MinimizeIcon } from "./MinimizeIcon";
import { select } from "d3-selection";
import { addZoom, removeZoom } from "./zoomUtils";

const ArgdownMap = function(el: HTMLElement) {
  const [activeView, setActiveView] = useState("map");
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomIsActive, setZoomIsActive] = useState(false);
  const [zoomMessage, setZoomMessage] = useState("");
  const initialHeight = useRef(null);
  const removeZoomTimeout: any = useRef(null);

  useEffect(() => {
    initialHeight.current = el.shadowRoot
      .querySelector(".component")
      .getBoundingClientRect().height;
  }, []);

  const onMouseOutMap = () => {
    setZoomMessage("");
    if (!removeZoomTimeout.current) {
      removeZoomTimeout.current = setTimeout(
        () => setZoomIsActive(false),
        3000
      );
    }
  };
  const onMouseOverMap = () => {
    if (removeZoomTimeout.current) {
      clearTimeout(removeZoomTimeout.current);
      removeZoomTimeout.current = null;
    }
    if (activeView == "map" && !zoomIsActive && zoomMessage == "") {
      setZoomMessage("Click once to enable zoom");
    }
  };
  const onMapClick = () => {
    setZoomMessage("");
    setZoomIsActive(true);
  };
  useEffect(() => {
    const mapSlot = el.shadowRoot.querySelector<HTMLSlotElement>(".map-slot");
    if (!mapSlot) {
      return;
    }

    const assignedNodes = mapSlot.assignedNodes();
    if (zoomIsActive && assignedNodes.length > 0) {
      const svg = select<HTMLElement, null>(
        assignedNodes[0] as HTMLElement
      ).select<SVGSVGElement>("svg");
      const g = svg.select<SVGGraphicsElement>("g");
      const mapView = select(el.shadowRoot.querySelector(".map-view"));
      if (!isExpanded) {
        mapView.attr("style", `height:${initialHeight.current}px;`);
      }
      const initialZoomState = {
        width: svg.attr("width"),
        height: svg.attr("height"),
        viewBox: svg.attr("viewBox"),
        transform: g.attr("transform")
      };
      svg.attr("width", "100%");
      svg.attr("height", "100%");
      svg.attr("viewBox", null);
      const zoomBehavior = addZoom(svg);
      return () => {
        removeZoom(svg, zoomBehavior);
        svg.attr("width", initialZoomState.width);
        svg.attr("height", initialZoomState.height);
        svg.attr("viewBox", initialZoomState.viewBox);
        g.attr("transform", initialZoomState.transform);
        mapView.attr("style", null);
      };
    }
  }, [zoomIsActive]);
  useEffect(() => {
    if (activeView !== "map" && zoomIsActive) {
      setZoomIsActive(false);
      if (removeZoomTimeout.current) {
        clearTimeout(removeZoomTimeout.current);
        removeZoomTimeout.current = null;
      }
    }
  }, [activeView, zoomIsActive]);
  useEffect(() => {
    if (isExpanded) {
      //remove style if zooming was already going on
      if (zoomIsActive) {
        const content = select(el.shadowRoot.querySelector(".content"));
        content.attr("style", null);
      }
      setZoomIsActive(true);
    } else {
      setZoomIsActive(false);
    }
  }, [isExpanded]);
  return html`
    ${styles}
    <div class="component ${isExpanded ? "expanded" : ""}">
      <header>
        ${ArgdownMark()}
        <nav>
          <div class="zoom-message">${zoomMessage}</div>
          <ul class="flat">
            <li>
              ${activeView === "map"
                ? html`
                    <button
                      title="Source"
                      @click=${() => setActiveView("source")}
                    >
                      Source
                    </button>
                  `
                : html`
                    <button title="Map" @click=${() => setActiveView("map")}>
                      Map
                    </button>
                  `}
            </li>
            <li>
              ${isExpanded
                ? html`
                    <button
                      title="Minimize"
                      @click=${() => {
                        setIsExpanded(false);
                      }}
                    >
                      ${MinimizeIcon()}
                    </button>
                  `
                : html`
                    <button title="Expand" @click=${() => setIsExpanded(true)}>
                      ${ExpandIcon()}
                    </button>
                  `}
            </li>
          </ul>
        </nav>
      </header>
      ${activeView === "map"
        ? html`
            <div
              @click=${onMapClick}
              @mouseout=${onMouseOutMap}
              @mouseover=${onMouseOverMap}
              class="map-view${zoomIsActive ? " zooming" : ""}"
            >
              <slot name="map" class="map-slot"></slot>
            </div>
          `
        : html`
            <div class="source-view"><slot name="source"></slot></div>
          `}
    </div>
  `;
};
const styles = html`
  <style>
    :host {
      display: block;
      background-color: #fff;
      border: 1px solid #eee;
    }
    :host > div {
      display: flex;
      background-color: #fff;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: auto;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    ::slotted([slot="map"]) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ::slotted([slot="source"]) {
      width: 100%;
      height: 100%;
      display: flex;
    }
    .map-view {
      width: 100%;
      padding-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .source-view {
      width: 100%;
      padding-top: 40px;
      display: flex;
    }
    .map-view.zooming {
      padding-top: 0px;
    }
    :host > .expanded .map-view,
    :host > .expanded .source-view {
      height: 100%;
      overflow-y: auto;
    }
    /* :host .content.zooming ::slotted(svg) {
      width: 100%;
    } */
    :host > div.expanded {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1000000;
    }
    nav {
      height: 2rem;
      width: 100%;
      display: flex;
      position: absolute;
      right: 3px;
      flex-direction: row;
      justify-content: flex-end;
      align-content: center;
      z-index: 10;
      top: 6px;
      pointer-events: none;
    }
    nav button,
    nav a {
      pointer-events: auto;
    }
    nav .zoom-message {
      color: #ccc;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      margin: 0 auto;
    }
    ul.flat {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
    }
    ul.flat li {
      margin: 0;
      padding: 0;
      display: flex;
    }
    button {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      display: inline-block;
      font-size: 0.8rem;
      color: #fff;
      background-color: #3e8eaf;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      border: 0;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid #38809d;
      font-weight: 500;
      margin: 0 3px;
    }
    button:hover {
      background-color: #387e9c;
    }
    button svg {
      height: 0.8rem;
      width: auto;
      color: #fff;
    }
  </style>
`;
customElements.define("argdown-map", component(ArgdownMap as any) as any);
