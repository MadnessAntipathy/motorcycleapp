window.onload = function() {
  if (data){
    data.map((obj)=>{
      var gmap = document.createElement('p')
      gmap.innerHTML = obj.event_route
      var id = obj.event_id
      document.getElementById(`${id}`).appendChild(gmap)
    })
  }
};
