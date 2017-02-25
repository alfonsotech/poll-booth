Template.newPoll.created = function(){
	var template = this;
	template.creatingPoll = new ReactiveVar(false);
};

Template.newPoll.events = {
	//when open-new-poll is clicked, new poll is created via Template.instance()
	'click [data-action="open-new-poll-input"]': function(event){
		event.preventDefault();
			if(Meteor.userId() === null) {
				alert('Please log in to create a new poll.');
			} else {
				var template = Template.instance();
				template.creatingPoll.set(true);
			}
	},
	//when cancel is clicked, state of create-new-poll is set to false, poll is cancelled
	'click [data-action="cancel-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(false);
	},
	// opens dialogue for the creation of a poll
	'click [data-action="create-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		Polls.insert({
			userId: Meteor.userId(),
			title: template.$('#newPollTitle').val(),
			description: template.$('#newPollDescription').val(),
			timestamp: moment().valueOf(),
			options: [
				'Yes',
				'No'
			]
		});
		//reset
		template.creatingPoll.set(false);
	}
};
