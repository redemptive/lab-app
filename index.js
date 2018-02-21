const request = require("request");
const http = require("http");
const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
app.set("view engine", "ejs");
const port = 3000;


function startServer() {
	app.get("/", (req, res) => {
		console.log("Request recieved for " + req.url);
		res.render("index");
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
	app.post("/addlab", (req, res) => {

	});
	app.listen(port, () => {
		console.log("Server started on port " + port); 
	});
}

function connectToDb() {
	const connection = mongoose.connect("mongodb://34.243.248.231:27017");
	const resultModel = mongoose.model('Result', new Schema({
		studentName: String,
		teacherName: String,
		score: String,
		labName: String,
		time: String,
		date: Date
	}))
}

connectToDb();
startServer()