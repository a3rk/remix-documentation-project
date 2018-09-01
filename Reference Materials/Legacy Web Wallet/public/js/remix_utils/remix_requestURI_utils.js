"use strict"
//
const remix_config = require('./remix_config')
//
function New_RequestFunds_URI(
	args
)// -> String?
{
	const address = args.address
	if (!address) {
		throw "missing address"
		// return null
	}
	var uri = remix_config.coinUriPrefix + "//" + address  // inserting a // so data detectors pick it up… maybe remove if/after not necessary
	var isAppendingParam0 = true
	function addParam(parameterName, value)
	{
		if (value == null || value == ""/*important*/ || typeof value === 'undefined') {
			return
		}
		var conjunctionStr = "&"
		if (isAppendingParam0 === true) {
			isAppendingParam0 = false
			conjunctionStr = "?"
		}
		uri += conjunctionStr
		uri += parameterName + '=' + encodeURIComponent(value)
	}
	{
		addParam('tx_amount', args.amount)
		addParam('tx_amount_ccy', args.amountCcySymbol)
		addParam('tx_description', args.description)
		addParam('tx_payment_id', args.payment_id)
		addParam('tx_message', args.message)
	}
	return uri
}
exports.New_RequestFunds_URI = New_RequestFunds_URI
//
function New_ParsedPayload_FromRequestURIString(uriString)
{ // throws; -> {}
	// TODO
	const url = new URL(uriString)
	const protocol = url.protocol
	if (protocol !== remix_config.coinUriPrefix) {
		throw "Request URI has non-remix protocol"
	}
	var target_address = url.pathname // var instead of const as have to finalize it
	// it seems that if the URL has // in it, pathname will be empty, but host will contain the address instead
	if (target_address === "" || typeof target_address === 'undefined' || !target_address) {
		target_address = url.host || url.hostname
	}
	if (target_address.indexOf("//") == 0) {
		target_address = target_address.slice(0 + "//".length, target_address.length) // strip prefixing "//" in case URL had protocol:// instead of protocol:
	}
	const searchParams = url.searchParams // needs to be parsed it seems
	//
	const payload =
	{
		address: target_address
	}	
	const keyPrefixToTrim = "tx_"
	const lengthOf_keyPrefixToTrim = keyPrefixToTrim.length
	searchParams.forEach(
		function(value, key)
		{
			var storeAt_key = key
			if (key.indexOf(keyPrefixToTrim) === 0) {
				storeAt_key = key.slice(lengthOf_keyPrefixToTrim, key.length)
			}
			payload["" + storeAt_key] = value
		}
	)
	//
	return payload
}
exports.New_ParsedPayload_FromRequestURIString = New_ParsedPayload_FromRequestURIString
