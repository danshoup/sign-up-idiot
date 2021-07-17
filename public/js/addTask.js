const newTaskFormHandler = async (event) => {
  event.preventDefault();
  
    const name = document.querySelector('#task-body').value.trim();
    const event_id = JSON.parse(note.parentElement.getAttribute('data-event-id')).id;
    // const event_id = window.location.toString().split('/')[
    //   window.location.toString().split('/').length - 1
    // ];
  
    if (name && event_id) {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify({
            name,
            event_id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace('/event-details');
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.task-form').addEventListener('submit', newTaskFormHandler);