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
        <p>Event Description: {this.props.event_description}</p>
      </a>
      </div>
    );
  }
}

module.exports = Articlecard;
