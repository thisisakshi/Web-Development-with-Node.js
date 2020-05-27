var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
var handlebars = exphbs.handlebars;
var marked = require('marked');
var moment = require('moment');
var app = express();
var PORT = 3000;

var _DATA = dataUtil.loadData().local_businesses;

/// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get("/", function(req, res) {
  var industry = dataUtil.getAllTags(_DATA);
  res.render('home', {
      data: _DATA,
      industry: industry
  });
});

app.get("/addBusiness", function(req, res) {
  res.render('addBusiness');
});

app.post('/api/addBusiness', function(req, res) {
  var body = req.body;

  // Transform tags and content 
  body.industry = body.industry.split(" ");

  // Add time and preview
  body.preview = body.description.substring(0, 300);
  body.time = moment().format('MMMM Do YYYY, h:mm a');

  // Save new blog post
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.get('/api/getBusiness', function(req, res) {
  var dataString = dataUtil.stringifyData(_DATA);
  res.render('data',{dataString:dataString});
});

app.get('/post/:companyName', function(req, res) {
  var _companyName = req.params.companyName;
  var business_post = _.findWhere(_DATA, { companyName: _companyName });
  if (!business_post) return res.render('404');
  res.render('post', business_post);
});

app.get('/location', function(req, res) {
  var location = dataUtil.getAllLocations(_DATA);
  res.render('navigate', {location: location});
});

app.get('/location/:tag', function(req, res) {
  var location = dataUtil.getAllLocations(_DATA);
  var tag = req.params.tag;
  var posts = [];
  _DATA.forEach(function(post) {
      if (post.location.includes(tag)) {
          posts.push(post);
      }
});

res.render('home', {
      tag: tag,
      data: posts,
      location: location
  });
});

app.get('/industry', function(req, res) {
  var industry = dataUtil.getAllTags(_DATA);
  res.render('navigate', {industry: industry});
});


app.get('/industry/:tag', function(req, res) {
  var industry = dataUtil.getAllTags(_DATA);
  var tag = req.params.tag;
  var posts = [];
  _DATA.forEach(function(post) {
      if (post.industry.includes(tag)) {
          posts.push(post);
      }
});

res.render('home', {
      tag: tag,
      data: posts,
      industry: industry
  });
});

app.get('/smallCompanies', function(req, res) {
  var smallCompanies = dataUtil.allSmallCompanies(_DATA);
  var posts = [];
  smallCompanies.forEach(function(post) {
    posts.push(post);
  });

  res.render('home', {
    data: posts,
});
});

app.get('/youngCompanies', function(req, res) {
  var youngCompanies = dataUtil.allYoungCompanies(_DATA);
  var posts = [];
  youngCompanies.forEach(function(post) {
    posts.push(post);
  });

  res.render('home', {
    data: posts,
    youngCompanies: youngCompanies
  });
});

app.get('/recentlyAdded', function(req, res) {
  var recentlyAdded = dataUtil.allRecentlyAdded(_DATA);
  var posts = [];
  recentlyAdded.forEach(function(post) {
    posts.push(post);
  });

  res.render('home', {
    data: posts,
    recentlyAdded: recentlyAdded
  });
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + ' !');
});