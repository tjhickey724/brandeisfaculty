Template.facList.helpers({
	facdata: function(){return FacData.find({},{sort:{lastname:1, firstname:1}})}
})

Template.facList.events({
	'click #reloadFD': function(event){
		Meteor.call('getFacData');
	}
})

Template.facListing.events({
	'click .faclisting': function(event){
		console.log('clicked on '+JSON.stringify(this));
	}

})