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
      var arr = data.data.children;
      arr.forEach(function(item){
        var listItem = document.createElement('li');
        listItem.innerHTML = item.data.url;
        list.appendChild(listItem);
        console.log(item.data.url);
      })
      // console.log(data.data.children);
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
