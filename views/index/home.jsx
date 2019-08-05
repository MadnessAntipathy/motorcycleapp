var React = require("react");
var Layout = require("../component/layout.jsx")
var Articlecard = require("../component/component-article-card.jsx")


class Home extends React.Component {
  render() {



    return (
      <Layout cookies={this.props.cookies}>


      <video id="video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/uploads/Video.mp4" type="video/mp4"/></video>


      </Layout>
    );
  }
}

module.exports = Home;


// <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
//   <source src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4" type="video/mp4"/>
// </video>



// <div class="overlay"></div>

// <div class="container h-100">
//   <div class="d-flex h-100 text-center align-items-center">
//     <div class="w-100 text-white welcometext">
//       <h1 class="display-3">Ride On</h1>
//       <h3 class="lead mb-0">Bringing riders closer, <br/> one ride at a time.</h3>
//       <br/>
//     </div>
//   </div>
// </div>
