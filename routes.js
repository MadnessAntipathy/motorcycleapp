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
  // app.get('/events', objectControllerCallbacks.events);
  app.get('/profile', objectControllerCallbacks.profile);
  app.get('/newarticle', objectControllerCallbacks.newarticle);
  app.get('/register', objectControllerCallbacks.newuser);
  app.post('/register', objectControllerCallbacks.register);
  app.post('/newarticle', objectControllerCallbacks.postarticle);
  app.post('/index', objectControllerCallbacks.login);
  app.post('/logout', objectControllerCallbacks.logout);
};
