;'use strict';

function Remix() {
	document.addEventListener('DOMContentLoaded', function() {
		this._checkSetup();
		this._initFirebase();
		this._initAuth();
		this._initDOM();
		this._initSurface();
	}.bind(this));
}

Remix.prototype._error = function(error) {
	if(typeof window.remix_config != 'undefined' && 
		typeof window.remix_config.debugMode != 'undefined' && 
		window.remix_config.debugMode == true) {
			console.error(error);
	}
};

Remix.prototype._log = function(object) {
	if(typeof window.remix_config != 'undefined' && 
		typeof window.remix_config.testDriving != 'undefined' && 
		window.remix_config.testDriving == true) {
			console.log(object);
	}
};

Remix.prototype._checkSetup = function() {
	if (!window.firebase || !(firebase.app instanceof Function) || !window.firebase_config) {
		this.authenticated = false;
	} else if (config.storageBucket === '') {
		this.authenticated = false;
	}
};

Remix.prototype._initFirebase = function() {
	this.app = firebase.app();
	this.database = firebase.firestore();
	this.storage = firebase.storage();
};

Remix.prototype._initAuth = function() {
	this.auth = firebase.auth();
	this.auth.useDeviceLanguage();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Remix.prototype._initDOM = function() {
	this.signInButton = $('#sign-in-button');
	this.signInButton.on('click', this.signIn.bind(this));

	this.signOutButton = $('#sign-out-button');
	this.signOutButton.on('click', this.signOut.bind(this));
};

Remix.prototype._initSurface = function() {
	try {
		let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof window.remix.app[feature] === 'function');
		
	} catch (e) {
		console.error(e);
	}
};

Remix.prototype.signIn = function() {
	var provider = new firebase.auth.GoogleAuthProvider();

	this.auth.signInWithPopup(provider).then(function(result){
		var token = result.credential.accessToken;
		var user = result.user;
	});
};

Remix.prototype.signOut = function() {
	this.auth.signOut();
};

Remix.prototype.onAuthStateChanged = function(user) {
	if (user) {
		// this.urlContainer.textContent = this.helloUserUrl;
		// this.urlContainerCookie.textContent = this.helloUserUrl;
		// this.signedOutCard.style.display = 'none';
		// this.signedInCard.style.display = 'block';
		// this.startFunctionsRequest();
		// this.startFunctionsCookieRequest();
		this.signInButton.addClass('hidden');
		this.signOutButton.removeClass('hidden');
		console.log(user);
	} else {
		// this.signedOutCard.style.display = 'block';
		// this.signedInCard.style.display = 'none';
		this.signInButton.removeClass('hidden');
		this.signOutButton.addClass('hidden');
		console.log("not logged in");
	}
};