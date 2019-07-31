var React = require("react");
var Layout = require("../component/layout.jsx")
var Eventcard = require("../component/component-event-card.jsx")
var Signupcard = require("../component/component-signup-card.jsx")
var Commentcard = require("../component/component-comment-card.jsx")

class Home extends React.Component {
  render() {
    if (this.props.data.queryResult){
      var displayInfo = this.props.data.queryResult.map((obj)=>{
        if (this.props.data.queryRes.length > 0){
          var loggedInStatus = <button id="btn">Withdraw from the ride!</button>
        }else{
          var loggedInStatus = <button id="btn">Sign up for the ride!</button>
        }
        return <Eventcard cookies={this.props.cookies} loggedInStatus={loggedInStatus} event_id={obj.eid} user_name={obj.user_name} event_name ={obj.event_name} start_date={obj.start_date} end_date={obj.end_date} duration={obj.duration} event_route={obj.event_route} event_description={obj.event_description} created_at={obj.e_created_at}></Eventcard>
      })
    }

    if (this.props.cookies.login_status === "true"){
      if (this.props.data.queryRes.length > 0){
        var alreadySignedUp = true
      }else{
        var alreadySignedUp = false
      }

      var addComments =
      <div class="addcommentsbox">
      <p>Leave a comment</p>
      <textarea id="commentid" name="comment" rows="4" cols="80"></textarea><br/>
      <button type="button" id="submitcomment">Submit comment</button>
      </div>


    }else{
      var alreadySignedUp = null
      var addComments = <p>Hey, you need to log in to post comments!</p>
    }

    if (this.props.data.result){
      var signups = this.props.data.result.map((obj)=>{
        if (obj.user_id != this.props.cookies.id){
          return <Signupcard name={obj.user_name} user_id={obj.user_id}></Signupcard>
        }
      })
    }else {
      var signups = ""
    }

    if (this.props.data.commentResult.length > 0){
      var comments = this.props.data.commentResult.map((obj)=>{
        return <Commentcard comment={obj.comment} user_id={obj.user_id} user_name={obj.user_name}></Commentcard>
      })
    }

    var data = JSON.stringify(this.props.data.queryResult)
    var cookies = JSON.stringify(this.props.cookies)

    return (
      <Layout cookies={this.props.cookies}>
      <div id="eventpage-container">
        <div id="displaycommentwrapper">
          <div>
            {displayInfo}
          </div>

          <div class="commentsbox">
            <h3>Comments Box</h3>
            {addComments}
            <div id="commentsgohere">
            {comments}
            </div>
          </div>
        </div>
        <div id="signupcontainer">
          <p style={{color:"white", fontWeight:"bold", fontStyle:"italic"}}>Sign ups!</p>
          <ul id="signuplist">
          {signups}
          </ul>
        </div>

      </div>
      <script dangerouslySetInnerHTML={ {__html:
        `
          var data = ${data};
          var alreadySignedUp = ${alreadySignedUp}
          var cookies = ${cookies}
        `
      }}/>
      <script src="/js/comments.js"></script>
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
