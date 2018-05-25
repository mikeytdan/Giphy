
var apiKey = "b9GguApm91sJZ50m8sbyQUazzOJQEBas";
var items = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup", "serval", "salamander", "frog"];

function search(item, limit) {
    $("#images").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=" + apiKey + "&limit=" + limit;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (item of results) {
            addGiphyItem(item);
        }
    });
}

function addGiphyItem(item) {
    var animalDiv = $("<div>");
    animalDiv.addClass("m-2");
    var p = $("<p>").text("Rating: " + item.rating);
    var animalImage = $("<img>").attr("src", item.images.fixed_height_still.url);
    animalDiv.append(p);
    animalDiv.append(animalImage);
    // animalImage.css('display', 'inline');
    // p.css('display', 'inline');
    animalDiv.css('display', 'inline-block');
    $("#images").append(animalDiv);
    animalDiv.on("click", function (event) {
        var src = $(animalImage).attr("src");
        
      $(animalImage).attr("src", src == item.images.fixed_height_still.url ? item.images.fixed_height.url : item.images.fixed_height_still.url);
    })
}

function addButton(name) {
    console.log("Add: " + name);
    var button = $("<button>");
    button.addClass("btn btn-primary");
    button.text(name);
    button.addClass("mx-2 mb-2");
    $("#buttons-view").append(button);
    button.on("click", function () {
        search(button.text());
    })
}

window.onload = function (event) {
    $("#input-error").hide();
    for (var i = 0; i < items.length; i++) {
        addButton(items[i]);
    }

    $('#animal-input').on('input', function (e) {
        console.log("hi");
        $("#input-error").hide();
    });

    $("#submit-animal").on("click", function (event) {
        event.preventDefault();
        var input = $("#animal-input");
        var value = input.val();
        if (value == "") {
            var errorInput = $("#input-error");
            errorInput.show();
            errorInput.text("Need to add an animal");
            // Make sure the input isn't empty AND that the item isn't already in our items array
            return;
        } else if (items.indexOf(value) != -1) {
            var errorInput = $("#input-error");
            errorInput.show();
            errorInput.text("Animal already added");
            input.val("");
            return
        }

        items.push(value)
        addButton(value)
        console.log(input.val());
        input.val("");
    });
}
