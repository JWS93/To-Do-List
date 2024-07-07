

var showTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1261',
    dataType: 'json',
    success: function (response, textStatus) {
      $('tbody').empty();
      response.tasks.forEach(function(task) {
        var toDo = '';
        for (var key in task) {
          if (key === 'content') {
            toDo += task[key];
          }
        }
        $('tbody').append('<tr class = "my-2">' +
        '<td>' + toDo + '</td>' +
        '<td></td>' + 
        '<td><button class = "btn btn-dark btn-sm mx-2 remove" data-id = "' + task.id + '">remove</button></td>');    
      });
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteTask = function (id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1261',
    success: function (response, textStatus) {
      showTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

var addTask = function () {
  var taskInput = $('#newToDo').val();
  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1261',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: taskInput
      }
    }),
    success: function (response, textStatus) {
      showTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  taskInput = $('#newToDo').val('');
}


$(document).ready(function() {


  $('#addTask').on('submit', function(event) {
    event.preventDefault();
    addTask();
  });

  $(document).on('click', '.remove', function() {
    deleteTask($(this).data('id'));
  })

  showTasks();
});