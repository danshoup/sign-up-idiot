const deleteEventFormHandler = async (event) => {
  event.preventDefault();
    
  const event_id_data = document.querySelector('.deleteEvent');
    const id = event_id_data.dataset.event;
    console.log(`This is the event id to delete ${id}`);

    const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          event_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/userProfile');
      } else {
        alert(response.statusText);
      }
    
  }
  
  const deleteTaskFormHandler = async (event) => {
    event.preventDefault();
      
    const task_id_data = document.querySelector('.deleteVolunteerTask');
      const id = task_id_data.dataset.task;
      console.log(`This is the task id to delete ${id}`);
  
      const response = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({
            event_id: id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          document.location.replace('/userProfile');
        } else {
          alert(response.statusText);
        }
      
    }

  document.querySelectorAll('.deleteEvent').forEach(item => {
    item.addEventListener("click", deleteEventFormHandler)});

  document.querySelectorAll('.deleteVolunteerTask').forEach(item => {
    item.addEventListener("click", deleteTaskFormHandler)});