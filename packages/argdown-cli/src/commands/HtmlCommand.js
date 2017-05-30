import {app} from '../index.js';

export const command = 'html [inputGlob] [outputDir]';
export const desc = 'export Argdown input as HTML files';
export const builder = {
  headless: {
    alias: 'hl',
    describe: 'Export without Html, Head and Body elements',
    type: 'boolean'
  },
  head: {
    alias: 'h',
    describe: 'Allows you to prepend a custom head element to the html (has to include doctype and html opening tag)',
    type: 'string'
  },
  css: {
    alias: 'c',
    describe: 'path to custom CSS file to include in the default HTML head',
    type: 'string'
  },
  title: {
    alias: 't',
    describe: 'Title for HTML document (default: H1 element content)',
    type: 'string'
  },
  lang: {
    alias: 'l',
    describe: 'Language of HTML document',
    type: 'string'
  },
  charset: {
    alias: 'cs',
    describe: 'Charset of HTML document',
    type: 'string',
  }
};
export const handler = function(argv){
  let config = app.loadConfig(argv.config);
  
  config.html = config.html || config.HtmlExport ||{};

  if(argv.headless){
    config.html.headless = true;
  }
  if(argv.title){
    config.html.title = argv.title;
  }
  
  if(argv.inputGlob){
    config.input = argv.inputGlob;
  }
  config.saveAs = config.saveAs ||config.SaveAsFilePlugin ||{};
  if(argv.outputDir){
    config.saveAs.outputDir = argv.outputDir;
  }
  
  config.verbose = argv.verbose ||config.verbose;
  config.watch = argv.watch ||config.watch;
  config.process = ["preprocessor","export-html","save-as-html"];
  if(argv.css){
    config.html.css = argv.css;
  }else{
    config.process.push("copy-default-css");
  }

  app.load(config);  
} 
