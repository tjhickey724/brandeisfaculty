var facList = FacData.find().fetch();
var facSize = facList.length;
var randFac = Math.round(facSize*Math.random());
Session.set('facnum',randFac);
Template.facQuiz.helpers({
	randGuess: function() {return facList[Session.get('facnum')];}
})

Template.facQuiz.events({
	'click #tryQuiz': function(){Session.set('facnum', Math.round(facSize*Math.random()));
	 			return Session.get('facnum')}
})