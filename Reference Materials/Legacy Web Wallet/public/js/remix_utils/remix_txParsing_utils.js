"use strict"
//
const remix_config = require('./remix_config')
const remix_utils = require('./remix_cryptonote_utils_instance')
//
function IsTransactionConfirmed(tx, blockchain_height)
{
	return (blockchain_height - tx.height) > remix_config.txMinConfirms
}
exports.IsTransactionConfirmed = IsTransactionConfirmed
//
function IsTransactionUnlocked(tx, blockchain_height)
{
	return remix_utils.is_tx_unlocked(tx.unlock_time || 0, blockchain_height)
}
exports.IsTransactionUnlocked = IsTransactionUnlocked
//
function TransactionLockedReason(tx, blockchain_height)
{
	return remix_utils.tx_locked_reason(tx.unlock_time || 0, blockchain_height)
}
exports.TransactionLockedReason = TransactionLockedReason