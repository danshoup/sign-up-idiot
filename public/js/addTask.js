async function taskFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('textarea[name="task-body"]').value.trim();
    const volunteer = document.querySelector('input[name="volunteer"]').value;
    const event_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (task_name) {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify({
            event_id,
            name,
            volunteer
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.task-form').addEventListener('submit', taskFormHandler);