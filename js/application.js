

var showTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1261',
    dataType: 'json',
    success: function (response, textStatus) {
      var taskList = response;
      taskList.tasks.forEach(function(item) {
        var task = '';
        for (var key in item) {
          if (key === 'content') {
            task += item[key];
          }
        }
        $('tbody').append('<tr class = "my-2">' +
        '<td>' + task + '</td>' +
        '<td></td>' + 
        '<td><button class = "btn btn-dark btn-sm mx-2 remove">remove</button></td>');    
      });
      console.log(taskList);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


var deleteTask = function () {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/?api_key=1261',
    success: function (response, textStatus) {
      console.log(response);
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
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  taskInput = $('#newToDo').val('');
}


$(document).ready(function() {

  showTasks();

  $('#addTask').on('submit', function(event) {
    event.preventDefault();
    addTask();
  });

  $(document).on('click', '.remove', function() {
    
  })
});