var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {
    console.log(this.props.types);
    if (this.props.cookies.login_status === "true"){
      var form =
      <div class="articlewriteup" style={{textAlign:"center"}}>
        <form action="/newarticle" method="post">
        <label>Title</label><br/>
        <input type="text" name="title"/><br/><br/>
        <label>Story</label><br/>
        <textarea rows="20" cols="50" type="text" name="content"/><br/><br/>
        <input type="hidden" name="user_id" value={this.props.cookies.id}/>
        <input type="submit" value="Submit New Article"/>
        </form>
      </div>
    }else {
      var form =
      <h3>Hi! We noticed you have not signed in yet. Please sign in or create an account to submit articles. Thank you!</h3>
    }


    return (
      <Layout cookies={this.props.cookies}>
        {form}
      </Layout>
    );
  }
}

module.exports = Home;
