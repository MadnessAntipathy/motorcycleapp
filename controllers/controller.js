
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
      db.object.getpastcreatedevents(request.cookies,(error1,info1)=>{
        var dataSet = {
          data: info,
          cookies: request.cookies,
          createdevents: info1
        }
        response.render('index/profile',dataSet);
      })
    })
  }

  let newuser = (request, response) => {
    response.render('index/newuser');
  };

  let register = (request, response, next)=>{
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
    db.object.eventpage(request.params.id,request.cookies,(error1,info1)=>{
      db.object.getgallery(request.params.id,(error2,info2)=>{
        var dataSet = {
          data: info1,
          cookies: request.cookies,
          galleryinfo: info2
        }
        response.render('index/eventpage',dataSet);
      })
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
    const file = request.files
    var requestdata = {
      file: request.files,
      body: request.body
    }
    db.object.posteventphotos(requestdata,(error,info)=>{
      var redirectLink = '/event/'+request.body.eid
      response.redirect(redirectLink)
    })
  };

  let editevent = (request, response)=>{
    db.object.editevent(request.params.id,(error,info)=>{
      var dataSet = {
        data:info,
        cookies: request.cookies
      }
      response.render('index/editevent',dataSet)
    })
  }

  let updateevent = (request, response)=>{
    db.object.updateevent(request.body,request.params.id,(error,info)=>{
      var redirectLink = "/event/"+request.params.id
      response.redirect(redirectLink)
    })
  }

  let editprofile = (request, response)=>{
    db.object.editprofile(request.query.id,(error,info)=>{
      var dataSet = {
        data:info,
        cookies: request.cookies
      }
      response.render('index/editprofile', dataSet)
    })
  }

  let updateprofile = (request, response)=>{
    db.object.updateprofile(request.body,request.cookies.id,(error,info)=>{
      response.redirect('/profile')
    })
  }

  let updateprofilephoto = (request, response)=>{
    const file = request.file
    var requestdata = {
      file: request.file,
      body: request.body
    }
    db.object.updateprofilephoto(requestdata,request.cookies.id,(error,info)=>{
      response.redirect('/profile')
    })
  }

  let userpage = (request,response)=>{
    db.object.userpage(request.params.id,(error, info)=>{
      db.object.getuserevents(request.params.id, (error1,info1)=>{
        var dataSet = {
          data: info,
          events: info1,
          cookies: request.cookies
        }
        response.render('index/user',dataSet)
      })
    })
  }

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
    editevent:editevent,
    updateevent:updateevent,
    editprofile:editprofile,
    updateprofile:updateprofile,
    updateprofilephoto:updateprofilephoto,
    userpage:userpage,
  };

}
