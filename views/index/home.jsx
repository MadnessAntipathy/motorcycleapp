var React = require("react");
var Layout = require("../component/layout.jsx")
var Articlecard = require("../component/component-article-card.jsx")


class Home extends React.Component {
  render() {
    console.log(this.props.types);
    if (this.props.data){
      var articles = this.props.data.map((obj) => {
        return <Articlecard title={obj.title} content={obj.content} user_name={obj.user_name} user_id={obj.id} created_at={obj.created_at}/>;
      });
    }else{
      var articles = <div class="articlewriteup" style={{textAlign:"center"}}><p>Oops, it looks like there are no articles. Create some articles submit them!</p></div>
    }


    return (
      <Layout cookies={this.props.cookies}>

      {articles}

      </Layout>
    );
  }
}

module.exports = Home;
