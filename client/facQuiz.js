Session.set('showCompleted',false);
Session.set('facnum',322);
facSize = FacData.find().count();

Template.facQuiz.helpers({
	randGuess: function() {
		const z = Session.get('currFac');
		return z;
	},

	deptFac:function(dept){
		return(FacData.find({depts:{$elemMatch:{descr:'Computer Science'}}},{sort:{lastname:1}}))},

	depts: ["African and Afro-American Studies", "American Studies", "Anthropology", "Biochemistry", "Biology", "Business", "Chemistry", "Classical Studies", "Comparative Literature", "Computer Science", "East Asian Studies", "Economics", "Education", "English", "Environmental Studies", "Film, Television and Interactive Media", "Fine Arts", "Genetic Counseling", "German, Russian, and Asian Languages and Literature", "Health:  Science, Society, and Policy", "History", "History of Ideas", "Hornstein Program in Jewish Professional Leadership", "International Business School", "International and Global Studies", "Islamic and Middle Eastern Studies", "Italian Studies", "Journalism", "Language and Linguistics", "Latin American and Latino Studies", "Legal Studies", "Mathematics", "Medieval and Renaissance Studies", "Music", "Near Eastern and Judaic Studies", "Peace, Conflict, and Coexistence Studies", "Philosophy", "Physics", "Politics", "Psychology", "Rabb School of Continuing Studies, Division of Graduate Professional Studies", "Religious Studies", "Romance Studies", "Sociology", "South Asian Studies", "The Heller School for Social Policy and Management", "Theater Arts", "Women's, Gender and Sexuality Studies"],
	


})

Template.facQuiz.events({
	'click #tryQuiz':
		function(){
			var count = FacData.find().count()
			var randFac = Math.floor( Math.random() * count );
			Session.set('facnum',randFac);
			Session.set('showCompleted',false);
			console.log("in tryQuiz: facnum -> "+Session.get('facnum'));
			const dept = $(".js-dept").val();
			console.dir(dept);
			var zs = FacData.find(
				{ depts:{$elemMatch:{descr: dept}}}).fetch();
			console.dir(zs);
			const j = _.random(zs.length-1);
			const z = zs[j];
			Session.set('facnum',z.facCount);
			Session.set('currFac',z);
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
