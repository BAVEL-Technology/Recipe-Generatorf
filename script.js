var words = ['garlic', 'chicken', 'cilantro', 'brocollini', 'asparagus']
var speed = 200;
var intervalTypeWriter = window.setInterval(typeWriter, 8000);
var i = 0; //Keep "i" counter variable outside of typeWrite function to preserve it
var count = 0;
var txt = words[0];

/*
* sleep creates a new Promise that will wait x miliseconds to start again
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
* Asyncronious funciton can run over and over again
* typeWriter types as long as the counter is not the same as the length of the word it's typing
* When the counter gets to the end of the word we "sleep", change the color of the koi, "sleep" again, then find a new word, reset the counter and reset the placeholder variable
*/
async function typeWriter(question) {
  console.log(txt);
  console.log(count);
  if (document.querySelector('#i-have')) {
    if (i < txt.length)
    {
        document.querySelector("#i-have").placeholder += txt[i];
        i++;
        setTimeout(typeWriter, speed);
    } else if (i === txt.length) {
      document.querySelector('#i-have-tags').innerHTML += `<span class="inline-block bg-white rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><i class="fas fa-times"></i> ${words[words.indexOf(txt)]}</span>`;
      await sleep(3000);
      if (count > 3) {
        count = 0;
        i = 0;
        txt = words[0];
        document.querySelector('#i-have-tags').innerHTML = "";
        document.querySelector("#i-have").placeholder = ""; //Use placeholder not value so user can still begin typing
        return;
      } else {
        count++;
        i = 0;
        txt = words[0 + count];
        document.querySelector("#i-have").placeholder = ""; //Use placeholder not value so user can still begin typing
        return;
      }
    }
  }
}

typeWriter();

// begin working JS
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

  // define functions that will display when it's loading/not loading
  function loading() {
    var ids = ['zero', 'one', 'two', 'three'];
    for (let i = 0; i < 4; i++) {
      let loader = document.createElement('DIV');
      loader.class = 'w-full max-w-sm m-8 rounded overflow-hidden shadow-lg placeload bg-gray-300 loader';
      loader.style.height = '600px';
      loader.innerHTML = ' ';
      loader.id = ids[i];
      document.querySelector('#results').prepend(loader);
    }
  }
  function notLoading() {
    var ids = ['zero', 'one', 'two', 'three'];
    for (let i = 0; i < 4; i++) {
      let loader = document.getElementById('#' + ids[i]);
      loader.remove();
    }
  }
  
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
      "crossDomain": true,
      "url": "https://rapidapi.p.rapidapi.com/recipes/rapidapi",
      "method": "POST",
      "headers": {
          "content-type": "application/xml",
          "x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
          "x-rapidapi-key": "b479ca82e3msh01de663de6e90a8p15563ajsnd44658ea890a"
      },
      "data": "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/"
  };
  
// add an event listener for the recipeButton
$(".recipeButton").on("click", function() {
  emptyAll();
  // define terms
  let searchTerm = 
  // AJAX call
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
})


});
