$(document).ready(function() {

    // Set variables
    var APIKey = "YuLShxF8h1Z5K6nn3rENeDtBLj8x5q5E";
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + APIKey;
    var queryTerm = "";

    // Initialize variable
    var topics = ["Suits", "Killing Eve", "Big Little Lies", "The Office", "Friends", "Sherlock", "Marvelous Mrs.Maisel", "Black Mirror", "The Blacklist", "The Good Place", "Saturday Night Live"];

    // Load buttons from initialized array
    renderButtons();

    // Renders tv show buttons
    function renderButtons() {
        // Delete previous buttons to avoid repeat
        $("#buttons-list").empty();
        // Go through loop to add a button for each tv show
        for (var i = 0; i < topics.length; i++) {
            var showDiv = $("<button>");
            showDiv.addClass("tvShow btn-md btn-space");
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
        }).then(function(response) {
            console.log(response);
            // Store the object as results
            var results = response.data;
            console.log(results);
            // Loop through results and add gifs
            for (var i=0; i<results.length; i++) {
                var gifDiv = $("<div class='gif'></div><br>");
                var ratingDiv = $("<div class='ratingDiv'>" + "Rated: " + results[i].rating.toUpperCase() + "</div>");

                var gifImage = $("<img class='gifImage'>");
                // Set attributes for img (still vs. animated)
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                
                // Set image to still
                gifImage.attr("data-state", "still");

                // Add image and rating to the gif div
                gifDiv.append(gifImage);
                gifDiv.append(ratingDiv);
               
                // Add gif div to gifsView div
                $(".gifsView").prepend(gifDiv);
            }
        });
    }

    // Click handler to generate new query URL
    $(document).on("click", ".tvShow", function() {
        // Grab text from tvShow button
        queryTerm = $(this).text().trim();
        console.log(queryTerm);
        // Build new URL using query search
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
        // Add to topics array
        topics.push(show);
        // Call render function to make button
        renderButtons();
      });

    // Click handler to play/pause gif
    $(document).on("click", ".gifImage", function(){
        // Grab current state of the gif
        var state = $(this).attr("data-state");
        console.log(state);

        // If gif is paused, play it
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        // If gif is playing, pause it
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});