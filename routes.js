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
  app.get('/event/:id', objectControllerCallbacks.eventpage);
  app.get('/profile', objectControllerCallbacks.profile);
  app.get('/newarticle', objectControllerCallbacks.newarticle);
  app.get('/newevent', objectControllerCallbacks.newevent);
  app.post('/newevent', objectControllerCallbacks.postevent);
  app.get('/register', objectControllerCallbacks.newuser);
  app.post('/register', objectControllerCallbacks.register);
  app.post('/newarticle', objectControllerCallbacks.postarticle);
  app.post('/signup', objectControllerCallbacks.signup);
  app.post('/index', objectControllerCallbacks.login);
  app.post('/logout', objectControllerCallbacks.logout);
};
