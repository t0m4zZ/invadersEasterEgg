var path = require('../utils/paths.js');
var utils = require('../utils/helpers.js');
var objects = require('../utils/objects.js');
var locators = require('../utils/locators.js');
var EC = protractor.ExpectedConditions;

describe('Easter egg', function() {

    beforeEach(function () {
        browser.waitForAngularEnabled(false);

        browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().setSize(browser.params.widthLimit, browser.params.heightDefault);

        browser.get(path.root);
    });

    it('Page load stuff - Visible atackers', function() {
        // All visible after animation inits
        utils.waitAnimationLoad(objects.allInvaders());

        // Check the invaders are visible
        expect(objects.allInvaders().isDisplayed()).toBeTruthy();

        // This only makes sence to test if the number of invaders don't change
        expect(objects.allInvaders().count()).toBe(15);

        // Check the Score meter don't appear on page load
        expect(objects.scoreMeter().isPresent()).toBe(false);
    });

    it('First Click', function() {
        utils.waitAnimationLoad(objects.allInvaders());

        // Kill the first invader
        // I've used executeScript to prevent click on overlaped element that happen in normal protractor click
        objects.allInvaders().then(function() {
            browser.executeScript(`document.querySelector("${locators.invaders}").click()`);
        });

        // Implicit check the Score Meter has appear & updated
        browser.wait(EC.visibilityOf(objects.scoreMeter(), 5000));
        expect(objects.scoreMeter().getText()).toBe('Score: 1');
    });

    it('Get Them all', function() {
        utils.waitAnimationLoad(objects.allInvaders());

        // Just a log counter
        objects.allVisibleInvaders().then(function (items) {
            console.log('Invaders left: ' + items.length);
        });

        // Hit all the invaders
        // I've used executeScript to prevent click on overlaped element that happen in normal protractor click
        objects.allInvaders().each(function(index) {
            browser.executeScript(`document.querySelector("${locators.invaders}").click()`);
            console.log(`Invader ${index} has been killed!`);
        });

        // Check there are no invaders left
        expect(objects.allInvaders().count()).toBe(0);

        // Check the Score meter is visible & have the "final message"
        browser.wait(EC.textToBePresentInElement(objects.scoreMeter(),'All threats eliminated. Well done!'), 5000);
        expect(objects.scoreMeter().isDisplayed()).toBe(true);
    });

    xit('Get Them all - waits for score meter version', function() {
        // This tests is the same of the above plus would wait for the ScoreMeter to update.
        // I personaly don't find it usefull because the scoreMeter was tested before
        // and the time of the test for the value it brings, it's not really worth it
        utils.waitAnimationLoad(objects.allInvaders());

        var initialInvaders = objects.allInvaders().then(function (items) {
            return items.length;
        });

        // Hit all the invaders
        // I've used executeScript to prevent click on overlaped element that happen in normal protractor click
        objects.allInvaders().each(function(element, index) {
            browser.executeScript(`document.querySelector("${locators.invaders}").click()`).then(function() {
                if (index != initialInvaders-1) {
                    return browser.wait(EC.textToBePresentInElement(objects.scoreMeter(), `Score: ${index + 1}`));
                }
                else {
                    return browser.wait(EC.textToBePresentInElement(objects.scoreMeter(), 'All threats eliminated. Well done!'));
                }
                console.log(`Invader ${index} has been killed!`);
            });

        });
    });
});

describe('Resolution below limit', function() {

    it('Invaders wont appear', function() {
        browser.waitForAngularEnabled(false);

        browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().setSize(browser.params.widthBellowLimit, browser.params.heightDefault);

        browser.get(path.root);

        // Just giving some time to the animations to load
        browser.sleep(2000);

        // Check the invader do not appear in this resolution
        expect(objects.allInvaders().isPresent()).toBe(false);
    });

    it('Increase resolution after open below limit', function() {
        browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().setSize(browser.params.widthLimit, browser.params.heightDefault);

        // All visible after animation inits
        utils.waitAnimationLoad(objects.allInvaders());

        // Check the invaders are visible
        expect(objects.allInvaders().isDisplayed()).toBeTruthy();
    });
});
