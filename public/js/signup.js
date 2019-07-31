  var btn = document.querySelector("#btn")

  if (alreadySignedUp === true){
    btn.addEventListener('click',withdraw)
  }else if (alreadySignedUp === false){
    btn.addEventListener('click',signUp)
  }

function signUp (){
  btn.innerHTML = "Withdraw from the ride!"
  btn.removeEventListener('click',signUp)
  btn.addEventListener('click',withdraw)

  var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);

  var url = "http://127.0.0.1:3000/signup";
  request.open("post", url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  var dataSet = {
    data:data[0],
    cookies:cookies,
    status: 'INSERT INTO signups (user_id,event_id) VALUES ($1,$2)'
  }

  // var usercontainer = document.createElement('li')
  // usercontainer.class="signups"
  // usercontainer.id="user"+cookies.id
  // var username = document.createElement('a')
  // username.innerHTML = cookies.user_name
  // username.class="eventcards"
  // username.href="/users/"+cookies.id
  // usercontainer.appendChild(username)
  // document.getElementById("signuplist").appendChild(usercontainer)



  var overallData = JSON.stringify(dataSet)
  request.send(`data=${overallData}`);

}

function withdraw(){
  btn.innerHTML = "Sign up for the ride!"
  btn.removeEventListener('click',withdraw)
  btn.addEventListener('click',signUp)

  var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);

  var url = "http://127.0.0.1:3000/signup";
  request.open("post", url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  var dataSet = {
    data:data[0],
    cookies:cookies,
    status: 'DELETE FROM signups WHERE user_id=$1 AND event_id=$2'
  }
  // var identifier = "user"+cookies.id
  // document.getElementById(identifier).remove()



  var overallData = JSON.stringify(dataSet)
  request.send(`data=${overallData}`);

}
