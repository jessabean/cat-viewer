var request = new XMLHttpRequest();
var button = document.getElementById('button');
var list = document.getElementById('list');

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
      console.log("ready");
      var data = JSON.parse(request.responseText);
      var dataArray = data.data.children;

      dataArray.forEach(function(item){
        var imgSrc  = (item.data.url).replace("http://imgur.com/", "http://i.imgur.com/");
        var imgData = item.data.thumbnail;
        var ext     = imgData.substring(imgData.length - 3);

        if(imgSrc.indexOf("imgur") > -1) {
          var img = document.createElement("img");
          img.setAttribute('src', imgSrc + "." + ext);
          list.appendChild(img);
        }
      })
    } else {
      showInfo('There was a problem with the request.');
    }
  }
}

button.addEventListener('click', function(e) { 
  e.preventDefault();
  var dataURL = 'https://www.reddit.com/r/cats.json?jsonp?&show=all&limit=6'
  makeRequest(dataURL); 
}, false);
