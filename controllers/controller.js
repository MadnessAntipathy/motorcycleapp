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
        response.render('index/incorrectlogin', request.cookies)
      }
    })
  }

  let logout = (request, response)=>{
    response.clearCookie('id', {path:'/'})
    response.clearCookie('user_name', {path:'/'})
    response.clearCookie('password', {path:'/'})
    response.clearCookie('login_status', {path:'/'})
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

  let newevent = (request, response) => {
    var dataSet = {
      cookies: request.cookies
    }
    response.render('index/newevent', dataSet);
  };

  let postevent = (request, response) => {
    db.object.postevent(request.body,request.cookies,(error,info)=>{
      var redirectLink = '/event/'+info[0].id
      response.redirect(redirectLink);
    })
  };

  let eventpage = (request, response) => {
    db.object.eventpage(request.params.id,request.cookies,(error,info)=>{
      var dataSet = {
        data: info,
        cookies: request.cookies
      }
      response.render('index/eventpage',dataSet);
    })
  };

  let allevents = (request, response) => {
    db.object.allevents(request.params.id,(error,info)=>{
      var dataSet = {
        data: info,
        cookies: request.cookies
      }
      response.render('index/allevents',dataSet);
    })
  };

  let signup = (request, response) => {
    db.object.signup(request.body,(error,info)=>{
      var dataSet = {
        data: info,
        cookies: request.cookies
      }
      response.send("works!")
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
    newevent: newevent,
    postevent: postevent,
    eventpage: eventpage,
    allevents: allevents,
    signup: signup,
  };

}
