var React = require("react");
var Layout = require("../component/layout.jsx")
var Eventcard = require("../component/component-event-card.jsx")
var Signupcard = require("../component/component-signup-card.jsx")
var Commentcard = require("../component/component-comment-card.jsx")

class Home extends React.Component {
  render() {
    // console.log("this query result")
    console.log(this.props.data.queryResult)
    console.log(this.props.cookies)

    if (this.props.data.queryResult){

      if (this.props.cookies.id == this.props.data.queryResult[0].id){
        var editInfo = <button class="btn btn-primary" type="submit" value="">Edit event details</button>
      }else{
        var editInfo = ''
      }

      var displayInfo = this.props.data.queryResult.map((obj)=>{
        if (this.props.data.queryRes.length > 0){
          var loggedInStatus = <button class="btn btn-primary" id="btn">Withdraw from the ride!</button>
        }else{
          var loggedInStatus = <button class="btn btn-primary" id="btn">Sign up for the ride!</button>
        }
        return <Eventcard editinfo={editInfo} cookies={this.props.cookies} loggedInStatus={loggedInStatus} event_id={obj.eid} user_name={obj.user_name} event_name ={obj.event_name} start_date={obj.start_date} end_date={obj.end_date} duration={obj.duration} event_route={obj.event_route} event_description={obj.event_description} created_at={obj.e_created_at}></Eventcard>
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
      <button class="btn btn-primary" type="button" id="submitcomment">Submit comment</button>
      </div>

      var addPhotos =
      <div id="photogallery">
        <div>
          <div class="articlewriteup" style={{textAlign:"center"}}>
          <form action="/eventphotos" enctype="multipart/form-data" method="post">
          <input type="hidden" name="eid"value={this.props.data.queryResult[0].eid}/>
          <input type="file" name="photogallery" multiple/><br/>
          <button class="btn btn-primary" type="submit" value="">Submit event photos</button>
          </form>
          </div>
        </div>
      </div>





    }else{
      var alreadySignedUp = null
      var addComments = <p>Hey, you need to log in to post comments and submit event photos!</p>
      var addPhotos = ""
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

    if (this.props.galleryinfo.length > 0){
      let count = 0
      let firstItem = true
      var displayPhotos = this.props.galleryinfo.map((obj)=>{
        var imgurl = "../"+obj.event_photos
        var slideText = "Slide"+count
        count+=1
        if (firstItem){
          firstItem = false

          return <div class="carousel-item active"><div class="carrr" style={{backgroundImage: "URL("+"'"+imgurl+"'"+")"}}></div></div>
        }else {
          return <div class="carousel-item"><div class="carrr" style={{backgroundImage: "URL("+"'"+imgurl+"'"+")"}}></div></div>
        }
      });
      count = 0
      firstItem = true
      var displayPhotoLink = this.props.galleryinfo.map((obj)=>{
        if (firstItem){
          firstItem = false
          count+=1
          return <li data-target="#carouselExampleIndicators" data-slide-to={count} class="active"></li>
        }else {
          count+=1
          return <li data-target="#carouselExampleIndicators" data-slide-to={count}></li>
        }
      })
    }

    var data = JSON.stringify(this.props.data.queryResult);
    var cookies = JSON.stringify(this.props.cookies);

    return (
      <Layout cookies={this.props.cookies}>
      <div id="eventpage-container">
        <div id="displaycommentwrapper">
          <div>
            {displayInfo}
          </div>





          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">

            {displayPhotoLink}

            </ol>
            <div class="carousel-inner">

            {displayPhotos}

            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          {addPhotos}


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


//
// <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
// <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
// <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>

// <div class="carousel-item active">
//   <img class="d-block w-100" src="..." alt="First slide"/>
// </div>
// <div class="carousel-item">
//   <img class="d-block w-100" src="..." alt="Second slide"/>
// </div>
// <div class="carousel-item">
//   <img class="d-block w-100" src="..." alt="Third slide"/>
// </div>
