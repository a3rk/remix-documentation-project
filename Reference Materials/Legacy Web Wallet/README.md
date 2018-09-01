RemixCoin (RMX) Web Wallet
======

Overview
------
Web application allowing for the creation and seed regeneration of RemixCoin (RMX) wallets and their respective credentials, transactions, balances, etc., entirely within the scope of the end-user's web browser. 

All information posted to the remote server is either securely computed by the end-user's browser beforehand, or is entirely comprised of public data (public account address, public view key). 

Implementation informally branched from mymonero.com, and please note that key changes were made to several utility classes in order for the application itself to adhere to RMX's specifications, not XMR's specifications. 

The code base is intentionally light, lean, and void of all that is bloat and bullshit, for the specific intent and purpose of lowering and widening entry points into continued development. There is a great many ways in which this can be extended, improved, fancied up nice like with practical bells and whistles. 


Points of Functionality 
------

Initial release, v1.0.0-beta, provides the following points of functionality:

1. Create a new wallet and be provided with the mnemonic string, public address, and private view and spend keys
2. Regenerate wallet in separate browser and/or session using the mnemonic string, as private key, provided by previously created wallet




1. Create wallet and provide mnemonic string and keys

2. Recreate wallet when provided with mnemonic string

3. Account Overview
	0. Basics
		1. Balance (RMX)
		2. Address (copyable)
	1. Transaction history (page size 10, sortable by date received)
		Value (RMX)
		Date Received
		Mixin
		Transaction ID
	2. My Account
		Private Login Key (mnemonic string) (copyable)
		Account Details
			Public Address (copyable)
			Private View Key (copyable)
			Private Spend Key (copyable)

4. Transactions (table above in 3.1)

5. Send Funds
	Received address
	amount
	Payment ID (optional)
	Privacy Level (4, 10, 20, 40)

6. Received Funds
	Address (copyable)
	Amount
	Label
	Payment ID

To-Do
------
1. Update mnemonics to account for locale, where unit of works comes in two parts, technically:
	1. Extend current implementation to detect end-user locale and attempt to auto-select word set based on locale.
	2. Extend current implementation to be i18n compliant, s.t. locales will dictate language files required here.
	* __Note:__ This assumes RMX decides to move in a direction similar to the one XMR went when creating the additional word sets.

2. Allow end-users to login and recreate their account with nothing more than their address and public keys, s.t. the following must be verified before functionality itself may be parted out:
	1. Feasible pathway to securely recreate mnemonic based on address and public keys does not unwittingly expose some aspect of hashing, merging, combining, etc., that is not inherently unidirectional.
	* __Note:__ The current dead-ended attempt may be found within remix_wallet.create_from_address_and_keys, and even when address and both private keys are provided, the mnemonic string as a seed cannot easily be regenerated. 

3. Clean up the mess that is js/{crypto.js|biginteger.js}, as they need to be easy to develop against, integrate, etc., but the extraction and abstraction away from their node implementations leave them in a rather unwieldy and unsightly state.
