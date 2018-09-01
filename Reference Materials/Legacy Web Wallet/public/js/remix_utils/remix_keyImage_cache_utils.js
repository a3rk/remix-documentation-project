"use strict"

const remix_utils = require('./remix_cryptonote_utils_instance')
var key_images = {}

var Lazy_KeyImage = function(
	tx_pub_key, 
	out_index,
	public_address,
	view_key__private,
	spend_key__public,
	spend_key__private
)
{
	var cache_index = tx_pub_key + ':' + public_address + ':' + out_index
	const cached__key_image = key_images[cache_index]
	if (typeof cached__key_image !== 'undefined' && cached__key_image !== null) {
		return cached__key_image
	}
	var key_image = remix_utils.generate_key_image(
		tx_pub_key,
		view_key__private,
		spend_key__public,
		spend_key__private,
		out_index
	).key_image

	key_images[cache_index] = key_image

	return key_image
}

exports.Lazy_KeyImage = Lazy_KeyImage