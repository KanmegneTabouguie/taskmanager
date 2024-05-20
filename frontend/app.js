$(document).ready(function() {
    // Fetch and display tasks
    function fetchTasks() {
      $.ajax({
        url: 'http://localhost:3003/tasks',
        method: 'GET',
        success: function(data) {
          $('#task-list').empty();
          data.forEach(task => {
            $('#task-list').append(`
              <li class="list-group-item" data-id="${task.task_id}">
                <strong>${task.title}</strong>: ${task.description}
                <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
                <button class="btn btn-info btn-sm float-right mr-2 edit-btn">Edit</button>
              </li>
            `);
          });
        },
        error: function(err) {
          console.error('Error fetching tasks:', err);
        }
      });
    }
  
    // Add a new task
    $('#task-form').on('submit', function(event) {
      event.preventDefault();
      const title = $('#title').val();
      const description = $('#description').val();
  
      $.ajax({
        url: 'http://localhost:3003/tasks',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ title, description }),
        success: function() {
          $('#title').val('');
          $('#description').val('');
          fetchTasks();
        },
        error: function(err) {
          console.error('Error creating task:', err);
        }
      });
    });
  
    // Delete a task
    $('#task-list').on('click', '.delete-btn', function() {
      const taskId = $(this).closest('li').data('id');
  
      $.ajax({
        url: `http://localhost:3003/tasks/${taskId}`,
        method: 'DELETE',
        success: function() {
          fetchTasks();
        },
        error: function(err) {
          console.error('Error deleting task:', err);
        }
      });
    });
  
    // Edit a task
    $('#task-list').on('click', '.edit-btn', function() {
      const taskId = $(this).closest('li').data('id');
      const title = prompt('Enter new title:');
      const description = prompt('Enter new description:');
  
      if (title && description) {
        $.ajax({
          url: `http://localhost:3003/tasks/${taskId}`,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ title, description }),
          success: function() {
            fetchTasks();
          },
          error: function(err) {
            console.error('Error updating task:', err);
          }
        });
      }
    });
  
    // Initial fetch of tasks
    fetchTasks();
  });
  