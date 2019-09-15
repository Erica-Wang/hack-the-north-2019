const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	axios = require('axios')
	unirest = require("unirest");


const app = express();
app.use(cors());


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('http://accentour-final-platinum.uedpnpkwfs.us-east-2.elasticbeanstalk.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/signup', function (req, res){
	axios.post('http://accentour-final-platinum.uedpnpkwfs.us-east-2.elasticbeanstalk.com/create_user?username'
		+req.body.us2ername).then((res)=>{
			console.log(res);
		});
	
	return res.json();
});

app.post('/login', function (req, res) {
	console.log(req.body);
  	return res.json();
});

app.post('/searchTours', function (req,res){
	var uniDestination = req.body.uniDestination;
	var visitSeason = req.body.visitSeason;
	var amountTravellers = req.body.amountTravellers;

	axios.get('http://accentour-final-platinum.uedpnpkwfs.us-east-2.elasticbeanstalk.com/get_all_tours')
	.then((result)=>{
		result = result.data;
		var matches = [];
		for(var k of result){
			var tour = k;
			if(tour.UniversityName==uniDestination && tour.Season==visitSeason && tour.AvailableSize >= amountTravellers){
				matches.push(tour);
			}
    	}
		console.log(matches);
		return res.json(matches);
	});
});


var bookFlights = (url, key, clas, date)=>{

	var req = unirest("GET", "https://apidojo-hipmunk-v1.p.rapidapi.com/flights/book");

	req.query({
		"cabin": clas,
		"booking_url": url,
		"itin": key,
		"date0": date,
	});

	req.headers({
		"x-rapidapi-host": "apidojo-hipmunk-v1.p.rapidapi.com",
		"x-rapidapi-key": "e600a8145cmsh66979272cf4564cp151f8bjsne7364342f99b"
	});


	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
	});
}

app.post('/loadAirports', function (req, res){

	var departureCity = req.body.departureCity;

	console.log(req.body);

	var drequest = unirest("GET", "https://apidojo-hipmunk-v1.p.rapidapi.com/locations/search");

	drequest.query({
		"query": departureCity
	});

	drequest.headers({
		"x-rapidapi-host": "apidojo-hipmunk-v1.p.rapidapi.com",
		"x-rapidapi-key": "e600a8145cmsh66979272cf4564cp151f8bjsne7364342f99b"
	});


	drequest.end(function (result) {
		if (result.error) throw new Error(result.error);
		if(result.body.endpoints.city[0]){
			return res.json({airports: result.body.endpoints.city[0].related_airports});
		}else{
			return res.json({airports: 'error'});
		}
	});
});


const port = process.env.API_PORT || 4000;

const server = app.listen(port, function(){
	console.log('Listening on port ' + port);
});