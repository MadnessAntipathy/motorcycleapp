var picchange =document.querySelector("#profile-picture")
picchange.addEventListener ('mouseenter', function(){
  var button = document.createElement('button')
  button.innerHTML = "Edit Photo"
  button.id = "profilebutton"
  button.setAttribute('data-toggle', 'modal')
  button.setAttribute('data-target', '#exampleModalCenter')
  button.className = "btn btn-primary"
  picchange.appendChild(button)
})

picchange.addEventListener ('mouseleave', function(){
  picchange.style.border = "none"
  var button = document.querySelector("#profilebutton")
  picchange.removeChild(button)
})

var submitdata = document.querySelector("#submitdata")
submitdata.addEventListener('click',function(){
})
