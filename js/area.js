define(['jquery'], function($) {
	var Search = window.location.search;
    $('body').css('background', '#eee');
    if (Search === '?world') {
    	$('#status').text('北京');
    } else {
    	$('#status').text('海淀');
    }
})