//Imports
const request = require("request");
const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = require("express")();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const io = require("socket.io")(http);

//Variables
let Result;
const port = 3000;

//App configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('resources'))

//Functions
function startServer() {
	//Get index page
	app.get("/", (req, res) => {
		console.log("Request recieved for " + req.url);
		Result.find((err, results) => {
			if (err) return handleError(err);
			//Render index with database contents
			res.render("index", {results: results});
		});
		console.log("Sent " + req.url);
	});
	//Get reports route
	app.get("/reports", (req, res) => {
		console.log("Request recieved for " + req.url);
		Result.find((err, results) => {
			if (err) return handleError(err);
			//Render reports with database contents
			res.render("reports", {results: results});
		});
		console.log("Sent " + req.url);
	});
	//Get labs route
	app.get("/labs", (req, res) => {
		console.log("Request recieved for " + req.url);
		Result.find((err, results) => {
			if (err) return handleError(err);
			//Get an array of unique lab names
			const uniqueLabs = [...new Set(results.map((item) => item.labName))];
			//Render index with database contents
			res.render("labs", {
				results: results,
				labs: uniqueLabs
			});
		});
		console.log("Sent " + req.url);
	});
	//Post route for adding a result to the database
	app.post("/addresult", function(req, res) {
		console.log("Post request recieved for " + req.url + " from " + req.connection.remoteAddress);
		//Get current date
		let currentDate = new Date();
		//Create new Result object with the params
		let newResult = Result({
			studentName: req.body.studentName,
			teacherName: req.body.teacherName,
			score: req.body.score,
			labName: req.body.labName,
			time: currentDate.getHours() + ":" + currentDate.getMinutes(),
			date: currentDate.getDate() + "/" + (currentDate.getMonth() + 1)
		});
		//Save the new object to the db
		newResult.save();
		res.write("Success! Added to database");
 		res.end();
 		console.log("Sent incoming data to " + process.env.DB_HOST);
 		io.emit('db add', { for: 'everyone' });
	});
	io.on('connection', function(socket){
  		console.log('a user connected');
	});
	//Start server listening on the port defined by the variable port
	http.listen(port, () => {
		console.log("Server started on port " + port); 
	});
}

async function databaseSetup() {
	//Check for the DB_HOST environment variable
	if (process.env.DB_HOST) {
		console.log("Waiting for connection from " + process.env.DB_HOST);
		//Connect to the DB if the env variable is there
		const connection = await mongoose.createConnection(process.env.DB_HOST + "/lab-db").catch((err) => {
			if (err) {
				//Could not establish a connection
				console.log("Could not connect to " + process.env.DB_HOST);
				console.log("Exiting...");
				process.exit();
			}
		});
		//Connection established
		//Set the schema of the database
		const schema = new Schema({
			studentName: String,
			teacherName: String,
			score: String,
			labName: String,
			time: String,
			date: String
		});
		//Set up the model for communicating with the database
		Result = connection.model('Result', schema);
		console.log("Connected sucessfully to " + process.env.DB_HOST + "/lab-db");
		//Now start the server
		console.log("Starting server...");
		startServer();
	} else {
		//User has no DB_HOST environment variable set
		console.log("No DB_HOST environment variable set. Cannot connect to DB.");
		console.log("Exiting...");
		process.exit();
	}
}

databaseSetup();