$(document).ready(function() {

    // Set variables
    var APIKey = "YuLShxF8h1Z5K6nn3rENeDtBLj8x5q5E";
    var queryURL = "https://api.giphy.com/v1/gifs/random?limit=10&api_key=" + APIKey;
    var queryTerm = "";

    // Initialize variable
    var topics = ["Suits", "Killing Eve", "Big Little Lies", "The Office", "Friends", "Sherlock", "Marvelous Mrs.Maisel", "Black Mirror", "The Blacklist", "The Good Place"];

    // Load buttons from initialized array
    renderButtons();

    // Renders tv show buttons
    function renderButtons() {
        // Delete previous buttons to avoid repeat
        $("#buttons-list").empty();
        // Go through loop to add a button for each tv show
        for (var i = 0; i < topics.length; i++) {
            var showDiv = $("<button>");
            showDiv.addClass("tvshow");
            // Add attribute with value of TV show
            showDiv.attr("name", topics[i]);
            // Add TV show name
            showDiv.text(topics[i]);
            // Adding the button to the HTML
            $("#buttons-list").append(showDiv);
        
        }
    };

    // Call AJAX and retrieve gifs
    function runQuery(queryURL) {
        // AJAX call to Giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(gifData) {
            console.log(gifData);
        });
    }

    // Click handler to generate new query URL
    $(".tvShow").on("click", function() {
        queryTerm = $(this).val().trim();
        console.log(queryTerm);
        var newURL = queryURL + "&q=" + queryTerm;
        console.log(newURL);
        // Send AJAX call with new uRL
        runQuery(newURL);
    });


    // Click handler to add tv show buttons
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