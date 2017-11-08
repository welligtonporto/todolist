// Create html to show tasks
var createHtmlOfTaskItem = function(idTaskItem, titleTaskItem){
	var htmlOfTaskItem = '<li id="'+ idTaskItem +'" class="list-group-item">' +
					  		'<div class="row">' +
					  			'<div class="col-6 col-sm-8">' +
					  				'<span class="task-item-title">'+ titleTaskItem +'</span>' +
					  			'</div>' +
					  			'<div class="col-6 col-sm-4">' +
					  				'<div class="float-right">' +
						  				'<button class="btn btn-danger mr-1 del-task"><i class="icon-trash"></i></button>' +
						  				'<button class="btn btn-success done"><i class="icon-ok"></i></button>' +
						  				'<button class="btn btn-primary undo" style="display: none;"><i class="icon-ok"></i></button>' +
						  			'</div>' +
					  			'</div>' +
					  		'</div>' +
					  	'</li>';

	$("#todolist").append(htmlOfTaskItem);
}

// Load "to do list" with items of localStorage when load page
var loadToDoList = function(){
  existingTasks = localStorage.length;
  
  if (existingTasks){
    for (var i = 0; i < existingTasks; i++){
      idThisTask = localStorage.key(i);
      thisTaskItem = JSON.parse(localStorage.getItem(idThisTask));

      if (thisTaskItem.status != "deleted"){
        createHtmlOfTaskItem(idThisTask, thisTaskItem.title);

        if(thisTaskItem.status == "done") {
       		$("#" + idThisTask).addClass("disabled");
       		$("#" + idThisTask + " .btn-success").hide(); // Hide button for "done" 
       		$("#" + idThisTask + " .btn-primary").show(); // Show button for "undo" 
        }
      }
    }
  }
}();

// Functions to add a task item
var $newTask = $( $('#newtask') ); // Task input selector

$("#addtask").on('click', function(){
  var titleTaskItemForAdd = $newTask.val();

  if (titleTaskItemForAdd){
    idTaskItemForAdd = Date.now();
    createHtmlOfTaskItem(idTaskItemForAdd, titleTaskItemForAdd);
    addLocalStorage(idTaskItemForAdd, titleTaskItemForAdd, "todo");
    $newTask.val(''); // Clear input for a new task
  }
});

var addLocalStorage = function(idTaskItemForAdd, titleTaskItemForAdd, statusTaskItemForAdd){
  dataTaskItemForAdd = { "title" : titleTaskItemForAdd, "status" : statusTaskItemForAdd };
  localStorage.setItem(idTaskItemForAdd, JSON.stringify(dataTaskItemForAdd));
}

// Functions to edit a task item
var titleTaskItem = ".task-item-title";

// For "remove" a task item
$("body").on('click', '.del-task', function(){
  idTaskItemForDelete = $(this).parents().eq(3).attr('id');
  titleTaskItemForDelete = $("#" + idTaskItemForDelete + " " + titleTaskItem).text();
  $("#" + idTaskItemForDelete).remove(); // Remove this task item on html
  addLocalStorage(idTaskItemForDelete, titleTaskItemForDelete, "deleted"); // Refresh item deleted on localStorage
});

// For "done" a task item
$("body").on('click', '.done', function(){
  idTaskItemForDone = $(this).parents().eq(3).attr('id');
  titleTaskItemForDone = $("#" + idTaskItemForDone + " " + titleTaskItem).text();
  $("#" + idTaskItemForDone).addClass("disabled"); // Add style "done"
  $("#" + idTaskItemForDone + " .btn-success").hide(); // Hide button for "done"
  $("#" + idTaskItemForDone + " .btn-primary").show(); // Show button for "undo"
  console.log(idTaskItemForDone);
  console.log(titleTaskItemForDone);
  addLocalStorage(idTaskItemForDone, titleTaskItemForDone, "done"); // Refresh item completed on localStorage
});

// For "undo" a task item
$("body").on('click', '.undo', function(){
  idTaskItemForUndo = $(this).parents().eq(3).attr('id');
  titleTaskItemForUndo = $("#" + idTaskItemForUndo + " " + titleTaskItem).text();
  $("#" + idTaskItemForUndo).removeClass("disabled"); // Remove style "done"
  $("#" + idTaskItemForUndo + " .btn-success").show(); // Show button for "done"
  $("#" + idTaskItemForUndo + " .btn-primary").hide(); // Hide button for "undo"
  addLocalStorage(idTaskItemForUndo, titleTaskItemForUndo, "undo"); // Refresh item completed on localStorage
});