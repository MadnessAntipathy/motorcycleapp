var React = require("react");
var Layout = require("../component/layout.jsx")
var Peventcard = require("../component/component-event-profile-preview.jsx")

class Home extends React.Component {
  render() {
    if (this.props.cookies.password){
      if (this.props.cookies.password == this.props.data[0].password){

        var displayInfo =
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>User ID: {this.props.data[0].id}</p>
        <p>Username: {this.props.data[0].user_name}</p>
        </div>

        if (this.props.data[0].event_name){
          var displayPosts = this.props.data.map((obj)=>{
            return <Peventcard event_name={obj.event_name} event_id={obj.eid} event_description={obj.event_description}></Peventcard>
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
      }
    }else {
      var displayInfo =
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
      </div>
      var displayPosts = ''
    }

    return (
      <Layout cookies={this.props.cookies}>
      {displayInfo}
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here are the events you've joined!</h3>
      {displayPosts}
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
