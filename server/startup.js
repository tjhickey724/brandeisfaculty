 Meteor.startup(function () {
	  if (FacPages.find({}).count()==0) {
		  Meteor.call("getFacData");
		  //loadFacultyData();
	  }
	  //  Meteor.call("getFacPages","H");

    // code to run on server at startup
  });
