var React = require("react");
var Layout = require("../component/layout.jsx")
var Peventcard = require("../component/component-event-profile-preview.jsx")

class Home extends React.Component {
  render() {
    if (this.props.cookies.password){
      if (this.props.cookies.password == this.props.data[0].password){
        var imgurl = this.props.data[0].profile_pic
        var displayInfo =
        <div class="profilewriteup" style={{textAlign:"center"}}>
        <div>
        <h3>Your profile details</h3>
        <div class="userdetails">
        <p>User ID: {this.props.data[0].id}</p>
        <p>Username: {this.props.data[0].user_name}</p>
        </div>
        </div>
        <div id="profile-picture" style={{backgroundImage: "URL("+"'"+imgurl+"'"+")"}}></div>
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


      }else {
        var displayInfo =
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
        </div>
        var displayPosts = ''
        var displayPast = ''
      }
    }else {
      var displayInfo =
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
      </div>
      var displayPosts = ''
      var displayPast = ''
    }

    return (
      <Layout cookies={this.props.cookies}>
      {displayInfo}
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here are the events you've joined!</h3>
      {displayPosts}
      </div>
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here are your past events!</h3>
      {displayPast}
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
