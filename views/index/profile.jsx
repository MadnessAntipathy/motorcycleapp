var React = require("react");
var Layout = require("../component/layout.jsx")
var Peventcard = require("../component/component-event-profile-preview.jsx")

class Home extends React.Component {
  render() {



    if (this.props.cookies.password){
      if (this.props.cookies.password == this.props.data[0].password){
        var imgurl = this.props.data[0].profile_pic
        var displayInfo =
        <div class="profilewriteup" id="displayinfo" style={{textAlign:"center"}}>
        <div id="profilenpic">

          <div class="col-sm-7">
            <h3>Your profile details</h3>

            <div class="userdetails">
              <h5>User ID: </h5><p>{this.props.data[0].id}</p>
              <h5>Username: </h5><p>{this.props.data[0].user_name}</p>
            </div>

            <div class="userdetails">
              <h5>About me: </h5><p>{this.props.data[0].about}</p>
            </div>

          </div>

          <div class="col-sm-3" id="profile-picture" style={{backgroundImage: "URL("+"'"+imgurl+"'"+")", textAlign:"center"}}></div>

        </div>
          <div>
          <form method="get" action="/edit/profile">
            <input type="hidden" name="id" value={this.props.data[0].id}/>
            <button class="btn btn-primary" type="submit" value="Edit profile">Edit profile</button>
          </form>
          </div>
        </div>

        if (this.props.data[0].event_name){
          var displayPosts = this.props.data.map((obj)=>{
            var q = new Date();
            var eventdate = new Date(obj.start_date)
            if (eventdate >= q){
              return <Peventcard event_name={obj.event_name} event_id={obj.eid} event_description={obj.event_description}></Peventcard>
            }
          })
          var displayPast = this.props.data.map((obj)=>{
            var eventdate = new Date(obj.start_date)
            var q = new Date();
            if (eventdate < q){
              return <Peventcard event_name={obj.event_name} event_id={obj.eid} event_description={obj.event_description}></Peventcard>
            }
          })
        }else{
          var displayPosts = <p>(Oops! It looks like you have not joined any events. Check out some events happening!)</p>
        }
        if (this.props.createdevents){
          var displayCreatedEvents = this.props.createdevents.map((obj)=>{
            var eventLink="/event/"+obj.id
            var year = obj.created_at.getFullYear()
            var month = obj.created_at.getMonth()+1
            var day = obj.created_at.getDay()
            return <a href={eventLink}><div class="createdeventsgroup"><p>Event Name: {obj.event_name}</p><p>Created on {day}/{month}/{year}</p></div></a>
          })
        }
      }else {
        var displayInfo =
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
        </div>
        var displayPosts = ''
        var displayPast = ''
        var displayCreatedEvents = ''
      }
    }else {
      var displayInfo =
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
      </div>
      var displayPosts = ''
      var displayPast = ''
      var displayCreatedEvents = ''
    }

    return (
      <Layout cookies={this.props.cookies}>
      {displayInfo}
      <div class="articlewriteup" style={{textAlign:"center"}}>
        <h3>Here are the past events you have created!</h3>
        <div id="createdevents">
          {displayCreatedEvents}
        </div>
      </div>
      <div id="currentevents" class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here are the events you are currently signed up for!</h3>
      {displayPosts}
      </div>
      <div id="pastevents" class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here are the past events you have joined!</h3>
      {displayPast}
      </div>
      <div style={{textAlign:"center"}}><a href="#displayinfo"><button class="btn btn-primary">Back to top</button></a></div>






<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Select new profile photo...</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action='/edit/profilephoto' enctype='multipart/form-data' id="form1" method="post">
        <input type="hidden" name='id' value={this.props.data[0].id}/>
        <input type="file" name="profilephoto"/>
        </form>
      </div>
      <div class="modal-footer">
        <button id="submitdata" type="submit" form="form1" class="btn btn-primary" value="">Update photo</button>
        <button  type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




      <script src="js/profilepicchange.js"></script>
      </Layout>
    );
  }
}

module.exports = Home;
