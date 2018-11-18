var objects = require('../utils/objects.js');
var EC = protractor.ExpectedConditions;

module.exports = {
    waitAnimationLoad: function (object) {
        browser.wait(EC.visibilityOf(object.first()), 20000, 'Element not visible timing out');
    }
};
