var React = require("react");

class Articlecard extends React.Component {
  render() {
    var eventLink = "/event/"+this.props.event_id;
    var editLink = "/edit/event/"+this.props.event_id;

    if (this.props.cookies.login_status === "true"){
      var button = this.props.loggedInStatus
    }else{
      var button = "You must register or log in to sign up for events!"
    }

    return (

      <div class="articlewriteup" >
        <div>
          <h2 style={{textDecoration:"underline"}}>{this.props.event_name}</h2>
        </div>
        <br/>
        <div class="eventwriteup">
          <div>
            <p>Start Date: {this.props.start_date}</p>
            <p>End Date: {this.props.end_date}</p>
          </div>
          <div>
            <p>Event Duration: {this.props.duration}</p>
            <p>By: {this.props.user_name}</p>
          </div>
        </div>

        <p>Event Route:</p>
        <div id={this.props.event_id}></div>
        <div id="eventdescription">
        <p style={{textAlign:"center"}}>Event Description: {this.props.event_description}</p>
        </div>

        <p>{button}</p>
        <form action={editLink} method="get">
          {this.props.editinfo}
        </form>
      </div>
    );
  }
}

module.exports = Articlecard;



// <p>{this.props.created_at.toString()}</p>
// <a href={eventLink} class="eventcards">
// </a>
