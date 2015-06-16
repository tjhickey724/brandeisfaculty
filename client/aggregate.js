Template.aggregate.helpers({
	facCount:function(){return(FacData.find().count())},
	facOneDept: function(n){ return(FacData.find({depts:{$size:n}})).count()},
	numFac:function(dept){ return(FacData.find({depts:{$elemMatch:{descr:'Computer Science'}}})).count()},
	deptFac:function(dept){ return(FacData.find({depts:{$elemMatch:{descr:'Computer Science'}}},{sort:{lastname:1}}))}
})