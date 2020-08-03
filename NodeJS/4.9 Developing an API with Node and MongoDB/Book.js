var mongoose = require('mongoose');

// where does the db name come from? I just made this up
mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
	name: String,
	affiliation: String
    });

var bookSchema = new Schema({
	title: {type: String, required: true, unique: true},
	year: Number,
	authors: [authorSchema]
    });


module.exports = mongoose.model('Book', bookSchema);

