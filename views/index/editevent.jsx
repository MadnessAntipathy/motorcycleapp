var React = require("react");
var Layout = require("../component/layout.jsx")


class Home extends React.Component {
  render() {
    var actionLink = "/edit/event/" + this.props.data[0].id
    return (
      <Layout cookies={this.props.cookies}>
      <div class="articlewriteup" style={{textAlign:"center"}}>

      <form action={actionLink} method="post">
      <label>Event Name</label><br/>
      <input type="text" name="event_name" value={this.props.data[0].event_name} required/><br/><br/>
      <label>Event Start Date</label><br/>
      <input type="date" name="start_date" value={this.props.data[0].start_date} required/><br/><br/>
      <label>Event End Date</label><br/>
      <input type="date" name="end_date" value={this.props.data[0].end_date} required/><br/><br/>
      <label>Start Time</label><br/>
      <input type="text" name="start_time" value={this.props.data[0].start_time} required/><br/><br/>
      <label>Event Duration</label><br/>
      <input type="text" name="duration" value={this.props.data[0].duration} required/><br/><br/>
      <label>Event Route</label><br/>
      <input type="text" name="event_route" value={this.props.data[0].event_route} placeholder="Google map link" required/><br/><br/>
      <label>Event Description</label><br/>
      <textarea type="text" rows="4" cols="50" name="event_description" value={this.props.data[0].event_description} required/><br/><br/>
      <button class="btn btn-primary" type="submit" value="">Update event</button>
      </form>
      </div>
      </Layout>
    );
  }
}

module.exports = Home;
