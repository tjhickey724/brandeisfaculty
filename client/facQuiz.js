Session.set('showCompleted',false);	
Session.set('facnum',322);
facSize = FacData.find().count();

Template.facQuiz.helpers({
	randGuess: function() {
		var z = FacData.findOne({facCount:Session.get('facnum')});
		return z;
	}
})

Template.facQuiz.events({
	'click #tryQuiz': 
		function(){
			var count = FacData.find().count()
			var randFac = Math.floor( Math.random() * count );
			Session.set('facnum',randFac);
			Session.set('showCompleted',false);
			console.log("in tryQuiz: facnum -> "+Session.get('facnum'));
		},
	'click #show':
	function(){
		Session.set('showCompleted',true);
	}
})

Template.facGuess.helpers({
	visibility: function(){
		if (Session.get("showCompleted")) {
			   return "visible";
		   } else {
		   	   return "hidden";
		   }
	},
	showCompleted: function(){
		return Session.get("showCompleted")
	}
})

Template.facGuess.events({

	"change .show-completed input": function (event){
		console.log("showCompleted = "+event.target.checked);
		Session.set("showCompleted", event.target.checked);
		console.log("session HC ="+Session.get("showCompleted"));
	}
});

