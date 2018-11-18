var locators = require('../utils/locators.js');

module.exports = {
    allInvaders: function () {
        return element.all(by.css(locators.invaders));
    },

    nextInvader: function () {
        return element.all(by.css(locators.invaders)).get(0);
    },

    allVisibleInvaders: function () {
        var links = element.all(by.css(locators.invaders));
        return links.isDisplayed();
    },

    scoreMeter: function () {
        return element(by.css(locators.score));
    },

    header1: function () {
        return element(by.css(locators.header1));
    },

    header2: function () {
        return element(by.css(locators.header2));
    }
};
