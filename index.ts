#!/usr/bin/env node
import * as chalk from 'chalk'
import * as doT from 'dot';
import * as fs from 'fs'

import axios from 'axios';
import { RenderServiceTemplate } from './render-service';

console.log(chalk.default.cyan('Swagger for Angular Services by JSG'))

doT.templateSettings = {
    evaluate:    /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode:      /\{\{!([\s\S]+?)\}\}/g,
    use:         /\{\{#([\s\S]+?)\}\}/g,
    define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    strip: false,
    append: true,
    selfcontained: false
  }

let serviceTemplate = fs.readFileSync('templates/service.template.ts','utf8');

axios.get('https://petstore.swagger.io/v2/swagger.json').then((res)=>{
    let paths = new RenderServiceTemplate(res.data).paths
    var tempFn = doT.template(serviceTemplate);
    var resultText = tempFn({serviceName: 'ApiService', paths: paths});
    console.log(resultText)
})


