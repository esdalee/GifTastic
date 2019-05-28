$(document).ready(function() {


    var APIKey = "YuLShxF8h1Z5K6nn3rENeDtBLj8x5q5E";
    var queryURL = "https://api.giphy.com/v1/gifs/random?limit=10&api_key=" + APIKey;

    var topics = ["Suits", "Killing Eve", "Big Little Lies", "The Office", "Friends", "Sherlock", "Marvelous Mrs.Maisel", "Black Mirror", "The Blacklist", "The Good Place"];

    // Load initial buttons
    renderButtons();

    // AJAX call to Giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    function renderButtons() {
        // Delete previous buttons to avoid repeat
        $("#buttons-list").empty();
        for (var i = 0; i < topics.length; i++) {
            var showDiv = $("<button>");
            showDiv.addClass("tvshow");
            // Add attribute with value of TV show
            showDiv.attr("data-name", topics[i]);
            // Add TV show name
            showDiv.text(topics[i]);
            // Adding the button to the HTML
            $("#buttons-list").append(showDiv);
        
        }
    };

});