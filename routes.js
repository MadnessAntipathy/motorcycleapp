// const express = require('express')
// const bodyParser= require('body-parser')
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))


const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "custom-"+Date.now()+file.originalname)
  }
})

var upload = multer({ storage: storage })
// var uploadMulti = multer({ storage: storage })


module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const objectControllerCallbacks = require('./controllers/controller')(allModels);

  app.get('/index', objectControllerCallbacks.index);
  app.get('/home', objectControllerCallbacks.home);
  app.get('/events', objectControllerCallbacks.allevents);
  app.post('/eventphotos', upload.array('photogallery',5), objectControllerCallbacks.posteventphotos);
  app.get('/event/:id', objectControllerCallbacks.eventpage);

  app.get('/users/:id', objectControllerCallbacks.userpage)

  app.get('/profile', objectControllerCallbacks.profile);
  app.get('/edit/profile', objectControllerCallbacks.editprofile);
  app.post('/edit/profile',upload.none(), objectControllerCallbacks.updateprofile);
  app.post('/edit/profilephoto',upload.single('profilephoto'), objectControllerCallbacks.updateprofilephoto);

  app.get('/newevent', objectControllerCallbacks.newevent);
  app.post('/newevent', objectControllerCallbacks.postevent);
  app.get('/register', objectControllerCallbacks.newuser);
  app.post('/register', upload.single('profilephoto'), objectControllerCallbacks.register);
  app.post('/signup', objectControllerCallbacks.signup);
  app.post('/index', objectControllerCallbacks.login);
  app.post('/logout', objectControllerCallbacks.logout);
  app.post('/addcomment', objectControllerCallbacks.addcomment)
  app.get('/edit/event/:id', objectControllerCallbacks.editevent)
  app.post('/edit/event/:id', objectControllerCallbacks.updateevent)
};
