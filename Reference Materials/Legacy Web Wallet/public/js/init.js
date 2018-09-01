'use strict';

window.onload = function() {

	window.remix = new Remix();
	window.remix_wallet = new RemixWallet();

	/*
	 * Only executes upon load if remix_config.testDriving within /js/config.js 
	 * 	is set to true. 
	 * 	
	 * Please understand this to be the stubborn way of testing, not
	 * 	necessarily the best, fastest, or cleverest way of testing,
	 * 	as I've no patience for kitchen sinks and flying toolkits
	 * 	and, generally speaking, bloated bullshit nonsense. 
	 *
	 * Off my lawn with your webpackconfigs and your grunting
	 * 	and barking and bowering and gulping, off my lawn I say.
	 */
	if(typeof window.remix_config != 'undefined' &&
		typeof window.remix_config.testDriving != 'undefined' && 
		window.remix_config.testDriving == true) {

		window.remix._log(
			cryptonote_utils.decode_address(
				window.remix_config_for_testing.wallet_address
			)
		);

		window.remix._log(
			cryptonote_utils.sec_key_to_pub(
				window.remix_config_for_testing.sec_view_key
			)
		);

		var ENCRYPTED_PAYMENT_ID_TAIL = 141;
		var INTEGRATED_ID_SIZE = 8;
		var txKey = cryptonote_utils.random_keypair();
		var payment_id = "abcdefghijklmnop";

		window.remix._log(txKey);

		var view_key_derivation = cryptonote_utils.generate_key_derivation(
			window.remix_config_for_testing.view_key,
			txKey.sec
		);

		window.remix._log(view_key_derivation);

		

		var pid_key = cryptonote_utils.cn_fast_hash(
			view_key_derivation + 
			ENCRYPTED_PAYMENT_ID_TAIL.toString(16)
		).slice(0, INTEGRATED_ID_SIZE * 2);

		window.remix._log(pid_key);

		payment_id = cryptonote_utils.hex_xor(payment_id, pid_key);
		window.remix._log(payment_id);


		var nonce = cryptonote_utils.get_payment_id_nonce(payment_id, true);

		window.remix._log(nonce);

		var keys = {
			view: {
				pub: window.remix_config_for_testing.view_key,
				sec: window.remix_config_for_testing.sec_view_key
			},
			spend: {
				pub: window.remix_config_for_testing.spend_key,
				sec: window.remix_config_for_testing.sec_spend_key
			}
		};

		var pub_keys = {
			view: window.remix_config_for_testing.view_key,
			spend: window.remix_config_for_testing.spend_key
		};

		var sec_keys =  {
			view: window.remix_config_for_testing.sec_view_key,
			spend: window.remix_config_for_testing.sec_spend_key
		};
		//"0.010000000000"
		
		
		// var amount_to = new JSBigInt(window.remix_config_for_testing.send_to_amount);

		// window.remix._log(amount_to);
		// window.remix._log(cryptonote_utils.formatMoney(amount_to.toString()));
		// window.remix._log(cryptonote_utils.formatMoneyFull(amount_to.toString()));

		// window.remix._log(cryptonote_utils.formatMoney(window.remix_config.networkFee));
		// window.remix._log(cryptonote_utils.formatMoneyFull(window.remix_config.networkFee + amount_to));

		// var amount_from = window.remix_config_for_testing.send_to_amount * 2 + window.remix_config.networkFee;

		var amount_to_send = cryptonote_utils.parseMoney(
			window.remix_config_for_testing.send_to_amount.toString()
		);

		window.remix._log(cryptonote_utils.formatMoney(amount_to_send));
		window.remix._log(cryptonote_utils.formatMoneyFull(amount_to_send));

		var amount_to_charge = amount_to_send.multiply(2).add(window.remix_config.networkFee);

		window.remix._log(cryptonote_utils.formatMoney(amount_to_charge));
		window.remix._log(cryptonote_utils.formatMoneyFull(amount_to_charge));

		var amount_to = new JSBigInt(window.remix_config_for_testing.send_to_amount);
		var amount_from = window.remix_config.networkFee.add(amount_to.multiply(2));

		var destinations = [{
			address: window.remix_config_for_testing.send_to_wallet_address,
			amount: cryptonote_utils.formatMoneyFull(amount_to_send.toString())
		}
		// ,{
		// 	address: window.remix_config_for_testing.wallet_address,
		// 	amount: cryptonote_utils.formatMoneyFull(amount_to_charge.toString())
		// }
		];

		window.remix._log(destinations);

		var outputs = [];
		var output_threshold = new JSBigInt(0);
		var target_amount = amount_to_send.add(window.remix_config.networkFee);

		
		var destination_keys = cryptonote_utils.decode_address(
			window.remix_config_for_testing.send_to_wallet_address
		);

		var transaction = cryptonote_utils.create_transaction(
			pub_keys, 
			sec_keys, 
			destinations, 
			[], 
			[], 
			3, 
			0.01, 
			payment_id, 
			true, 
			destination_keys.view,
			10, 
			false
		)

		try {
			window.remix_wallet.create();
			window.remix._log(window.remix_wallet);
		} catch(e) {
			window.remix._error(e);
		} finally {
			window.remix_wallet = new RemixWallet();
		}

		try {
			window.remix_wallet.create_from_mnemonic(
				window.remix_config_for_testing.electrum_words
			);
			window.remix._log(window.remix_wallet);
		} catch(e) {
			window.remix._error(e);
		} finally {
			window.remix_wallet = new RemixWallet();

		}

		try {
			window.remix_wallet.create_from_address_and_keys(
				window.remix_config_for_testing.wallet_address, 
				window.remix_config_for_testing.sec_view_key, 
				window.remix_config_for_testing.sec_spend_key
			);
			window.remix._log(window.remix_wallet);
		} catch(e) {
			window.remix._error(e);
		} finally {
			window.remix_wallet = new RemixWallet();
		}



	}
};
