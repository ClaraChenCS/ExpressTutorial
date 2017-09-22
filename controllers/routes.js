// routes.js
// Calls for Libraries to be used

var _ = require('underscore');      // Javascript Helper Library


/* Routes Rendering Views
=============================
 */
var indexfn = function (req, res) {
    console.log("Visiting HOME page");
  res.render("index");
};

var aboutusfn = function (req, res) {
    console.log("Visiting Aboutus page");
    res.render("aboutus");
};

/* Map Routes
=============================
 */

var define_routes = function(dict) {
    var toroute = function(item) {
        return _.object(_.zip(['path','fn'],[item[0],item[1]]));
    };
    console.log("We are in routes...");
    return _.map(_.pairs(dict), toroute);
};

/* Define Routes
==============================
 */
var routes = define_routes({
    '/': indexfn,
    '/aboutus': aboutusfn
});

module.exports = routes;