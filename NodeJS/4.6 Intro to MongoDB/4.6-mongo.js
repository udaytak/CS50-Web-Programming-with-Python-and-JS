var express = require('express');
var app = express();

app.set('view engine', 'ejs');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var Person = require('./Person.js');



app.use('/create', (req, res) => {
	var newPerson = new Person ({
		name: req.body.name,
		age: req.body.age,
	    });

	newPerson.save( (err) => { 
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.render('created', {person : newPerson});
		}
	    } ); 

    });





app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/personform.html'); } );



app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
