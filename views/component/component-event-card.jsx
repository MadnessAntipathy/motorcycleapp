var React = require("react");

class Articlecard extends React.Component {
  render() {
    var eventLink = "/event/"+this.props.event_id;

    if (this.props.cookies.login_status === "true"){
      var button = this.props.loggedInStatus
    }else{
      var button = "You must register or log in to sign up for events!"
    }

    return (

      <div class="articlewriteup" >
      <a href={eventLink} class="eventcards">
        <h2>Event Name: {this.props.event_name}</h2>
        <p>Start Date: {this.props.start_date}</p>
        <p>End Date: {this.props.end_date}</p>
        <p>Event Duration: {this.props.duration}</p>
        <p>Event Route:</p>
        <div id={this.props.event_id}></div>
        <div id="eventdescription">
        <p>Event Description: {this.props.event_description}</p>
        </div>
        <p>Event ID: {this.props.event_id}</p>
        <p>By: {this.props.user_name}</p>
        <p>{this.props.created_at.toString()}</p>
      </a>
        <p>{button}</p>
      </div>
    );
  }
}

module.exports = Articlecard;
