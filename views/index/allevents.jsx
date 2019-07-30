var React = require("react");
var Layout = require("../component/layout.jsx")
var Eventpreviewcard = require("../component/component-event-preview-card.jsx")


class Home extends React.Component {
  render() {
    if (this.props.data){
      var data = JSON.stringify(this.props.data)
      var displayInfo = this.props.data.map((obj)=>{
        return <Eventpreviewcard event_id={obj.event_id} user_name={obj.user_name} event_name ={obj.event_name} start_date={obj.start_date} end_date={obj.end_date} duration={obj.duration} event_route={obj.event_route} event_description={obj.event_description} created_at={obj.created_at}></Eventpreviewcard>
      })
    }else{
      var displayInfo = ""
    }

    return (
      <Layout cookies={this.props.cookies}>
      <div>
      <h3 class="articlewriteup" style={{textAlign:"center", color:'white'}}>Upcoming events</h3>
      {displayInfo}
      </div>
      </Layout>
    );
  }
}

module.exports = Home;


// {this.props.data.user_name}<br/><br/>
// {this.props.data.event_name}<br/><br/>
// {this.props.data.start_date}<br/><br/>
// {this.props.data.end_date}<br/><br/>
// {this.props.data.duration}<br/><br/>
// {this.props.data.event_route}<br/><br/>
// {this.props.data.event_description}<br/><br/>
// {this.props.data.created_at}<br/><br/>
