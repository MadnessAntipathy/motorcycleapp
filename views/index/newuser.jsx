var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {

    return (
      <Layout cookies={this.props.cookies}>
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <form action="/register" enctype="multipart/form-data" method="post">
      <input type="file" name="profilephoto" />
      <label>Choose your user name</label><br/>
      <input type="text" name="user_name"/><br/><br/>
      <label>Choose your password</label><br/>
      <input type="text" name="password"/><br/><br/>
      <input type="submit" value="Create new user"/>
      </form>
      </div>
      </Layout>
    );
  }
}

module.exports = Home;


// <form action="/" enctype="multipart/form-data" method="post">
//     <input type="file" name="upload" multiple>
//     <input type="submit" value="Upload">
// </form>
// <form action="/register" enctype="multipart/form-data" method="post">
// <input type="file" name="upload" multiple/>
