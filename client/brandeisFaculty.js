FacPages = new Mongo.Collection("facpages");
FacData = new Mongo.Collection("facdata");
picsPerRow=4;

//facdata = [{emplid:5, image_url:"imgurl", firstname:"Tim", lastname:"Hickey"}];

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('hideCompleted',false);

  Template.hello.helpers({
	  
  	facdata: function(){
		var data = FacData.find({},{sort: {lastname: 1}})
		console.log("looking up facdata, found "+JSON.stringify(data)+" records");
  		return data;
  	},
	
    facDataRows: function () {
           var all = FacData.find({}).fetch();
           var chunks = [];
           var size = picsPerRow;
           while (all.length > size) {
               chunks.push({ row: all.slice(0, size)});
               all = all.slice(size);
           }
           chunks.push({row: all});
           return chunks;
       },
	   
	   
	hideCompleted: function(){
		return Session.get("hideCompleted");
	},
	
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
Template.body.events({

	"change .hide-completed input": function (event){
		console.log("hideCompleted = "+event.target.checked);
		Session.set("hideCompleted", event.target.checked);
		console.log("session HC ="+Session.get("hideCompleted"));
	}
});

Template.employeePic.helpers({
	visibility: function(){
		   if (Session.get("hideCompleted")) {
			   return "hidden";
		   } else {
		   	   return "visible";
		   }
	   }
});
  
}

Meteor.methods({
	
	getFacPages: function(letter){
	    Meteor.http.call("post","http://apps.brandeis.edu/facguide-api/get_faculty_by_letter",
		{data:{letter:letter}},
		function(err,data) {
			var pages = JSON.parse(data.content).results;
			for(i in pages){console.log(pages[i]);};
	   	  //console.log("err="+err+" data="+ JSON.stringify(JSON.parse(data.content).results[0]))});
	    });
	},
	
	getFacData: function(emplid){
		
	}
})

// load in all of the faculty pages for faculty whose last name begins with the specified "letter"
function loadFacPages(letter){
	    Meteor.http.call("post","http://apps.brandeis.edu/facguide-api/get_faculty_by_letter",
			{data:{letter:letter}},
			function(err,data) {
				var pages = JSON.parse(data.content).results;
				for(var i in pages){
					console.log("loading page "+JSON.stringify(pages[i]));
					FacPages.insert(pages[i]);loadFacData(pages[i].emplid)}; 
				//console.log("err="+err+" data="+ JSON.stringify(JSON.parse(data.content).results[0]))});
			})
};

// load in the faculty data for the faculty with the specified employee id number
function loadFacData(emplid){
	console.log("\n\nloading "+emplid);
	Meteor.http.call(
		"post",
		"http://apps.brandeis.edu/facguide-api/get",
		{data:{emplid:emplid}},
		function(err,data) {
			if (err != null) console.log("err = "+err);
			else {
				var empldata = JSON.parse(data.content);
				console.log(empldata.lastname);
				FacData.insert(empldata);
			}
		}
    )
}		

function loadFacultyData(){
	FacPages.remove({});
	FacData.remove({});
	abcs="abcdefghijklmnopqrstuvwyz";
	for(var i=0;i<abcs.length; i++) 
		loadFacPages(abcs[i]);
}

if (Meteor.isServer) {


  Meteor.startup(function () {
	  if (FacPages.find({}).count()==0) {
		  loadFacultyData();
	  }
	  //  Meteor.call("getFacPages","H");

    // code to run on server at startup
  });
}
