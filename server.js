var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/intro-to-mongoose');

var CatSchema = new mongoose.Schema({
	name: String,
	age: Number
}, {timestamps: true});

mongoose.model('Cat', CatSchema);
var Cat = mongoose.model('Cat');

app.use(bodyParser.urlencoded());
// app.use(bodParser.json());
app.use(express.static(path.join(__dirname, './static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/', function(req, res){
	Cat.find({}, function(err, results){
		if(err){
			console.log(err);
			res.send('SOmething broke!');
		}else{
			res.render('index', {cats: results});
		}
	})
})

app.get('/cat', function(req, res){
	res.render('create');
})

app.post('/cat', function(req, res){
	console.log(req.body);
	// var new_cat = new Cat(req.body);
	var new_cat = new Cat({name: req.body.name, age: req.body.age});
	new_cat.save(function(err, results){
		if(err){
			console.log(err);
			res.send('Something went wrong');
		}else{
			console.log(results);
			res.redirect('/');
		}
	})
})

app.listen(8000, function(){
	console.log("You are building on port 8000");
})