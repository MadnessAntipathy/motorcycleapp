var commentButton = document.querySelector("#submitcomment")
var commentText = document.querySelector("#commentid")
if (commentButton){
  commentButton.addEventListener('click',submitComment)  
}


function submitComment (){

  var outerDiv = document.createElement('div')
  outerDiv.className = "commentcards"
  var innerDiv = document.createElement('div')
  var commentPara = document.createElement('p')
  commentPara.innerHTML = commentText.value
  var commentByPara = document.createElement('p')
  commentByPara.style.textAlign = "right"
  var anchorLink = document.createElement('a')
  anchorLink.href = "/users/"+cookies.id
  anchorLink.text = cookies.user_name
  anchorLink.style.display = "inline"
  var text = document.createElement('p')
  text.innerHTML = "By: "
  text.style.display = "inline"
  commentByPara.appendChild(text)
  commentByPara.appendChild(anchorLink)
  innerDiv.appendChild(commentPara)
  outerDiv.appendChild(innerDiv)
  outerDiv.appendChild(commentByPara)

  document.getElementById("commentsgohere").insertBefore(outerDiv, document.getElementById("commentsgohere").firstChild)


  var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);

  var url = "http://127.0.0.1:3000/addcomment";
  request.open("post", url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  var dataSet = {
    data:data[0].eid,
    cookies:cookies.id,
    comment:commentText.value
  }

  var overallData = JSON.stringify(dataSet)
  request.send(`data=${overallData}`);
}
