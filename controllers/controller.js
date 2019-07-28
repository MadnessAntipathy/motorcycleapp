module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let index = (request, response) => {
    var dataSet = {
      cookies: request.cookies
    }
    response.render('index/index', dataSet);
  };

  let login = (request, response)=>{
    db.object.login(request.body,(error,info)=>{
      if (info){
        if (request.body.username === info.user_name && request.body.password === info.password){
          response.cookie('id',info.id)
          response.cookie('user_name',info.user_name)
          response.cookie('password',info.password)
          response.cookie('login_status',"true")
          response.redirect('/index')
        }
      }else {
        // response.send("oops!")
        response.render('index/incorrectlogin', request.cookies)
      }
    })
  }

  let logout = (request, response)=>{
    response.cookie('id', '')
    response.cookie('user_name', '')
    response.cookie('password', '')
    response.cookie('login_status', '')
    response.redirect('/index')
  }

  let home = (request, response) => {
    db.object.home((error,info) => {
      var dataSet = {
        cookies: request.cookies,
        data: info
      }
      response.render('index/home', dataSet);
    })
  };

  let newarticle = (request, response) => {
    var dataSet = {
      cookies: request.cookies,
    }
    response.render('index/newarticle', dataSet);
  };

  let postarticle = (request, response) => {
    db.object.postarticle(request.cookies,request.body,(error,info)=>{
      var dataSet = {
        data: info
      }
      response.redirect('/home');
    })
  };

  let profile = (request, response) => {
    db.object.profile(request.cookies,(error,info)=>{
      var dataSet = {
        data: info,
        cookies: request.cookies
      }
      response.render('index/profile',dataSet);
    })
  }

  let newuser = (request, response) => {
    response.render('index/newuser');
  };

  let register = (request, response) => {
    db.object.register(request.body,(error,info)=>{
      if (info){
        response.cookie('id',info.id)
        response.cookie('user_name',info.user_name)
        response.cookie('password',info.password)
        response.cookie('login_status',"true")
        response.redirect('/index');
      }else{
        response.render("index/duplicateuser")
      }
    })
  };

  let events = (request, response) => {
    db.object.events((error,info)=>{
      var dataSet = {
        data: info
      }
      response.render('events',dataSet);
    })
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: index,
    login: login,
    logout: logout,
    home: home,
    newarticle: newarticle,
    postarticle: postarticle,
    profile: profile,
    newuser: newuser,
    register: register,
    // events: events,
  };

}
