Template.newPoll.created = function(){
	var template = this;
	template.creatingPoll = new ReactiveVar(false);
};

Template.newPoll.events = {
	'click [data-action="open-new-poll-input"]': function(event){
		event.preventDefault();
			if(Meteor.userId() === null) {
				alert('Please log in to create a new poll.');
			} else {
				var template = Template.instance();
				template.creatingPoll.set(true);
			}
	},
	'click [data-action="cancel-new-poll"]': function(event){
		event.preventDefault();

		var template = Template.instance();
		template.creatingPoll.set(false);
	},
	'click [data-action="create-new-poll"]': function createNewPoll(event){
		event.preventDefault();

		var template = Template.instance();

		var title = template.$('#newPollTitle').val();

	 if(!title){
		 alert('A title is required!');
		 createNewPoll();
	 } else {
		 Polls.insert({
			 userId: Meteor.userId(),
			 title:
			 template.$('#newPollTitle').val(),
			 description: template.$('#newPollDescription').val(),
			 timestamp: moment().valueOf(),
			 options: [
				 'Yes',
				 'No'
			 ]
		 });
	 }
		template.creatingPoll.set(false);
	}

};
