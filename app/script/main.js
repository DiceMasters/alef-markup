$(document).ready( function() {
	$('.nicescroll-box').each( function() {
		$(this).niceScroll('.nicescroll-wrap', {
			cursorwidth: '4px',
			cursorcolor: '#7000e0',
			cursorborder: 'none',
			cursorborderradius: '0',
			background: '#7e00ff',
			autohidemode: false
		})
	})

	$('.nicescroll-transparent').each( function() {
		$(this).niceScroll('.nicescroll-wrap', {
			cursorcolor: 'transparent',
			cursorborder: 'none',
			background: '#7e00ff'
		})
	})
})