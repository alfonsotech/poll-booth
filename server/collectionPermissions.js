Polls.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	remove: function(userId, doc){
		return true;
	}
});

Votes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	remove: function(userId, doc){
		return true;
	}
});
