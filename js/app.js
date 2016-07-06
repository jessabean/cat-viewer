var request = new XMLHttpRequest();
var button  = document.getElementById('button');
var list    = document.getElementById('list');

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
      img.setAttribute('class', 'js-animate-disabled');
      link.setAttribute('href', gifSrc);
      link.appendChild(img);
      list.appendChild(link);

      animateGif(link);
    } else {
      showInfo('There was a problem with the request.');
    }
  }
}

function animateGif(link) {
  var img = link.childNodes[0];
  var gif = link.getAttribute('href');
  var origSrc = img.getAttribute('src');

  link.addEventListener('click', function(e) {
    e.preventDefault();

    if(img.getAttribute('class') === 'js-animate-disabled') {
      img.setAttribute('src', gif);
      img.setAttribute('class', 'js-animate');
    } else {
      img.setAttribute('src', origSrc);
      img.setAttribute('class', 'js-animate-disabled');
    }
  });
}

button.addEventListener('click', function(e) { 
  e.preventDefault();
  list.innerHTML = '';

  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=cat&limit=50&api_key=dc6zaTOxFJmzC';

  makeRequest(dataURL); 
}, false);
