var request = new XMLHttpRequest();
var button  = document.getElementById('button');
var div     = document.getElementById('cat-container');
var loader  = document.getElementById('loader');

var SIMULATED_SLOWNESS = 0;

function makeRequest(url) {
  request = new XMLHttpRequest();

  if (!request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  loader.setAttribute('style', 'display: flex');

  request.open("GET", url);
  request.onreadystatechange = alertContents;
  setTimeout(function() {
    request.send();
  }, SIMULATED_SLOWNESS);
}

function alertContents() {
  var READY_STATE_DONE = 4;
  var HTTP_STATUS_OK   = 200;

  if (request.readyState !== READY_STATE_DONE) {
    return;
  }

  loader.setAttribute('style', 'display: none');

  if (request.status !== HTTP_STATUS_OK) {
    console.log('There was a problem with the request.');
    return;
  }

  var data = JSON.parse(request.responseText).data;
  var item = data[Math.floor(Math.random()*50)];
  var imgSrc  = item.images.fixed_height_still.url;
  var gifSrc  = item.images.fixed_height.url;
  var link = document.createElement("a");
  var img  = document.createElement("img");

  img.setAttribute('src', imgSrc);
  link.setAttribute('href', gifSrc);
  link.classList.add('js-gif');
  link.appendChild(img);
  div.appendChild(link);

  animateGif(link);
}

function animateGif(link) {
  var img = link.childNodes[0];
  var gifSrc = link.getAttribute('href');
  var imgSrc = img.getAttribute('src');

  link.addEventListener('click', function(e) {
    e.preventDefault();

    if(link.getAttribute('class') === 'js-gif') {
      img.setAttribute('src', gifSrc);
      link.classList.toggle('js-animate');
    } else {
      img.setAttribute('src', imgSrc);
      link.classList.toggle('js-animate');
    }
  });
}

function loadGif() {
  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=cat&limit=50&api_key=dc6zaTOxFJmzC';
  div.innerHTML = '';
  makeRequest(dataURL);
}

button.addEventListener('click', function(e) { 
  e.preventDefault();
  loadGif();
}, false);

document.addEventListener('DOMContentLoaded', loadGif);
