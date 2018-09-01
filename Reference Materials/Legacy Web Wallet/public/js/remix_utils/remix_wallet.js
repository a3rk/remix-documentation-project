'use strict';

function RemixWallet(){
	var self = this;

	self.address = null;
	self.mnemonic_string = null;
	self.viewOnlyMode = false;
	self.keys = {
		public_keys: {
			view_key: null,
			spend_key: null
		},
		private_keys: {
			view_key: null,
			spend_key: null
		}
	};

	self.create = function(seed) {
		seed = typeof seed == 'undefined' ? cryptonote_utils.random_scalar() : seed;
		self.mnemonic_string = mn_encode(seed);
		var address_and_keys = cryptonote_utils.create_address(seed);

		self.address = address_and_keys.public_addr;
		self.keys.public_keys.view_key = address_and_keys.view.pub;
		self.keys.public_keys.spend_key = address_and_keys.spend.pub;
		self.keys.private_keys.view_key = address_and_keys.view.sec;
		self.keys.private_keys.spend_key = address_and_keys.spend.sec;
	};

	self.create_from_mnemonic = function(mnemonic_string) {
		self.mnemonic_string = typeof mnemonic_string !== 'undefined' ? mnemonic_string : self.mnemonic_string;

		if(self.mnemonic_string != null && self.mnemonic_string.length > 0) {
			var seed = mn_decode(self.mnemonic_string.toLowerCase());
			self.create(seed);

		}
	};

	self.create_from_address_and_keys = function(address, view_key, spend_key) {
		self.address = (typeof address !== 'undefined' && 
			address != null && 
			address != "" && 
			address.length == 97) ? address : self.address;

		self.keys.private_keys.view_key = (typeof view_key !== 'undefined' && 
			view_key != null && 
			view_key != "" && 
			view_key.length == 64) ? view_key : self.keys.private_keys.view_key;

		self.keys.private_keys.spend_key = (typeof spend_key !== 'undefined' && 
			spend_key != null && 
			spend_key != "" && 
			spend_key.length == 64) ? spend_key : self.keys.private_keys.spend_key;

		self.viewOnlyMode = (self.keys.private_keys.spend_key === null);

		if(!self.keys.private_keys.view_key || 
			self.keys.private_keys.view_key.length !== 64 || 
			(self.viewOnlyMode ? false : self.keys.private_keys.spend_key.length !== 64)) {
			throw 'invalid secret key length';
		}

		if(!cryptonote_utils.valid_hex(self.keys.private_keys.view_key) || 
			(self.viewOnlyMode ? false : !cryptonote_utils.valid_hex(self.keys.private_keys.spend_key))) {
			throw 'invalid hex formatting';
		}

		try {
			var address_and_keys = cryptonote_utils.decode_address(self.address);

			self.keys.public_keys.view_key = address_and_keys.view;
			self.keys.public_keys.spend_key = address_and_keys.spend;
		} catch(e) {
			throw 'invalid address';
		}

		try {
			var expected_public_view_key = cryptonote_utils.sec_key_to_pub(self.keys.private_keys.view_key);

			if(self.keys.public_keys.view_key !== expected_public_view_key) {
				throw "private/public view key mismatch";
			}
		} catch(e) {
			throw "invalid view key";
		}

		if (self.keys.private_keys.spend_key !== null && 
			self.keys.private_keys.spend_key.length === 64) {

			try {
				var expected_public_spend_key = cryptonote_utils.sec_key_to_pub(self.keys.private_keys.spend_key);

				if(!self.viewOnlyMode && self.keys.public_keys.spend_key !== expected_public_spend_key) {
					throw "private/public spend key mismatch";
				}
			} catch(e) {
				throw "invalid spend key";
			}
		}
	};
};