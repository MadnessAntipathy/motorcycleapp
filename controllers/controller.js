
// const multer = require('multer');

// const express = require('express')
// const bodyParser= require('body-parser')
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../uploads')
//   },
//   filename: function (req, file, cb) {
//     console.log("file @ storage:"+file)
//     cb(null, "custom - "+Date.now()+file.originalname)
//   }
// })
// var upload = multer({ storage: storage })


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
    var dataSet={
      cookies:request.cookies
    }
      response.render('index/home',dataSet);
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

  let register = (request, response, next)=>{
      console.log(request.file)
      const file = request.file
      // if (!file) {
      //   const error = new Error('Please upload a file')
      //   error.httpStatusCode = 400
      //   return next(error)
      // }
      var requestdata = {
        file: request.file,
        body: request.body
      }
      db.object.register(requestdata,(error,info)=>{
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
      console.log(info)
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

  let addcomment = (request, response) => {
    db.object.addcomment(request.body,(error,info)=>{
      var dataSet = {
        data: info,
        cookies: request.cookies
      }
      response.send("works!")
    })
  };

  let posteventphotos = (request, response, next) => {
    console.log(request.file)
    const file = request.file
    var requestdata = {
      file: request.file,
      body: request.body
    }
    db.object.posteventphotos(requestdata,(error,info)=>{
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
    profile: profile,
    newuser: newuser,
    register: register,
    newevent: newevent,
    postevent: postevent,
    eventpage: eventpage,
    allevents: allevents,
    signup: signup,
    addcomment: addcomment,
    posteventphotos:posteventphotos,
  };

}
