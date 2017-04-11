// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// var CampsiteSchema = new Schema({
//   description: String
// });

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;



var mongoose = require('mongoose');
Schema = mongoose.Schema;

var SurfsiteSchema = new Schema({
	// _id: Number,
	name: String,
	location: String,
	bottom: String,
	shark_danger: String
});

var Surfsite = mongoose.model('Surfsite', SurfsiteSchema);

module.exports = Surfsite;