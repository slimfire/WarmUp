var YQL = require('yql');
var config = require('./config.js')
, accountSid = config.accountSid
, authToken = config.authToken
, client = config.client;

var PublicApis = function(){}

PublicApis.prototype.currentTemprature = function(zipcode, callback){
	var weatherData;
	var query = new YQL('SELECT * FROM weather.forecast WHERE (location = ' + zipcode + ')');

	query.exec(function(err, data) {
		var location = data.query.results.channel.location;
		var condition = data.query.results.channel.item.condition;
		if(!location || !condition)
		{
			weatherData = null;
		}
		else
		{
			weatherData = {
				city : location.city + ', ' + location.region,
				temprature : condition.temp
			}			
		}
		callback(null, weatherData);
	});
}

PublicApis.prototype.sendsms = function(phoneNumber, temprature, city){
	client.messages.create({
		to : "'" + phoneNumber + "'",
		from : '+19287665019',
		body : "Hey, the weather in " + city + " is " + temprature + " degrees. -Sent from WarmUp."
	}, function(err, message){
			process.stdout.write(message.status);
	});
}

module.exports = PublicApis;