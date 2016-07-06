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
        var img     = document.createElement("img");

        img.setAttribute('src', imgSrc);
        list.appendChild(img);
      })
    } else {
      showInfo('There was a problem with the request.');
    }
  }
}

button.addEventListener('click', function(e) { 
  e.preventDefault();
  var dataURL = 'http://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC'
  makeRequest(dataURL); 
}, false);
