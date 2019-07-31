var React = require("react");
var Layout = require("../component/layout.jsx")
var Articlecard = require("../component/component-article-card.jsx")


class Home extends React.Component {
  render() {
    console.log(this.props.types);
    


    return (
      <Layout cookies={this.props.cookies}>



      </Layout>
    );
  }
}

module.exports = Home;
