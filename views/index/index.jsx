var React = require("react");
var Layout = require("../component/layout.jsx")


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
