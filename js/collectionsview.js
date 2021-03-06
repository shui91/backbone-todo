
var ToDoItemsView = Backbone.View.extend({

	tagName: "ul",

	id: "todoItems",

	initialize: function(options){
		var self = this;

		if (!(options && options.model)){

			throw new Error ("Model is not specified!");
		}

		this.model.on("add", this.onAddToDoItem, this);

		this.model.on("remove", this.onRemoveToDoItem, this);

		// this.listenTo(this.collection, "add", this.onAddToDoItem);
	},

	onAddToDoItem: function(toDoItem){ // handles Collections Events

		var view = new ToDoItemView({model: toDoItem});

		this.$el.append(view.render().$el);
	},

	onRemoveToDoItem: function(toDoItem){

		this.$("li#" + toDoItem.id).remove();

	},

	events: { // handles DOM events

		"keypress #newToDo": "onEnter"

	},

	onEnter: function(e){ // handles DOM events
		if (e.keyCode == 13){

			var $inputText = this.$('#newToDo');

			if ($inputText.val()){

				//this.collection.create({ title: $inputText.val()}) // 'cannot read property create of undefined'

				var toDoItem = new ToDoItem({ title: $inputText.val()});

				this.model.create(toDoItem.toJSON()); // .create does the job of save and add

				$inputText.val(""); // clears input after "Add"
			}

			//this.collection.create({ title: $inputText.val()}) // Paths must not be empty strings error
		}
	},

	render: function(){
		var self = this;

		var source = $("#input-template").html();

		var template = _.template(source);

		this.$el.html(template);

		this.model.each(function(toDoItem){

			var view = new ToDoItemView({model: toDoItem});

			self.$el.append(view.render().$el);

		});

		return this;
	}
});