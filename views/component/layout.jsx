var React = require("react");

class Layout extends React.Component {
  render() {
    if (this.props.cookies){
      if (this.props.cookies.login_status === "true"){
        var loginstatus =
        <div>
        <div style={{display:"inline-block", margin:"0 10px 0 0"}}>Welcome, {this.props.cookies.user_name}</div>
        <div style={{display:"inline-block"}}>
        <form class="form-inline my-2 my-lg-0" action="/logout" method="post">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
        </form>
        </div></div>

        var register = ""

        var profile =
        <li class="nav-item">
          <a class="nav-link" href="/profile">Your Profile <span class="sr-only">(current)</span></a>
        </li>

        var submitArticle =
        <li class="nav-item">
          <a class="nav-link" href="/newarticle">New Article <span class="sr-only">(current)</span></a>
        </li>

        var createEvent =
        <li class="nav-item">
          <a class="nav-link" href="/newevent">New Event <span class="sr-only">(current)</span></a>
        </li>

      }else{
        var loginstatus =
        <form class="form-inline my-2 my-lg-0" action="/index" method="post">
          <input class="form-control mr-sm-2" type="search" name="username" placeholder="Username" aria-label="Search"/>
          <input class="form-control mr-sm-2" type="search" name="password" placeholder="Password" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
        </form>

        var register =
        <form id="registerbutton" class="form-inline my-2 my-lg-0" action="/register" method="get">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
        </form>

        var profile = ""

        var submitArticle = ""

        var createEvent = ""
      }
    }


    return (
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" type="text/css" href="/css/style.css"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>

        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-transparent">
          <a class="navbar-brand" href="/index">Ride On</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/events">Events <span class="sr-only">(current)</span></a>
              </li>
              {profile}
              {createEvent}
            </ul>
            {loginstatus}
            {register}
          </div>
        </nav>
          <div class="page-content">
            {this.props.children}
          </div>
        </body>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </html>
    );
  }
}

module.exports = Layout;
