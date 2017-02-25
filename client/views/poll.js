Template.pollListItem.events = {
	'click [data-action="view-poll"]': function(event){
		event.preventDefault();
		Router.go("/poll/" + this._id);
	}
};

Template.pollDetails.events = {
	'click [data-action="vote-on-poll"]': function(event){
		event.preventDefault();

		var currentVotes = Votes.find().fetch();
		var currentUser = Meteor.userId();

		if(currentUser === null) {
			alert('Please log in to vote.');
		} else {
			for(var i = 0; i < currentVotes.length; i++) {
				if(currentVotes[i].userId === currentUser) {
					alert('You can only vote once!');
					return;
				};
			}
			var poll = Template.currentData();
			var pollOption = this;
			Votes.insert({
				userId: Meteor.userId(),
				pollId: poll && poll._id,
				timestamp: moment().valueOf(),
				option: pollOption.valueOf()
			});
		}
	}
};

Template.pollDetails.helpers({
	'voteCountForOption': function(){
		var pollOption = this;
		return Votes.find({option: pollOption.valueOf()}).count();
	}
});
