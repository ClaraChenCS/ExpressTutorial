var express = require('express'),
    path =  require('path'),
    router = express.Router(),
    app = express(),                          // define app variable
    async = require('async'),                 // Perform Asynchronous functions
    http = require('http'),                   // Require http server
    routes = require('./controllers/routes'),   // Define routes path
    serveStatic = require('serve-static'),     // Serve Static Files
    port = process.env.PORT || 2000,           // Require HTTP server
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');      // parse body of REST requests

// view engine setup to ejs
app.engine('.html', require('ejs').__express);
app.set('view engine','html');


/* Middlewares
==========================
 */
app.use(bodyParser.urlencoded({ extended: true}));      // configure "app" to use bodyParser() to handle date from POST
app.use(bodyParser.json());                             // define parse format - JSON
app.use('/public', serveStatic(__dirname + '/public/'));// Serve Static Files from the directory "public"
app.use(require('cookie-parser')());                    // Enable cookies on App

/* ROUTES
===========================
 */
for(var route in routes){
  app.get(routes[route].path, routes[route].fn);
}

// view engine setup to ejs
app.engine('.html', require('ejs').__express);
app.set('view engine','html');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* Start Server
=======================================
 */
async.parallel([
    function() {
      //Begin listening for HTTP requests to Express app
        http.createServer(app).listen(port, function(){
          console.log("Listening on " + port);
        });
    }
]);

module.exports = app;
