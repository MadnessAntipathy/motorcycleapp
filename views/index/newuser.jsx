var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {

    return (
      <Layout cookies={this.props.cookies}>
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <form action="/register" enctype="multipart/form-data" method="post">
      <br/>


      <label>Select Profile Photo</label><br/>
      <div class="field-selector">
      <input type="file" name="profilephoto"/>
      </div><br/><br/>


      <label>Choose your user name</label><br/>
      <div class="field-selector">
      <input type="text" name="user_name"/>
      </div><br/><br/>

      <label>Choose your password</label><br/>
      <div class="field-selector">
      <input type="text" name="password"/>
      </div><br/><br/>

      <label>Share something about yourself</label><br/>
      <textarea type="text" rows="4" cols="50" name="about"/>
      <br/><br/>
      <button class="btn btn-primary" type="submit" value="">Register</button>
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
