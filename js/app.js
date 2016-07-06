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
      var data    = JSON.parse(request.responseText).data;

      data.forEach(function(item){
        var imgSrc  = item.images.fixed_height_still.url;
        var gifSrc  = item.images.fixed_height.url;
        var img     = document.createElement("img");

        img.setAttribute('src', imgSrc);
        img.setAttribute('class', 'js-animate-disabled')
        list.appendChild(img);

        animateGif(img, gifSrc);
      })
    } else {
      showInfo('There was a problem with the request.');
    }
  }
}

function animateGif(img, gif) {
  var img = img;
  var gif = gif;
  var origSrc = img.getAttribute('src');

  img.addEventListener('click', function(e) {
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
  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC'
  makeRequest(dataURL); 
}, false);
