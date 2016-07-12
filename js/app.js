var request = new XMLHttpRequest();
var button  = document.getElementById('button');
var div     = document.getElementById('cat-container');

function makeRequest(url) {
  request = new XMLHttpRequest();

  if (!request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  request.onreadystatechange = alertContents;
  request.open("GET", url);
  request.send();
}

function alertContents() {
  if (request.readyState === 4) {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText).data;
      var item = data[Math.floor(Math.random()*25)];
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
    } else {
      showInfo('There was a problem with the request.');
    }
  }
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

button.addEventListener('click', function(e) { 
  e.preventDefault();
  div.innerHTML = '';

  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=cat&limit=50&api_key=dc6zaTOxFJmzC';

  makeRequest(dataURL); 
}, false);
