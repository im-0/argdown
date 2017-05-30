'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlExport = function () {
  _createClass(HtmlExport, [{
    key: 'run',
    value: function run(data) {
      if (data.config) {
        if (data.config.html) {
          this.config = data.config.html;
        } else if (data.config.HtmlExport) {
          this.config = data.config.HtmlExport;
        }
      }

      data.html = this.html;
      return data;
    }
  }, {
    key: 'config',
    set: function set(config) {
      var previousSettings = this.settings;
      if (!previousSettings) {
        previousSettings = {
          headless: false,
          cssFile: './argdown.css',
          title: 'Argdown Document',
          lang: 'en',
          charset: 'utf8'
        };
      }
      this.settings = _.defaultsDeep({}, config, previousSettings);
    }
  }]);

  function HtmlExport(config) {
    _classCallCheck(this, HtmlExport);

    this.name = "HtmlExport";
    this.html = "";
    var $ = this;
    this.config = config;
    this.htmlIds = {};

    this.argdownListeners = {
      argdownEntry: function argdownEntry(node, parentNode, childIndex, config) {
        if (config) {
          $.config = config;
        }
        $.html = "";
        $.htmlIds = {};
        if (!$.settings.headless) {
          var head = $.settings.head;
          if (!head) {
            head = "<!doctype html>\n\n" + "<html lang='" + $.settings.lang + "'>\n" + "<head>\n" + "<meta charset='" + $.settings.charset + "'>\n" + "<title>" + $.settings.title + "</title>\n";
            if ($.settings.cssFile) {
              head += "<link rel='stylesheet' href='" + $.settings.cssFile + "'>\n";
            }
            head += "</head>";
          }
          $.html += head;
          $.html += "<body>";
        }
        $.html += "<div class='argdown'>";
      },
      argdownExit: function argdownExit() {
        if (!$.settings.headless) {
          $.html += "</body></html>";
        }
      },
      statementEntry: function statementEntry() {
        return $.html += "<div class='statement'>";
      },
      statementExit: function statementExit() {
        return $.html += "</div>";
      },
      StatementDefinitionEntry: function StatementDefinitionEntry(node) {
        var htmlId = $.getHtmlId("statement", node.statement.title);
        $.htmlIds[htmlId] = node.statement;
        $.html += "<span id='" + htmlId + "' class='definition statement-definition definiendum'>[<span class='title statement-title'>" + node.statement.title + "</span>]: </span>";
      },
      StatementReferenceEntry: function StatementReferenceEntry(node) {
        var htmlId = $.getHtmlId("statement", node.statement.title, true);
        $.html += "<a href='#" + htmlId + "' class='reference statement-reference'>[<span class='title statement-title'>" + node.statement.title + "</span>] </a>";
      },
      StatementMentionEntry: function StatementMentionEntry(node) {
        var htmlId = $.getHtmlId("statement", node.title, true);
        $.html += "<a href='#" + htmlId + "' class='mention statement-mention'>@[<span class='title statement-title'>" + node.title + "</span>]</a>" + node.trailingWhitespace;
      },
      argumentReferenceEntry: function argumentReferenceEntry(node) {
        var htmlId = $.getHtmlId("argument", node.argument.title, true);
        $.html += "<a href='#" + htmlId + "' class='argument-reference'>&lt;<span class='title argument-title'>" + node.argument.title + "</span>&gt; </a>";
      },
      argumentDefinitionEntry: function argumentDefinitionEntry(node) {
        var htmlId = $.getHtmlId("argument", node.argument.title);
        $.htmlIds[htmlId] = node.argument;
        $.html += "<div id='" + htmlId + "' class='argument-definition'><span class='definiendum argument-definiendum'>&lt;<span class='title argument-title'>" + node.argument.title + "</span>&gt;: </span><span class='argument-definiens definiens description'>";
      },
      ArgumentMentionEntry: function ArgumentMentionEntry(node) {
        var htmlId = $.getHtmlId("argument", node.title, true);
        $.html += "<a href='#" + htmlId + "' class='mention argument-mention'>@&lt;<span class='title argument-title'>" + node.title + "</span>&gt;</a>" + node.trailingWhitespace;
      },
      argumentDefinitionExit: function argumentDefinitionExit() {
        return $.html += "</span></div>";
      },
      incomingSupportEntry: function incomingSupportEntry() {
        $.html += "<div class='incoming support relation'><div class='incoming support relation-symbol'><span>+&gt;</span></div>";
      },
      incomingSupportExit: function incomingSupportExit() {
        return $.html += "</div>";
      },
      incomingAttackEntry: function incomingAttackEntry() {
        $.html += "<div class='incoming attack relation'><div class='incoming attack relation-symbol'><span>-&gt;</span></div>";
      },
      incomingAttackExit: function incomingAttackExit() {
        return $.html += "</div>";
      },
      outgoingSupportEntry: function outgoingSupportEntry() {
        $.html += "<div class='outgoing support relation'><div class='outgoing support relation-symbol'><span>+</span></div>";
      },
      outgoingSupportExit: function outgoingSupportExit() {
        $.html += "</div>";
      },
      outgoingAttackEntry: function outgoingAttackEntry() {
        $.html += "<div class='outgoing attack relation'><div class='outgoing attack relation-symbol'><span>-</span></div>";
      },
      outgoingAttackExit: function outgoingAttackExit() {
        $.html += "</div>";
      },
      contradictionEntry: function contradictionEntry() {
        $.html += "<div class='contradiction relation'><div class='contradiction relation-symbol'><span>&gt;&lt;</span></div>";
      },
      contradictionExit: function contradictionExit() {
        $.html += "</div>";
      },
      relationsEntry: function relationsEntry() {
        $.html += "<div class='relations'>";
      },
      relationsExit: function relationsExit() {
        $.html += "</div>";
      },
      orderedListEntry: function orderedListEntry() {
        return $.html += "<ol>";
      },
      orderedListExit: function orderedListExit() {
        return $.html += "</ol>";
      },
      unorderedListEntry: function unorderedListEntry() {
        return $.html += "<ul>";
      },
      unorderedListExit: function unorderedListExit() {
        return $.html += "</ul>";
      },
      orderedListItemEntry: function orderedListItemEntry() {
        return $.html += "<li>";
      },
      orderedListItemExit: function orderedListItemExit() {
        return $.html += "</li>";
      },
      unorderedListItemEntry: function unorderedListItemEntry() {
        return $.html += "<li>";
      },
      unorderedListItemExit: function unorderedListItemExit() {
        return $.html += "</li>";
      },
      headingEntry: function headingEntry(node) {
        if (node.heading == 1) {
          if ($.settings.title == 'Argdown Document') {
            $.html = $.html.replace('<title>Argdown Document</title>', '<title>' + node.text + '</title>');
          }
        }
        var htmlId = $.getHtmlId("heading", node.text);
        $.htmlIds[htmlId] = node;
        $.html += "<h" + node.heading + " id='" + htmlId + "'>";
      },
      headingExit: function headingExit(node) {
        return $.html += "</h" + node.heading + ">";
      },
      freestyleTextEntry: function freestyleTextEntry(node, parentNode) {
        if (parentNode.name != 'inferenceRules' && parentNode.name != 'metadataStatement') $.html += node.text;
      },
      boldEntry: function boldEntry() {
        return $.html += "<b>";
      },
      boldExit: function boldExit(node) {
        return $.html += "</b>" + node.trailingWhitespace;
      },
      italicEntry: function italicEntry() {
        return $.html += "<i>";
      },
      italicExit: function italicExit(node) {
        return $.html += "</i>" + node.trailingWhitespace;
      },
      LinkEntry: function LinkEntry(node) {
        return $.html += "<a href='" + node.url + "'>" + node.text + "</a>" + node.trailingWhitespace;
      },
      argumentEntry: function argumentEntry() {
        return $.html += "<div class='argument'>";
      },
      argumentExit: function argumentExit() {
        return $.html += "</div>";
      },
      argumentStatementEntry: function argumentStatementEntry(node) {
        if (node.statement.role == 'conclusion') {
          var inference = node.statement.inference;
          var metadataKeys = Object.keys(inference.metaData);
          if (metadataKeys.length == 0 && inference.inferenceRules.length == 0) {
            $.html += "<div class='inference'>";
          } else {
            $.html += "<div class='inference with-data'>";
          }

          $.html += "<span class='inference-rules'>";
          if (inference.inferenceRules.length > 0) {
            var i = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = inference.inferenceRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var inferenceRule = _step.value;

                if (i > 0) $.html += ", ";
                $.html += "<span class='inference-rule'>" + inferenceRule + "</span>";
                i++;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            $.html += "</span> ";
          }
          if (metadataKeys.length > 0) {
            $.html += "<span class='metadata'>(";
            for (var _i = 0; _i < metadataKeys.length; _i++) {
              var key = metadataKeys[_i];
              $.html += "<span class='meta-data-statement'>";
              $.html += "<span class='meta-data-key'>" + key + ": </span>";
              if (_.isString(inference.metaData[key])) {
                $.html += "<span class='meta-data-value'>" + inference.metaData[key] + "</span>";
              } else {
                var j = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = inference.metaData[key][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    if (j > 0) $.html += ", ";
                    $.html += "<span class='meta-data-value'>" + value + "</span>";
                    j++;
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              }
              if (_i < metadataKeys.length - 1) $.html += "; ";
              $.html += "</span>";
            }
            $.html += " )</span>";
          }

          $.html += "</div>";
        }
        $.html += "<div class='" + node.statement.role + " argument-statement'><div class='statement-nr'>(<span>" + node.statementNr + "</span>)</div>";
      },
      argumentStatementExit: function argumentStatementExit() {
        return $.html += "</div>";
      }
    };
  }

  _createClass(HtmlExport, [{
    key: 'getHtmlId',
    value: function getHtmlId(type, title, ignoreDuplicates) {
      var id = type + "-" + title;
      id = id.toLowerCase();
      id = id.replace(/ä/g, "ae");
      id = id.replace(/ö/g, "oe");
      id = id.replace(/ü/g, "ue");
      id = id.replace(/ß/g, "ss");
      id = id.replace(/\s/g, "-");
      id = id.replace(/[^a-z0-9\-]/g, "");
      if (!ignoreDuplicates) {
        var originalId = id;
        var i = 1;
        while (this.htmlIds && this.htmlIds[id]) {
          i++;
          id = originalId + "-occurrence-" + i;
        }
      }
      return id;
    }
  }, {
    key: 'replaceAll',
    value: function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }
  }, {
    key: 'escapeRegExp',
    value: function escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
  }]);

  return HtmlExport;
}();

module.exports = {
  HtmlExport: HtmlExport
};
//# sourceMappingURL=HtmlExport.js.map