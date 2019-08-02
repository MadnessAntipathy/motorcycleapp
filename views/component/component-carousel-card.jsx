var React = require("react");

class Articlecard extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <div class="articlewriteup">
        <h3 style={{textAlign:"center"}}>{this.props.title}</h3>
        <p style={{textAlign:"center"}}>{this.props.content}</p>
        <p style={{textAlign:"right"}}>Contributed by: {this.props.user_name}</p>
        <p style={{textAlign:"right"}}>Date written: {this.props.created_at.toString()}</p>
      </div>
    );
  }
}

module.exports = Articlecard;
