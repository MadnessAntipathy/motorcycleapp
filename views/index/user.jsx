var React = require("react");
var Layout = require("../component/layout.jsx")
var Usercard = require("../component/component-user-card.jsx")
var Peventcard = require("../component/component-event-profile-preview.jsx")


class Home extends React.Component {
  render() {
    var userProfile = this.props.data.map((obj)=>{
      return <Usercard name={obj.user_name} about={obj.about} profile_pic={obj.profile_pic}></Usercard>
    })
    if (this.props.events){
      var events = this.props.events.map((obj)=>{
        return <Peventcard event_name={obj.event_name} event_id={obj.id} event_description={obj.event_description.slice(0,150)}></Peventcard>
      })
    }


    return (
      <Layout cookies={this.props.cookies}>
      {userProfile}

      <div class="articlewriteup">
      <h3>Checkout some of the events <span style={{fontStyle:"italic"}}>{this.props.data[0].user_name}</span> is looking at.</h3>
      {events}
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
