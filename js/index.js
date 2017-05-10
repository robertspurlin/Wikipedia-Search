$(document).ready(function() {	
    
    var hCenter = (($(this).height() /2) - ($("#center").height() /2));
    $("#center").css("margin-top", hCenter);

    if (typeof html == "undefined") {
        $(window).resize(function() {
            var homeHeight = $(this).height();
            $("#background").height(homeHeight);
        }).resize(); 
    }
});

var url = "https://en.wikipedia.org/w/api.php?callback=?";
var link, details, html = "";

$("#search").keypress(function(e) {
    if (e.which == 13) {
        getResults();
    }
});

function getResults() {
    
    $.getJSON(url, {
        "action": "query",
        "format": "json",
        "prop": "info|extracts",
        "list": "",
        "continue": "",
        "titles": "",
        "generator": "search",
        "inprop": "url",
        "exsentences": "3",
        "exlimit": "max",
        "exintro": 1,
        "explaintext": 1,
        "gsrsearch": "potato",
        "gsrprop": "",
        "gsrsearch": $("#search").val()
    
    }).done(function(response) {
        $(".results").empty();
        $("#center").css("margin-top", 0);
        var pages = response.query.pages;
        for (results in pages) {
            link = "<a href='" + pages[results].fullurl + "'target='_blank'</a>";
            details = "<h4>" + pages[results].title + "</h4><br /><p>" + pages[results].extract + "</p>";
            html = link + "<div class='well'>" + details + "</div>"
            $(".results").append(html);
        };
        $('#background').height($('#center').height());      
      })
    }