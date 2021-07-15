async function newTaskFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('textarea[name="task-body"]').value.trim();
    const volunteer = document.querySelector('input[name="volunteer"]').value;
    const event_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (name && volunteer && event_id) {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify({
            name,
            volunteer,
            event_id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace('/task-details');
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.task-form').addEventListener('submit', newTaskFormHandler);