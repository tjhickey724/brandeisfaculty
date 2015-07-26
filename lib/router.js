Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'facQuiz'});
Router.route('/jsonexample', {name: 'jsonexample'});
Router.route('/allfac',{name:'facList'});
Router.route('/aggregate',{name:'aggregate'});

Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 	
		return FacData.findOne({_id:this.params._id})
	}
});

/*
Router.route('/people',{name:'people'});
Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 
		
		return Meteor.users.findOne({_id:this.params._id})
	}
});
Router.route('/profileEdit/:_id',
	{name:'profileEdit',
	data: function(){ return Meteor.users.findOne({_id:this.params._id})}
});
*/