var request = new XMLHttpRequest();
var modal   = document.getElementById('modal');
var list    = document.getElementById('cats-directory');

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
      showInfo(request.responseText);
    } else {
      showInfo('There was a problem with the request.');
    }
  }
}

function showInfo(data) {
  modal.innerHTML = data;
};

list.addEventListener('click', function(e) { 
  e.preventDefault();
  makeRequest('profile.html'); 
}, false);
