var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {
    console.log(this.props.types);
    console.log(this.props.data)
    if (this.props.cookies.password){
      if (this.props.cookies.password == this.props.data[0].password){

        var displayInfo =
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>User ID: {this.props.data[0].id}</p>
        <p>Username: {this.props.data[0].user_name}</p>
        </div>
        
        if (this.props.data[0].title){
          var displayPosts = this.props.data.map((obj)=>{
            return <div class="postwriteup" style={{textAlign:"center"}}><p>{obj.title}</p><p>{obj.content}</p></div>
          })
        }else{
          console.log('no title')
          var displayPosts = ''
        }


      }else {
        var displayInfo =
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
        </div>
        var displayPosts = ''
      }
    }else {
      var displayInfo =
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <p>It appears that you are trying to access a page without permission, please log in with your credentials to continue. Thank you</p>
      </div>
      var displayPosts = ''
    }

    return (
      <Layout cookies={this.props.cookies}>
      {displayInfo}
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <h3>Here's a recap on what you've wrote</h3>
      {displayPosts}
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
