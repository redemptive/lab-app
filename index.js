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
app.set("view engine", "ejs");
const port = 3000;


function startServer() {
	app.get("/", (req, res) => {
		console.log("Request recieved for " + req.url);
		Result.find((err, results) => {
			if (err) return handleError(err);
			console.log(results);
			res.render("index", {results: results});
		});
		console.log("Sent " + req.url);
	});
	app.get("/global.css", (req, res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(fs.readFileSync("./resources/global.css","utf-8"));
		res.end();
		console.log("Sent " + req.url);
	});
	app.get("/script.js", (req,res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(fs.readFileSync("./resources/script.js","utf-8"));
 		res.end();
 		console.log("Sent " + req.url);
	});
	app.post("/addresult", function(req, res) {
		console.log("Post request recieved for " + req.url + " from " + req.connection.remoteAddress);
		newResult = Result({
			studentName: req.body.studentName,
			teacherName: req.body.teacherName,
			// score: req.body.score,
			// labName: req.body.labName,
			// time: req.body.time,
			// date: req.body.date
		});
		newResult.save();
		res.write("Success!");
 		res.end();
 		console.log("Sent " + req.url);
	});
	app.listen(port, () => {
		console.log("Server started on port " + port); 
	});
}

var connection = mongoose.createConnection("mongodb://34.243.248.231/lab-db");
var schema = new Schema({
	studentName: String,
	teacherName: String,
	score: String,
	labName: String,
	time: String,
	date: Date
});

const Result = connection.model('Result', schema);
startServer()