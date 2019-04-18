Lambda-Protractor an Extention of Protractor
[![Build Status](https://travis-ci.org/angular/protractor.svg?branch=master)](https://travis-ci.org/angular/protractor) [![CircleCI Status](https://circleci.com/gh/angular/protractor.svg?style=shield)](https://circleci.com/gh/angular/protractor) [![Join the chat at https://gitter.im/angular/protractor](https://badges.gitter.im/angular/protractor.svg)](https://gitter.im/angular/protractor)
==========

[Protractor](http://angular.github.io/protractor) is an end-to-end test framework for [Angular](http://angular.io/) and [AngularJS](http://angularjs.org) applications. Protractor is a [Node.js](http://nodejs.org/) program built on top of [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs). Protractor runs tests against your application running in a real browser, interacting with it as a user would.

## Example

Run : ./node_modules/.bin/protractor conf/single.conf.js

```js
  conf/single.conf.js

  exports.config = {
    'specs': ['../specs/single.js'],
    'lambdaUsername': process.env.LT_USERNAME || '<your username>',
    'lambdaAccessKey': process.env.LT_USERNAME || '<your username>',
    'capabilities': {
      "build" : "your build name",
      "name" : "your test name",
      "platform" : "macOS High Sierra",
      "browserName" : "Safari",
      "version" : "11.0",
      "resolution" : "1280x960",
      "selenium_version" : "3.13.0",
      "console" : true,
      "network" : true,
      "visual" : true,
      "timezone" : "UTC+05:30",
      "safari.popups" : true,
      "safari.cookies" : true
    }
  };
  
  specs/single.js
  
  describe('Add todo Lists', function () {
    browser.ignoreSynchronization = true;
    it('Add Customer Test', function () {
      browser.get('https://lambdatest.github.io/sample-todo-app/');
      browser.driver.findElement(by.name('li1')).then(function (foundElement) {
        foundElement.click();
      });
      browser.driver.findElement(by.name('li2')).then(function (foundElement) {
        foundElement.click();
      });
      browser.driver.findElement(by.id('sampletodotext')).then(function (foundElement) {
        foundElement.clear();
        foundElement.sendKeys("Yey, Let's add it to list");
      });
      browser.driver.findElement(by.id('addbutton')).then(function (foundElement) {
        foundElement.click();
      });
      var foo = element(by.xpath('//html/body/div/div/div/ul/li[6]/span'));
      expect(foo.getText()).toEqual("Yey, Let's add it to list");
    });
  });

```

## Compatibility

Protractor 5 is compatible with nodejs v6 and newer.

Protractor works with AngularJS versions greater than 1.0.6/1.1.4, and is compatible with Angular applications. Note that for Angular apps, the `binding` and `model` locators are not supported. We recommend using `by.css`.

## Getting Started

See the [Protractor Website](http://www.protractortest.org) for most documentation.

To get set up and running quickly:

- Work through the [Tutorial](http://www.protractortest.org/#/tutorial)
- See the [API](http://www.protractortest.org/#/api)

Once you are familiar with the tutorial, you’re ready to move on. To modify your environment, see the Protractor Setup docs. To start writing tests, see the Protractor Tests docs.

To better understand how Protractor works with the Selenium WebDriver and Selenium Server see the reference materials.

## Getting Help

Check the [Protractor FAQ](https://github.com/angular/protractor/blob/master/docs/faq.md) and read through the [Top 20 questions on StackOverflow](http://stackoverflow.com/questions/tagged/protractor?sort=votes&pageSize=20).

Please ask usage and debugging questions on [StackOverflow](http://stackoverflow.com/questions/tagged/protractor) (use the ["protractor"](http://stackoverflow.com/questions/ask?tags=protractor) tag), the [Gitter](https://gitter.im/angular/protractor) chat room, or in the [Angular discussion group](https://groups.google.com/forum/?fromgroups#!forum/angular). (Please do not ask support questions here on Github.)

## For Contributors

See [DEVELOPER.md](https://github.com/angular/protractor/blob/master/DEVELOPER.md)
