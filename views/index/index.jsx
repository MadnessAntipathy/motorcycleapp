var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {



    return (
      <Layout cookies={this.props.cookies}>

      </Layout>
    );
  }
}

module.exports = Home;
