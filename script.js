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
