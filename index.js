const request = require("request");
const http = require("http");
const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Result;
app.set("view engine", "ejs");
const port = 3000;


function startServer() {
	//Get index page
	app.get("/", (req, res) => {
		console.log("Request recieved for " + req.url);
		Result.find((err, results) => {
			if (err) return handleError(err);
			console.log(results);
			res.render("index", {results: results});
		});
		console.log("Sent " + req.url);
	});
	//Get global CSS route
	app.get("/global.css", (req, res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(fs.readFileSync("./resources/global.css","utf-8"));
		res.end();
		console.log("Sent " + req.url);
	});
	//Get script.js route
	app.get("/script.js", (req,res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(fs.readFileSync("./resources/script.js","utf-8"));
 		res.end();
 		console.log("Sent " + req.url);
	});
	//Post route for adding a result to the database
	app.post("/addresult", function(req, res) {
		console.log("Post request recieved for " + req.url + " from " + req.connection.remoteAddress);
		//Create new Result object with the params
		var currentDate = new Date();
		newResult = Result({
			studentName: req.body.studentName,
			teacherName: req.body.teacherName,
			score: req.body.score,
			labName: req.body.labName,
			time: currentDate.getHours() + ":" + currentDate.getMinutes(),
			date: currentDate.getDate() + " " + currentDate.getMonth()
		});
		//Save the new object to the db
		newResult.save();
		res.write("Success! Added to database");
 		res.end();
 		console.log("Sent incoming data to " + process.env.DB_HOST);
	});
	app.listen(port, () => {
		console.log("Server started on port " + port); 
	});
}

function databaseSetup() {
	//Check for the DB_HOST environment variable
	if (process.env.DB_HOST) {
		//Connect to the DB if the env variable is there
		const connection = mongoose.createConnection(process.env.DB_HOST);
		const  schema = new Schema({
			studentName: String,
			teacherName: String,
			score: String,
			labName: String,
			time: String,
			date: String
		});
		Result = connection.model('Result', schema);
		console.log("Connected sucessfully to " + process.env.DB_HOST);
	} else {
		console.log("No DB_HOST environment variable set. Cannot connect to DB.");
	}
}
console.log();
databaseSetup();
startServer()