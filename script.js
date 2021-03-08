document.getElementById("submit").addEventListener("click", myFunc);
document.getElementById("reset").addEventListener("click", resetResults);

function myFunc() {
  //console.log("In myFunc");
  if (document.getElementById("moviesRadio").checked) {
    getMovies();
  } else {
    getGifs();
  }
}

function getMovies() {
  //console.log("In getMovies!");
  let omdbKey = "&apikey=de0af9ac";
  let omdbStringStart = "http://www.omdbapi.com/?s=";
  let inputText = document.getElementById("input").value;
  //console.log(inputText);
  let URL = omdbStringStart + inputText + omdbKey;
  //console.log(URL);
  fetch(URL)
    .then(function (result) {
      //console.log(result);
      return result.json();
    })
    .then(function (data) {
      //console.log(data);
      displayMovies(data);
    });
}

function getGifs() {
  //console.log("In getGifs!");
  let giphyKey = "gV9UWHjfZqdsAQ2XOwxQJYrP2Cz5UJ8b";
  let giphyURL =
    "https://api.giphy.com/v1/gifs/search?api_key=gV9UWHjfZqdsAQ2XOwxQJYrP2Cz5UJ8b&q=";
  let inputText = document.getElementById("input").value;
  //console.log(inputText);
  let URL = giphyURL + inputText;
  //console.log(URL);
  fetch(URL)
    .then(function (result) {
      //console.log(result);
      return result.json();
    })
    .then(function (data) {
      //console.log(data);
      displayGifs(data);
    });
}

function displayMovies(data) {
  //console.log("In displayMovies");
  resetResults();
  let arr = data.Search;
  for (let i = 0; i < arr.length; i++) {
    let newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("style", "width: 18rem;");
    let img = document.createElement("img");
    img.setAttribute("src", arr[i].Poster);
    img.setAttribute("class", "card-img-top");
    newCard.appendChild(img);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    newCard.appendChild(cardBody);
    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerHTML = arr[i].Title;
    cardBody.appendChild(title);
    let para = document.createElement("p");
    para.setAttribute("class", "card-text");
    para.innerHTML = arr[i].Type + " " + arr[i].Year;
    cardBody.appendChild(para);
    document.getElementById("emp-containter").appendChild(newCard);
  }
}

function displayGifs(data) {
  //console.log("In displayGifs");
  resetResults();
  let arr = data.data;
  //console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("style", "width: 18rem;");
    let img = document.createElement("img");
    img.setAttribute("src", arr[i].images.preview_gif.url);
    img.setAttribute("class", "card-img-top");
    newCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    newCard.appendChild(cardBody);

    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerHTML = arr[i].title;
    cardBody.appendChild(title);

    let anchor = document.createElement("a");
    anchor.setAttribute("href", arr[i].url);
    anchor.setAttribute("class", "btn btn-primary");
    anchor.setAttribute("target", "_blank");
    anchor.innerHTML = "Get it";
    cardBody.appendChild(anchor);
    document.getElementById("emp-containter").appendChild(newCard);
  }
}

function resetResults() {
  let parent = document.getElementById("emp-containter");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
