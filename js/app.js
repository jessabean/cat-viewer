var request = new XMLHttpRequest();
var modal   = document.getElementById('modal');

request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200){
        // the request is complete, parse data and call callback
        var response = this.responseText;
        showInfo(response);
    } else {
      console.log("not ready yet");
    }
};

request.open("GET","/profile.html",true);
request.send();

function showInfo(data) {
  modal.innerHTML = data;
};
