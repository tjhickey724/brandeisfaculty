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
		loadFacultyData();
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
	console.log("loading data");
	FacPages.remove({});
	FacData.remove({});
	abcs="abcdefghijklmnopqrstuvwyz";
	for(var i=0;i<abcs.length; i++) 
		loadFacPages(abcs[i]);
	console.log("data is loaded");
}

