$("#sign-in-button").hover(
	function(){
		$(this).attr('src', $(this).data('mouseenter-src'));
	},
	function(){
		$(this).attr('src', $(this).data('mouseleave-src'));
	}
);