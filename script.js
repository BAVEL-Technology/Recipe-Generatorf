console.log('change');
var words = ["garlic", "chicken", "cilantro", "brocollini", "asparagus"];
var speed = 200;
var intervalTypeWriter = window.setInterval(typeWriter, 8000);
var i = 0; //Keep "i" counter variable outside of typeWrite function to preserve it
var count = 0;
var txt = words[0];

// define functions that will display when it's loading/not loading
function loading() {
  var ids = ["zero", "one", "two", "three"];
  for (let i = 0; i < 4; i++) {
    let loader = document.createElement("DIV");
    loader.class =
      "w-full max-w-sm m-8 rounded overflow-hidden shadow-lg placeload bg-gray-300 loader";
    loader.style.height = "600px";
    loader.innerHTML = " ";
    loader.id = ids[i];
    document.querySelector(".recipeOutput").prepend(loader);
  }
}
function notLoading() {
  var ids = ["zero", "one", "two", "three"];
  for (let i = 0; i < 4; i++) {
    let loader = document.getElementById("#" + ids[i]);
    loader.remove();
  }
}

/* Get a file from directory and return it as a string*/
function getFile(file) {
  var x = new XMLHttpRequest();
  x.open("GET", file, false);
  x.send();
  return x.responseText;
}

/*
 * sleep creates a new Promise that will wait x miliseconds to start again
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/*
 * Asyncronious funciton can run over and over again
 * typeWriter types as long as the counter is not the same as the length of the word it's typing
 */
async function typeWriter(question) {
  if (document.querySelector("#i-have")) {
    if (i < txt.length) {
      document.querySelector("#i-have").placeholder += txt[i];
      i++;
      setTimeout(typeWriter, speed);
    } else if (i === txt.length) {
      document.querySelector(
        "#i-have-tags"
      ).innerHTML += `<span class="inline-block bg-white rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><i class="fas fa-times"></i> ${
        words[words.indexOf(txt)]
      }</span>`;
      await sleep(3000);
      if (count > 3) {
        count = 0;
        i = 0;
        txt = words[0];
        document.querySelector("#i-have-tags").innerHTML = "";
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
function stopTypeWriter() {
  document.querySelector("#i-have-tags").remove();
  window.clearInterval(intervalTypeWriter);
}

// begin working JS
$(document).ready(function () {
  // define DOM elements
  // recipeOutput is where we'll insert new recipe search result cards
  let $recipeOutput = $(".recipeOutput");
  // ingrChoice gathers each individual ingrChoice span
  let $ingrChoice = $(".ingrChoice");
  // categSelectDefault contains the class value for a default category selection span
  let categSelectClassDefault =
    "inline-block bg-gray-200 rounded p-4 text-md font-semibold text-gray-700 mr-2 mb-2 categSelect";
  // categSelectIconDefault captures the <i> html elements nested within the categSelect spans
  let categSelectIconDefault = "fas fa-times";

  // define functions that will display when it's loading/not loading
  function loading() {
    var ids = ["zero", "one", "two", "three"];
    for (let i = 0; i < 4; i++) {
      let loader = document.createElement("DIV");
      loader.class =
        "w-full max-w-sm m-8 rounded overflow-hidden shadow-lg placeload bg-gray-300 loader";
      loader.style.height = "600px";
      loader.innerHTML = " ";
      loader.id = ids[i];
      document.querySelector("#results").prepend(loader);
    }
  }
  function notLoading() {
    var ids = ["zero", "one", "two", "three"];
    for (let i = 0; i < 4; i++) {
      let loader = document.getElementById("#" + ids[i]);
      loader.remove();
    }
  }

  // we will do an AJAX call to get the response from MyCookBook.io
  //   const settings = {
  //     async: true,
  //     crossDomain: true,
  //     url: "https://rapidapi.p.rapidapi.com/recipes/rapidapi",
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/xml",
  //       "x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
  //       "x-rapidapi-key": "b479ca82e3msh01de663de6e90a8p15563ajsnd44658ea890a",
  //     },
  //     data:
  //       "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/",
  //   };

  // add an event listener for the resetButton

  String.prototype.containsAny =
    String.prototype.containsAny ||
    function (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (this.indexOf(arr[i]) > -1) {
          return true;
        }
      }
      return false;
    };
});

$(".resetButton").on("click", function () {
  window.clearInterval(intervalTypeWriter);
  $(".userInputDiv").find(".ingrChoice").remove();
  $("input").val("");
  ingrChoiceArray = [];
  console.log("The reset button was clicked" + ingrChoiceArray);
});

function sortRecipies(recipies, ingredients) {
  let returnRecipiesObject = [];
  for (let i = 0; i < recipies.length; i++) {
    let count = 0;
    for (let j = 0; j < recipies[i].recipe.ingredientLines.length; j++) {
        if (recipies[i].recipe.ingredientLines[j].containsAny(ingredients)) {
          count++;
      }
    }
    returnRecipiesObject.push({
      recipe: recipies[i].recipe,
      similarities: count,
    });
  }

  returnRecipiesObject.sort(function (a, b) {
    return a.similarities - b.similarities;
  });
  console.log(returnRecipiesObject);
  return returnRecipiesObject;
}

// inredient choices will be pushed into here
var ingrChoiceArray = [];

// add an event listener for if the user clicks in the text field. stop typewriter and clear all entered ingredients
$("input").click(function (event) {
  let iHaveTagsValue = $("#i-have-tags").val().trim();
  if ((iHaveTagsValue === 0) || (iHaveTagsValue.length === 0)) {
    window.clearInterval(intervalTypeWriter);
    return;
  } else {
    stopTypeWriter();
    console.log("the user has clicked in the input field");
  };
});

// add event listener for when user presses 'enter'. when this happens, the ingredient should be added as a span and the value should be sent to the ingrChoice array
$("input").keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    // gather value from input field
    let inputValue = $("input").val();
    // push inputValue text into ingrChoiceArray
    ingrChoiceArray.push(inputValue);
    console.log(ingrChoiceArray);
    // create a for loop so that we can append every item from the ingrChoiceArray into userInputDiv as a span
      // create a new span
      let span = $(`<span><i class='fas fa-times m-1 cursor-pointer'></i>${inputValue}</span>`);
      // in the i-have-tags div, prepend that span
      $(".userInputDiv").append(span);
      // add classes to that span
      span.addClass(
        "right-0 bg-white rounded px-3 py-1 text-sm font-semibold m-1 text-gray-700 ingrChoice"
      );
      // clear the value
      $("input").val("");
  }
  $("input").val("");
});

