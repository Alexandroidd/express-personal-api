// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    name: "Alex Creighton", // CHANGEd
    message: "Welcome to my personal api! Here's what you need to know!",
    github_link: "https://github.com/Alexandroidd", // CHANGE ME
    base_url: "https://dry-river-12525.herokuapp.com/", // CHANGED

    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/surfsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});


app.get('/api/profile', function index(req, res) {
  res.json({
    name: "Alex Creighton",
    current_city: "Denver",
    pets: [
    {
      name: 'Yoda',
      type: 'goldfish',
      breed: 'Ancient Goldfish'
    }],
  });

});

//Get All: Index Route---//

app.get('/api/profile/surfsites', function index(req, res) {
  db.Surfsite.find(function(err, surfsites) {                       //why here is it db.Surfsite (capitalized?) what is this referring to???
    if (err) {return console.log("index error:" + err);}
  res.json(surfsites);
  });
});
//-----

//Get One: Show Route----//

app.get('/api/profile/surfsites/:id', function show(req, res) {
  var surfId = req.params.id;
  db.Surfsite.findOne({'_id': surfId}, function (err, surfsite){
  if (err) {return console.log('index error:' + err);}
  res.json(surfsite);
  });
});
//------

//POST: CREATE ROUTE --//

app.post('/api/profile/surfsites/', function create(req, res) {
  var newSite = new db.Surfsite({
    name: req.body.name,
    location: req.body.location,
    bottom: req.body.bottom,
    shark_danger: req.body.shark_danger
  });

  newSite.save(function(err, site) {                        //IN THIS ONE, DO I HAVE TO 
    if (err) {return console.log("create error:" + err);}  //REFER THE NEWLY CREATED SITE BY THE NAME
    console.log('created site, ' + site.name);             //SITE? OR CAN I USE newSite from above??
    res.json(site);
  });
});
//--------

//PUT: UPDATE ROUTE --//

app.put('/api/profile/surfsites/:id', function update(req, res) {
  var surfId = req.params.id;
  db.Surfsite.findOne({'_id': surfId}, function(err,surfsite){
    if (err) {return console.log('update error:' + err);}
    surfsite.name = req.body.name;
    surfsite.location = req.body.location;
    surfsite.bottom = req.body.bottom;
    surfsite.shark_danger = req.body.shark_danger;

    surfsite.save(function(err, surfsite){
      if (err) {return console.log('save error:' + err);}
      res.json(surfsite);
    });
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
