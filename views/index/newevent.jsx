var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {

    return (
      <Layout cookies={this.props.cookies}>
      <div class="articlewriteup" style={{textAlign:"center"}}>
      <form action="/newevent" method="post">
      <label>Event Name</label><br/>
      <input type="text" name="event_name" placeholder="My event" required/><br/><br/>
      <label>Event Start Date</label><br/>
      <input type="date" name="start_date" required/><br/><br/>
      <label>Event End Date</label><br/>
      <input type="date" name="end_date" required/><br/><br/>
      <label>Event Duration</label><br/>
      <input type="text" name="duration" placeholder="Hours" required/><br/><br/>
      <label>Event Route</label><br/>
      <input type="text" name="event_route" placeholder="Google map link" required/><br/><br/>
      <label>Event Description</label><br/>
      <textarea type="text" rows="4" cols="50" name="event_description" placeholder="Describe your event" required/><br/><br/>
      <input type="submit" value="Create new event"/>
      </form>
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
