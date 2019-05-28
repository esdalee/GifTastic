$(document).ready(function() {

    // Set query URL and APIKey
    var APIKey = "YuLShxF8h1Z5K6nn3rENeDtBLj8x5q5E";
    var queryURL = "https://api.giphy.com/v1/gifs/random?limit=10&api_key=" + APIKey;

    // Initialize variable
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

    // Renders tv show buttons
    function renderButtons() {
        // Delete previous buttons to avoid repeat
        $("#buttons-list").empty();
        // Go through loop to add a button for each tv show
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

    // Click handler for adding tv shows
    $("#add-tvShow").on("click", function(e) {
         e.preventDefault();
        // Get value from user's input
        var show = $("#tvShow-input").val().trim();
        // Add to array
        topics.push(show);
        // Call render function to make button
        renderButtons();
      });


});