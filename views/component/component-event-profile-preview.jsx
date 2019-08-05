var React = require("react");

class Articlecard extends React.Component {
  render() {
    var eventLink = "/event/"+this.props.event_id;

    return (

      <div class="articlewriteup" >
      <a href={eventLink} class="eventcards">
        <p>Event Name: {this.props.event_name}</p>
        <p>Event Description: {this.props.event_description.slice(0,150)}...</p>
      </a>
      </div>
    );
  }
}

module.exports = Articlecard;
