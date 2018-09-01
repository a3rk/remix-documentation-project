"use strict"
//
const remix_utils = require('./remix_cryptonote_utils_instance')
//
function New_TransactionID()
{
	return remix_utils.rand_32()
}
exports.New_TransactionID = New_TransactionID
//
function IsValidPaymentIDOrNoPaymentID(payment_id)
{
	if (payment_id) {
		if (payment_id.length !== 64 || !(/^[0-9a-fA-F]{64}$/.test(payment_id))) { // not a valid 64 char pid
			return false // then not valid
		} 
	}
	return true // then either no pid or is a valid one
}
exports.IsValidPaymentIDOrNoPaymentID = IsValidPaymentIDOrNoPaymentID