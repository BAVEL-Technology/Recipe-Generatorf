$(document).ready(function() {
    // define DOM elements
    // recipeOutput is where we'll insert new recipe search result cards
    let $recipeOutput = $(".recipeOutput");
    // recipeCard gathers the main display cards of each seperate recipe
    let $recipeCard = $(".recipeCard");
    // positiveIngrDiv is where ingredients that the user wants are displayed
    let $positiveIngrDiv = $(".positiveIngrDiv");
    // negativeIngrDiv is where ingredients that the user doesn't want are displayed
    let $negativeIngrDiv = $(".negativeIngrDiv");
    // categSelectDiv is where the filter selectors live
    let $categSelectDiv = $(".categSelectDiv");
    // categSelect gathers each individual span within the categSelectDiv
    let $categSelect = $(".categSelect");
    // categSelectDefault contains the class value for a default category selection span
    let categSelectClassDefault = "inline-block bg-gray-200 rounded p-4 text-md font-semibold text-gray-700 mr-2 mb-2 categSelect";
    // categSelectIconDefault captures the <i> html elements nested within the categSelect spans
    let categSelectIconDefault = "fas fa-times";

    // define a function that empties all DOM contents and sets all category selections to "not selected"
    function emptyAll() {
        $recipeOutput.empty();
        $positiveIngrDiv.empty();
        $negativeIngrDiv.empty();
        $categSelect.attr("class", categSelectClassDefault).find("i").attr("class", categSelectIconDefault);
    };

    // when the page loads, set all DOM contents to default values. We will comment this out so that we can continue working with the DOM
    emptyAll();

    // we will do an AJAX call to get the response from MyCookBook.io
    const settings = {
        "async": true,
        "crossDomain": true,sdgfsg
        "url": "https://rapidapi.p.rapidapi.com/recipes/rapidapi",
        "method": "POST",
        "headers": {
            "content-type": "application/xml",
            "x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
            "x-rapidapi-key": "b479ca82e3msh01de663de6e90a8p15563ajsnd44658ea890a"
        },
        "data": "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/"
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
      });
});