// add event listener for the fa-times icons that are within the spans
$(document).on('click', '.fa-times', function() {
  var remove_Item = $(this).closest('span').text();
  ingrChoiceArray = $.grep(ingrChoiceArray, function(value) {
    return value != remove_Item;
  });
  $(this).closest('span').remove();
});

var cuisine = [];
var dish = [];

$(".cuisine").on("click", function() {
  if (!cuisine.includes($(this).text())) {
    cuisine.push('&diet=' + $(this).text());
    $(this).removeClass('bg-indigo-200 text-indigo-700 border-indigo-700');
    $(this).addClass('bg-green-200 text-green-700 border-green-700');
  } else {
    let index = cuisine.indexOf($(this).text());
    cuisine.splice(index, 1);
    $(this).removeClass('bg-green-200 text-green-700 border-green-700');
    $(this).addClass('border-indigo-700 bg-indigo-200 text-indigo-700');
  }
  console.log(cuisine);
});

// add an event listener for the recipeButton
$(".recipeButton").on("click", function () {
  // if user has not entered any ingredients, display a warning that they must enter at least 1 ingredient
  if ((ingrChoiceArray.length === 0) && ($(".inputWarning").length == 0 )) {
    $(".userButtons").before("<div class='inputWarning'></div>");
    $(".inputWarning").text("You must enter at least one ingredient")
    $(".inputWarning").addClass("text-center font-medium rounded-full border-solid border-2 border-red-400 bg-red-200 text-red-700 py-2 px-4")
  } else {
    $(".inputWarning").remove();
    var apiURLCall = "https://api.edamam.com/search?q=" + ingrChoiceArray[0] +"&app_id=a5834ee5&app_key=503ed9948bec6a3f85b3a4e5cd2ce567" + cuisine.join('') + "&from=0&to=10";
    var settings = {
      url:
        apiURLCall,
      method: "GET",
    };
    // define terms
    let searchTerm =
    loading();
    // AJAX call
    $.ajax(settings).done(function (response) {
      console.log(settings.url);
      console.log(response);
      let recipies = sortRecipies(response.hits, ingrChoiceArray);
      console.log(recipies);
      for (let i = 0; i < recipies.length; i++) {
        console.log(recipies[i]);
        let recipie = recipies[i].recipe;
        let file = getFile('components/recipie-card.html?v=40');
        let card = $(eval('`' + file + '`'));
        $('.recipeOutput').prepend(card);
      }
      // add an event listener for if the user starts typing in the text field. if user types, stop typewriter and clear all entered ingredients
    $("input").keydown(function () {
      stopTypeWriter();
      console.log("the user has typed");
    });
  
    // add event listener for when user presses 'enter'. when this happens, the ingredient should be added as a span and the value should be sent to the ingrChoice array
    $("input").on('keypress', function(e) {
      let ingrInput = $(this).value;
      if(e.which == 13) {
        $("input").add("<div id='i-have-tags'>");
        $("#i-have-tags").add("<span class='inline-block bg-white rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ingrChoice'>");
        $(".ingrChoice").text(ingrInput);
      }
      console.log("enter was pressed in the text field");
    });
    });
  };
});

window.showFilters = function () {
  $('#cusineType').css("visibility", "visible")
}


function ingredientify (str) {
  return str.replace(/ +/g, '-');
}

function prettyfy (str) {
  return str.replace('-', ' ');
}

$("body").on('click', ".ingredient", function () {
  var apiURLCallIngredients = 'https://bon-api.com/api/v1/ingredient-alternatives/garlic';

  var settingsIngredients = {
    'method': 'GET',
      'url': apiURLCallIngredients,
      'dataType': 'jsonp',
      'crossDomain': true,
      'headers': {
        'Access-Control-Allow-Origin': 'https://https-github-com-steversontong.github.io',
        'Authorization': 'Token 62cab45d3fee7a60c15e00bef1bcd030defb62ee'
      }
  }
  $.ajax(settingsIngredients).done(function (response) {
    console.log(settingsIngredients.url);
    console.log(ingredientify($(this).text()));
    console.log(response);
    $(this).text(prettyfy(response.response.ingredientify($(this).text()).alternatives[0]));
  });
});
