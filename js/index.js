$(document).ready(function() {
	
// Setup definitions
    $(window).resize(function() {
        var homeHeight = $(this).height();
        var hCenter = (($(this).height() /2) - ($("#box").height() /2));
        $("#background").height(homeHeight);
        $("#box").css("margin-top", hCenter);
    }).resize();

// API Integration. Credit to Forismatic https://forismatic.com
    $("#quote-button").on("click", function() {
    	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?").done(update).fail(error);

    	// Random Color Generator
    	var letters = '0123456789ABCDEF';
    	var randomColor = '#';
    	for (var i = 0; i < 6; i++ ) {
        	randomColor += letters[Math.floor(Math.random() * 16)];
   	 	}
  		
  		$(".color-change").css("color", randomColor);
  		$("#background").css("background-color", randomColor);

    });

    function update(response) {
    	var quote = JSON.stringify(response.quoteText) + "<br />";
    	quote = quote.replace(/"/g, '');

    	var author = "-" + JSON.stringify(response.quoteAuthor);
    	author = author.replace(/"/g, '');
    	
    	if (author == "-") {
    		author += "Unknown";
    	}

    	var html = quote + author;

    	$("#quote").html(html);

    	// Twitter Link Generator
		var twitterQuote = JSON.stringify(response.quoteText).replace(/"/g, '') + author;
		var twitterLink = ' href =' + '"' + 'https://twitter.com/intent/tweet?text=' + twitterQuote + '"';
		var button = '<a' + twitterLink + 'target="_blank"' + '><i class="fa fa-twitter" aria-hidden="true"></i> Tweet</a>';
		$(".twitter").html(button);
    }

    function error() {
    	$("#quote").html("There has been an error." + "<br />" + "Try again later!" + "<br />");
    }

});
