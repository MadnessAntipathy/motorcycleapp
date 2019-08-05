var React = require("react");

class Articlecard extends React.Component {
  render() {
    var imgurl = "../"+this.props.profile_pic
    return (
      <div class="articlewriteup">
      <div style={{display:"flex", justifyContent:"space-around",flexDirection:"rows", textAlign:"center"}}>
        <div>
          <h5>Username: </h5>
          <p>{this.props.name}</p>
          <h5>About: </h5>
          <p>{this.props.about}</p>
        </div>
        <div id="profile-picture" style={{backgroundImage: "URL("+"'"+imgurl+"'"+")", textAlign:"center"}}></div>
      </div>
      </div>
    );
  }
}

module.exports = Articlecard;
