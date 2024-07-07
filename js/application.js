

var showTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1261',
    dataType: 'json',
    success: function (response, textStatus) {
      $('tbody').empty();
      response.tasks.forEach(function(task) {
        $('tbody').append('<tr class = "my-2 task-list">' +
        '<td><input class="form-check-input" type="checkbox" value = "" data-id="' + task.id + '" ' + (task.completed ? 'checked' : '') + '></td>' + 
        '<td>' + task.content + '</td>' +
        '<td><button class = "btn btn-dark btn-sm mx-2 remove" data-id = "' + task.id + '">remove</button></td>');    
      });
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var taskComplete = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1261',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response, textStatus) {
      showTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var taskActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1261',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response, textStatus) {
      showTasks();
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

var allTasks = function () {
  $(".task-list").each(function (i, ele) {
    $(this).show();
  });
}

var activeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked")) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

var completeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked") !== true) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

$(document).ready(function() {

  $('#addTask').on('submit', function(event) {
    event.preventDefault();
    addTask();
  });

  $(document).on('click', '.remove', function() {
    deleteTask($(this).data('id'));
  })

  $(document).on("change", ".form-check-input", function () {
    if (this.checked) {
      taskComplete($(this).data("id"));
    } else {
      taskActive($(this).data("id"));
    }
  });

  $('.toggle-all').on('click', function () {
    allTasks();
  })

  $('.toggle-active').on('click', function () {
    activeTasks();
  })

  $('.toggle-complete').on('click', function () {
    completeTasks();
  })

  showTasks();
});