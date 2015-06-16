
picsPerRow=4;

//facdata = [{emplid:5, image_url:"imgurl", firstname:"Tim", lastname:"Hickey"}];
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
  



