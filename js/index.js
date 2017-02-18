$(document).ready(function() {
	
	// Setup definitions

    $(window).resize(function() {
        var homeHeight = $(this).height();
        var hCenter = (($(this).height() /2) - ($("#box").height() /2));
        $("#background").height(homeHeight);
        $("#box").css("margin-top", hCenter);
    }).resize();

    // API Integration. Credit to Chris Coyier https://quotesondesign.com

    $("#quote-button").on("click", function() {
    	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?").done(update).fail(error);
    });

    function update(response) {
    	$("#quote").html(
    		JSON.stringify(response.quoteText) + "<br />" + JSON.stringify(response.quoteAuthor)
    		);
    }

    function error() {
    	$("#quote").html("There has been an error." + "<br />" + "Try again later!" + "<br />");
    }
});
