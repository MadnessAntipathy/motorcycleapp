var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <Layout cookies={this.props.cookies}>
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>Oh dear, it appears that you have entered an incorrect username or password. You will be redirected to the index page in 3 seconds...</p>
        </div>
        <script type="text/javascript" src="/js/redirect.js"></script>
      </Layout>
    );
  }
}

module.exports = Home;
