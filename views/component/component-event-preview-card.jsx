var React = require("react");

class Eventpreviewcard extends React.Component {
  render() {
    console.log(this.props.types);
    var eventLink = "/event/"+this.props.event_id;
    var map = ''+this.props.event_route
    return (

      <div class="articlewriteup" >
      <a href={eventLink} class="eventcards">
        <h2>Event Name: {this.props.event_name}</h2>
        <div id="eventdescription">
        <p>Event Description: {this.props.event_description.slice(0,150)}...</p>
        </div>
        <p>By: {this.props.user_name}</p>
        <p>Start date: {this.props.start_date}</p>
      </a>
      </div>
    );
  }
}

module.exports = Eventpreviewcard;
