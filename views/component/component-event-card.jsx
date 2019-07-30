var React = require("react");

class Articlecard extends React.Component {
  render() {
    console.log(this.props.types);
    var eventLink = "/event/"+this.props.event_id;
    var map = ''+this.props.event_route
    return (

      <div class="articlewriteup" >
      <a href={eventLink} class="eventcards">
        <p>Event Name: {this.props.event_name}</p>
        <p>Start Date: {this.props.start_date}</p>
        <p>End Date: {this.props.end_date}</p>
        <p>Event Duration: {this.props.duration}</p>
        <p>Event Route:</p>
        <div id={this.props.event_id}></div>
        <p>Event Description: {this.props.event_description}</p>
        <p>Event ID: {this.props.event_id}</p>
        <p>By: {this.props.user_name}</p>
        <p>{this.props.created_at.toString()}</p>
      </a>
      </div>
    );
  }
}

module.exports = Articlecard;
