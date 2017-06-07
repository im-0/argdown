import {ArgdownApplication, ModelPlugin, HtmlExport, JSONExport, TagPlugin} from 'argdown-parser';
import {MapMaker, DotExport, ArgMLExport} from 'argdown-map-maker';
import {SaveAsFilePlugin} from './plugins/SaveAsFilePlugin.js';
import {CopyDefaultCssPlugin} from './plugins/CopyDefaultCssPlugin.js';
import {StdOutPlugin} from './plugins/StdOutPlugin.js';
import * as _ from 'lodash';

let glob = require('glob');
let fs = require('fs');
let path = require('path');
let chokidar = require('chokidar');
let requireUncached = require("require-uncached");

const app = new ArgdownApplication();
const modelPlugin = new ModelPlugin();
const htmlExport = new HtmlExport();
const tagPlugin = new TagPlugin();
const mapMaker = new MapMaker();
const dotExport = new DotExport();
const argmlExport = new ArgMLExport();
const jsonExport = new JSONExport();
const saveAsHtml = new SaveAsFilePlugin({
  outputDir: './html',
  dataKey: 'html',
  extension: '.html'
});
const copyDefaultCss = new CopyDefaultCssPlugin();

const saveAsDot = new SaveAsFilePlugin({
  outputDir: './dot',
  dataKey: 'dot',
  extension: '.dot'
});
const saveAsArgML = new SaveAsFilePlugin({
  outputDir: './graphml',
  dataKey: 'argml',
  extension: '.graphml'
});
const saveAsJSON = new SaveAsFilePlugin({
  outputDir: './json',
  dataKey: 'json',
  extension: '.json'
});
const stdoutDot = new StdOutPlugin({dataKey:'dot'});
const stdoutArgML = new StdOutPlugin({dataKey:'argml'});
const stdoutJSON = new StdOutPlugin({dataKey:'json'});
const stdoutHtml = new StdOutPlugin({dataKey:'html'});

app.addPlugin(modelPlugin, "build-model");
app.addPlugin(tagPlugin, "build-model");

app.addPlugin(htmlExport, "export-html");
app.addPlugin(copyDefaultCss, "copy-default-css");
app.addPlugin(saveAsHtml, "save-as-html");
app.addPlugin(stdoutHtml, "stdout-html");

app.addPlugin(mapMaker, "export-json");
app.addPlugin(jsonExport, "export-json");
app.addPlugin(saveAsJSON, "save-as-json");
app.addPlugin(stdoutJSON, "stdout-json");

app.addPlugin(mapMaker, "export-dot");
app.addPlugin(dotExport, "export-dot");
app.addPlugin(saveAsDot, "save-as-dot");
app.addPlugin(stdoutDot, "stdout-dot");

app.addPlugin(mapMaker, "export-argml");
app.addPlugin(argmlExport, "export-argml");
app.addPlugin(saveAsArgML, "save-as-argml");
app.addPlugin(stdoutArgML, "stdout-argml");

app.load = function(config){
  if(!config.input){
    config.input = "./*.argdown";
  }
  const $ = this;
  let absoluteInputGlob = path.resolve(process.cwd(),config.input);
  if(config.watch){
    const watcher = chokidar.watch(absoluteInputGlob, {});
    const watcherConfig = _.cloneDeep(config);
    watcherConfig.watch = false;
    
    watcher
    .on('add', path => {
      if(config.verbose){
        console.log(`File ${path} has been added.`);        
      }
      watcherConfig.input = path;
      $.load(watcherConfig);
    })
    .on('change', path => {
      if(config.verbose){
        console.log(`File ${path} has been changed.`);        
      }
      watcherConfig.input = path;
      $.load(watcherConfig);
    })
    .on('unlink', path => {
      if(config.verbose){
        console.log(`File ${path} has been removed.`);        
      }
    });    
  }else{
    glob(absoluteInputGlob, function (er, files) {
      if(er){
        console.log(er);
        return;
      }else{
        for(let file of files){
          if(config.verbose){
            console.log("Processing file: "+file);
          }
          try{
            const input = fs.readFileSync(file, 'utf8');
            config.saveAs = config.saveAs ||{};
            config.saveAs.sourceFile = file;
            $.run({input: input, config:config});            
          }catch(e){
            console.log(e);
          }
        }
      }
    });    
  }
}

/**
 * Taken from eslint: https://github.com/eslint/eslint/blob/master/lib/config/config-file.js
 * Loads a JavaScript configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
app.loadJSFile = function loadJSFile(filePath) {
    let absoluteFilePath = path.resolve(process.cwd(), filePath);
    try {
        return requireUncached(absoluteFilePath);
    } catch (e) {
        e.message = `Cannot read file: ${absoluteFilePath}\nError: ${e.message}`;
        throw e;
    }
}

app.loadConfig = function(filePath){
  filePath = filePath || './argdown.config.js';
  let config = {};
  try{
    let jsModuleExports = this.loadJSFile(filePath);
    if(jsModuleExports.config){
      config = jsModuleExports.config;
    }else{ // let's try the default export
      config = jsModuleExports;
    }
  }catch(e){
    // console.log(e);
  }
  return config;
}

export {
  app, CopyDefaultCssPlugin, SaveAsFilePlugin
};