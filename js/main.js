
$(document).ready(function(){

	var toDoItems = new ToDoItems();

	var toDoItemsView = new ToDoItemsView({ model: toDoItems});

	$("body").append(toDoItemsView.render().$el);
});