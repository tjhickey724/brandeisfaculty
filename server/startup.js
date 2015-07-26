 Meteor.startup(function () {
	  if (FacPages.find({}).count()==0) {
		  Meteor.call("getFacData");
	  }
	  //  Meteor.call("getFacPages","H");

    // code to run on server at startup
  });
