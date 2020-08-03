var express = require('express');
var app = express();

app.set('view engine', 'ejs');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Book = require('./Book.js');

app.use('/createbook', (req, res) => {
	var newBook = new Book(req.body);
	newBook.save( (err) => { 
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.send('Created new book');
		}
	    } ); 
    });



app.use('/search', (req, res) => {
	
	if (req.body.which == 'all') {
	    searchAll(req, res);
	}
	else if (req.body.which == 'any') {
	    searchAny(req, res);
	}
	else {
	    searchAll(req, res);
	}
	

    });


function searchAny(req, res) {

    var terms = [];

    if (req.body.title) {
	terms.push( { title: { $regex : req.body.title } });
    }
    if (req.body.name) {
	terms.push( { 'authors.name' : req.body.name });
    }
    if (req.body.year) {
	terms.push( { year: req.body.year });
    }
    var query = { $or : terms };

	Book.find( query, (err, books) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.render('books', { books: books });
		}
	    }).sort( { 'title': 'asc' } );

}

function searchAll(req, res) {

	var query = {};
	if (req.body.title) {
	    query.title = req.body.title;
	}
	if (req.body.name) {
	    query['authors.name'] = req.body.name;
	}
	if (req.body.year) {
	    query.year = req.body.year;
	}

	Book.find( query, (err, books) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.render('books', { books: books });
		}
	    });
	
}




app.use('/public', express.static('public'));


app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
