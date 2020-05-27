var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var Business = require('./models/Business');
var Showcase = require('./models/Showcase');
var expstate = require('express-state');

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load envirorment variables
dotenv.load();

console.log(process.env.MONGODB);

//connect to sandbox
mongoose.connect(process.env.MONGODB);
mongoose.connection.on("error", function(err){
    console.log("Connection was unable to take place");
    process.exit(1);
})

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

expstate.extend(app);
app.set("state namespace", 'App');

app.get('/', function(req, res){
    var businessList = [];
   

    Business.find({}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(function(a){
            businessList.push(a);
        });
        res.expose(businessList, "data");
        res.render("home", {data: businessList});
    });
});

app.get('/aboutThisProject', function(req, res){
    res.render('aboutThisProject', {});
});

app.get('/showcase', function(req,res){
    var showcaseList = [];
    Showcase.find({}, function(err, showcases){
        if(err) throw err;
        showcases.forEach(function(a){
            showcaseList.push(a);
        });
        res.expose(showcaseList, "data");
        res.render("showcase", {data: showcaseList});
    });
});

app.get('/addShowcase', function(req, res){
    res.render('addShowcase', {});
});

app.post('/addShowcase', function(req, res){
    var body = req.body;

    var showcase = new Showcase({
        eventname: body.eventname,
        website: body.website,
        location: body.location,
        description: body.description,
    });

    showcase.save(function(err){
        if(err) throw err;
        return res.redirect("/showcase");
    });

});

app.post('/api/addShowcase', function(req, res){
    var body = req.body;

    // console.log()

    var showcase = new Showcase({
        eventname: body.eventname,
        website: body.website,
        location: body.location,
        description: body.description,
    });

    showcase.save(function(err){
        if(err) throw err;
        return res.send("Successfully inserted activity!");
    });

});

app.get('/api/getShowcase', function(req, res){
    Showcase.find({}, function(err, showcases){
        if(err) throw err;
        res.send(showcases);
    });
});

app.get('/addBusiness', function(req, res){
    res.render('addBusiness', {});
});

app.post('/addBusiness', function(req, res){
    var body = req.body;

    // Transform tags and content 
    body.industry = body.industry.split(" ");

    var business = new Business({
        companyname: body.companyname,
        founder: body.founder,
        industry: body.industry,
        website: body.website,
        age: body.age,
        companysize: body.companysize,
        location: body.location,
        description: body.description,
    });

    business.save(function(err){
        if(err) throw err;
        return res.redirect("/");
    });

});

app.post('/api/addBusiness', function(req, res){
    var body = req.body;

    // console.log()

    var business = new Business({
        companyname: body.companyname,
        founder: body.founder,
        industry: body.industry,
        website: body.website,
        age: body.age,
        companysize: body.companysize,
        location: body.location,
        description: body.description,
    });

    business.save(function(err){
        if(err) throw err;
        return res.send("Successfully inserted activity!");
    });

});

app.get('/api/getBusiness', function(req, res){
    Business.find({}, function(err, businesses){
        if(err) throw err;
        res.send(businesses);
    });
});

app.get('/post/:id', function(req, res) {
        Business.findOne({_id: req.params.id},function(err,postById){  
        if(err) throw err;
        res.render('post', postById);
    });
  });

app.get('/delete/:id', function(req, res) {
       // Find movie by id
       Business.findByIdAndRemove(req.params.id, function(err, busin) {
        if (err) throw err;

        if(!busin){return res.send('No business with that id');}
        return res.redirect("/");
    });

});

app.get('/deleteShowcase/:id', function(req, res) {
    // Find movie by id
    Showcase.findByIdAndRemove(req.params.id, function(err, fair) {
     if (err) throw err;

     if(!fair){return res.send('No showcase with that id');}
     return res.redirect("/showcase");
 });

});

app.get('/location', function(req, res) {
    // var location = dataUtil.getAllLocations(_DATA);
    var locations = [];
    Business.find({}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {      
            if(!locations.includes(b.location)) {
                locations.push(b.location);
            }
        });
        res.render('navigate', {location: locations});
  });
  
});

app.get('/location/:tag', function(req, res) {
    var tag = req.params.tag;
    var posts = [];
    Business.find({location: tag}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {      
            posts.push(b)
        });
        res.render('home', {data: posts,});
    });
});

app.get('/industry', function(req, res) {
    var industry = [];
    Business.find({}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {    
            (b.industry).forEach(ind =>{
                if(!industry.includes(ind)) {
                    industry.push(ind);
                }
            })     
        });
        res.render('navigate', {industry: industry});
  });
});

app.get('/industry/:tag', function(req, res) {
    var tag = req.params.tag;
    var posts = [];
    Business.find({industry: tag}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {      
            if((b.industry).includes(tag)) {
                posts.push(b)
            }
        });
        res.render('home', {data: posts});
    });
  });

app.get('/smallCompanies', function(req, res) {
    // var smallCompanies = dataUtil.allSmallCompanies(_DATA);
    var posts = [];
    Business.find({}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {   
            if (b.companysize < 50) posts.push(b);
        });
        res.render('home', {data: posts});
    });
});

app.get('/youngCompanies', function(req, res) {
    var posts = [];
    Business.find({}, function(err, businesses){
        if(err) throw err;
        businesses.forEach(b => {   
            if (b.age < 10) posts.push(b);
        });
        res.render('home', {data: posts});
    });
});

app.get('/directoryByName', function(req, res){
    Business.find({}, function(err, businesses){
        if(err) throw err;
        var busin = _.sortBy(businesses, function(a){return a.companyname});

        res.render('directory', {data: busin});
    });
});

app.get('/chat', function(req, res) {
    res.render('chat');
});

io.on('connection', function(socket) {
    console.log('NEW connection');

   //Task 1 - Step 1: Listen for a new chat message
    socket.on('chat message', function(msg) {
        //Task 2 - Step 2: Emit new chat message to all clients currently connected
        io.emit('chat message', msg);
    })
        
    socket.on('disconnect', function() {
        console.log('User has disconnected');
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
