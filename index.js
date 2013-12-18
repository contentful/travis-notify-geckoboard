#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var questor = require('questor');

var pushBaseURI = 'https://push.geckoboard.com/v1/send/';

exports.notifyDashboard = notifyDashboard;
function notifyDashboard(options, data) {
  var payload = {
    api_key: options.apiKey,
    data: data
  };
  return questor(pushBaseURI + options.widgetKey, {
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(function(response) {
    if (response.status !== 200) {
      throw new Error(response.body);
    }
  });
}

exports.TextWidgetValue = TextWidgetValue;
function TextWidgetValue() {}
TextWidgetValue.create = function(properties) {
  return _.extend(new TextWidgetValue(), {item: properties});
};

exports.TravisCIEnv = TravisCIEnv;
function TravisCIEnv() {}
TravisCIEnv.createFromEnv = function(env) {
  return _.extend(new TravisCIEnv(), {
    branch: env.TRAVIS_BRANCH,
    buildNumber: env.TRAVIS_BUILD_NUMBER,
    repoSlug: env.TRAVIS_REPO_SLUG,
    testResult: env.TRAVIS_TEST_RESULT
  });
};
TravisCIEnv.prototype.toTextWidgetValue = function() {
  var passed = (this.testResult === '0');
  var color = passed ? 'green' : 'red';
  var text = passed ? 'PASS' : 'FAIL';
  var type = passed ? 0 : 1;
  return TextWidgetValue.create({
    text: '<span style="color: ' + color + '">' + text + '</span>',
    type: type
  });
};
