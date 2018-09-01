;'use strict';

var firebase_config = {
	apiKey: "",
	authDomain: "[projectId].firebaseapp.com",
	databaseURL: "https://[projectId].firebaseio.com",
	projectId: "[projectId]",
	storageBucket: "[projectId].appspot.com",
	messagingSenderId: ""
};


var remix_config = {
    apiUrl: "https://127.0.0.1:8181/",
    coinUnitPlaces: 12,
    txMinConfirms: 10,
    coinSymbol: 'REMIX',
    openAliasPrefix: "remix",
    coinName: 'RemixCoin',
    coinUriPrefix: 'remix:',
    addressPrefix: 4058640,
    networkFee: new JSBigInt('10000000000'),
    defaultMixin: 2,
    idleTimeout: 10,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 60,
    debugMode: true,
    testDriving: true, 
    donateAddress: "REMXiqQhgfqWtZ1gfxP4iDbXEV4f8cUDFAp2Bz43PztJSJvv2mUqG4Z2YFBMauJV74YCDcJLyqkbCfsC55LNJhQfZxdiE5tGxKq"
};


/*
 * Note: 
 * 	1. Create and populate your own mock wallet values below if and when 
 * 		you find yourself behind the TDD wheel.
 * 		
 * 	2. You'll need to reinsert the js/test.js JavaScript include at the 
 * 		bottom of index.html in order to run tests against the values
 * 		you've set within the remix_config_for_testing object below.
 *
 * 	3. remix_config.debugMode != remix_config.testDriving. debugMode simply
 * 		allows one to see thrown errors and object dumps within the 
 * 		console, while testDriving will run exhaustive testing on 
 * 		system initial load (browser or emulated)
 * 	
 */
var remix_config_for_testing = {
	wallet_address: "",

	view_key: "",
	spend_key: "",

    sec_view_key: "",
    sec_spend_key: "",

	electrum_words: "",

    send_to_wallet_address: "",
    send_to_amount: 0.02
}
