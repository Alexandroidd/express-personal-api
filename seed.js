// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var all_surfsites  = [
{
	name: 'Hossegor',
	location: 'France',
	bottom: 'Sand',
	shark_danger: 'None'
},
{
	name: 'Pipeline',
	location: 'Hawaii',
	bottom: 'Reef',
	shark_danger: 'Minimal'
},
{
	name: 'Fort Point',
	location: 'San Francisco',
	bottom: 'Boulders and jumpers',
	shark_danger: 'Minimal'
}
];


db.Surfsite.remove({}, function(err, surfsites){
	console.log("removed all surfsites");
});

db.Surfsite.create(all_surfsites, function(err, surfsite){
	if (err){
		return console.log('Error:', err);
	}
	console.log('Created new surfsite', surfsite.name);
	process.exit();
});