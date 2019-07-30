var React = require("react");
var Layout = require("../component/layout.jsx")
var Eventcard = require("../component/component-event-card.jsx")


class Home extends React.Component {
  render() {
    var displayInfo = this.props.data.queryResult.map((obj)=>{
      if (this.props.data.queryRes){
        var loggedInStatus = <button id="btn">Withdraw from the ride!</button>
      }else{
        var loggedInStatus = <button id="btn">Sign up for the ride!</button>
      }
      return <Eventcard cookies={this.props.cookies} loggedInStatus={loggedInStatus} event_id={obj.event_id} user_name={obj.user_name} event_name ={obj.event_name} start_date={obj.start_date} end_date={obj.end_date} duration={obj.duration} event_route={obj.event_route} event_description={obj.event_description} created_at={obj.created_at}></Eventcard>
    })
    if (this.props.cookies.login_status === "true"){
      if (this.props.data.queryRes){
        var alreadySignedUp = true
      }else{
        var alreadySignedUp = false
      }
    }else{
      var alreadySignedUp = null
    }

    var data = JSON.stringify(this.props.data.queryResult)
    var cookies = JSON.stringify(this.props.cookies)

    return (
      <Layout cookies={this.props.cookies}>
      <div>
      {displayInfo}
      </div>

      <script dangerouslySetInnerHTML={ {__html:
        `
          var data = ${data};
          var alreadySignedUp = ${alreadySignedUp}
          var cookies = ${cookies}
        `
      }}/>

      <script src="/js/signup.js"></script>
      <script src="/js/dangerouslysetinnerhtml.js"></script>
      </Layout>
    );
  }
}

module.exports = Home;

//
// {this.props.data.user_name}<br/><br/>
// {this.props.data.event_name}<br/><br/>
// {this.props.data.start_date}<br/><br/>
// {this.props.data.end_date}<br/><br/>
// {this.props.data.duration}<br/><br/>
// {this.props.data.event_route}<br/><br/>
// {this.props.data.event_description}<br/><br/>
// {this.props.data.created_at}<br/><br/>
