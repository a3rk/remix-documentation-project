"use strict"
//
const remix_wallet_utils = require('./remix_wallet_utils')
//
function MnemonicWordsetNameWithLocale(currentLocale) // e.g. 'en'
{
	const mnemonicWordsetNamesByAppLocaleNames = remix_wallet_utils.MnemonicWordsetNamesByAppLocaleNames
	if (currentLocale.indexOf('en') === 0) {
		return mnemonicWordsetNamesByAppLocaleNames.English
	} else if (currentLocale.indexOf('es') === 0) {
		return mnemonicWordsetNamesByAppLocaleNames.Spanish
	} else if (currentLocale.indexOf('pt') === 0) {
		return mnemonicWordsetNamesByAppLocaleNames.Portuguese
	} else if (currentLocale.indexOf('ja') === 0) {
		return mnemonicWordsetNamesByAppLocaleNames.Japanese
	}
	return remix_wallet_utils.DefaultWalletMnemonicWordsetName // which would be .English
}
exports.MnemonicWordsetNameWithLocale = MnemonicWordsetNameWithLocale