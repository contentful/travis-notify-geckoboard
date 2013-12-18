#!/usr/bin/env node

'use strict';

var argv = require('optimist')
  .options('api-key',    {demand: true, alias: 'a'})
  .options('widget-key', {demand: true, alias: 'w'})
  .argv;
var main = require('..');

var apiKey = argv['api-key'];
var widgetKey = argv['widget-key'];

main.notifyDashboard({
  apiKey: apiKey,
  widgetKey: widgetKey
}, main.TravisCIEnv.createFromEnv(process.env).toTextWidgetValue());
