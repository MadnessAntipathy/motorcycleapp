var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {

    return (
      <Layout cookies={this.props.cookies}>
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <form action="/edit/profile" enctype="multipart/form-data" method="post">
      <label>About you</label><br/>
      <textarea rows="4" cols="50" type="text" name="about" value={this.props.data[0].about} required/><br/><br/>
      <input type="submit" value="Update profile"/>
      </form>
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
