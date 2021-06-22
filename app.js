var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
const { mongo } = require("mongoose");
mongoose.connect('mongodb://localhost:27017/problems', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//Schema for problems
var problemSchema = new mongoose.Schema({
 problem : String,
 Description : String,
 location : String,
 contact : String,
 bloodGroup : String,
 name : String,
 age : Number,
 hospital : String,
 admittedStatus : String,
 content : String,
 date : Date
});

var problems = mongoose.model("problems", problemSchema);
;
app.set("view engine", "ejs");
app.get("/",function(req, res){
	
 res.render("landing");
});
app.get("/problems",function(req, res){
	problems.find({},function(err, problems){
		if(err){
			console.log(err);
		}
		else{
 res.render("index",{problems: problems});
		}
	});
});
app.get("/problems/createNew", function(req, res){
	res.render("new");
});
app.get("/about",function(req, res){
   res.render("about");
});

app.get("/vaccines",function(req, res){
	res.render("vaccines");
});
app.get("/voice",function(req, res){
	 res.render("voice");
});
app.post("/problems", function(req, res){
// 	problem : String,
//  Description : String,
//  location : String,
//  contact : String,
//  bloodGroup : String,
//  name : String,
//  age : Number,
//  hospital : String,
//  admittedStatus : String,
//  content : String,
//  date : Date
   var problem = req.body.problem;
   var Description = req.body.Description;
	var location = req.body.location;
	var contact = req.body.contact;
	var bloodGroup = req.body.bloodGroup;
	var name = req.body.name;
	var age = req.body.age;
	var hospital = req.body.hospital;
	var admittedStatus = req.body.admittedStatus;
	var content = req.body.content;
	var date = req.body.date;

	var newproblem = { 
		problem : problem,
        Description :Description,
        location : location,
        contact : contact,
        bloodGroup : bloodGroup,
        name : name,
        age : age,
        hospital : hospital,
        admittedStatus : admittedStatus,
        content : content,
        date : date
	};

	problems.create(newproblem,function(err, problems){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/problems");
		}
	});});
   

    app.get("/problems/:id", function(req, res){
 	problems.findById( req.params.id , function(err, problemInfo){
 		if(err){
 			console.log(err);
 		}
 		else{
 			res.render("show", { problems : problemInfo});
 		}
 	    });
     });
	

app.listen(3000,function(){
	console.log("Your Web app started");
})