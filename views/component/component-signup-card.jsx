var React = require("react");

class Articlecard extends React.Component {
  render() {
    console.log(this.props.types);
    var profileLink = "/users/"+this.props.user_id;
    var identifier = "user"+this.props.user_id;
    return (

      <li class="signups" id={identifier} >
      <a href={profileLink} class="eventcards">
        {this.props.name}
      </a>
      </li>
    );
  }
}

module.exports = Articlecard;
