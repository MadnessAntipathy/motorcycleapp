var React = require("react");

class Commentcard extends React.Component {
  render() {
    var profileLink = "/users/"+this.props.user_id;

    return (
      <div class="commentcards">
      <div>
        <p>{this.props.comment}</p>
      </div>
        <p style={{textAlign:"right"}}>By: <a href={profileLink}>{this.props.user_name}</a></p>
      </div>
    );
  }
}

module.exports = Commentcard;
