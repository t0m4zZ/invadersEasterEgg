exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: '../specs/*.js',


    baseUrl: 'https://jscrambler.com',

    allScriptsTimeout: 360000,

    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 360000,
        isVerbose: true
    },

    params: {
        heightDefault: 900,
        widthDefault: 1440,
        widthLimit: 1230,
        widthBellowLimit: 1200
    },
};
