var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {
    return (
      <Layout cookies={this.props.cookies}>
        <div class="articlewriteup" style={{textAlign:"center"}}>
        <p>Oh dear, it appears that your username has been taken. You will be redirected to the index page in 3 seconds...</p>
        </div>
        <script type="text/javascript" src="/js/redirect.js"></script>
      </Layout>
    );
  }
}

module.exports = Home;
