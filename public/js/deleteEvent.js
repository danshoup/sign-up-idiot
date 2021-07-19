const deleteEventFormHandler = async (event) => {
  event.preventDefault();
    
  const event_id_data = document.querySelector('.delete-event-btn');
    const id = event_id_data.dataset.event;

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
        document.location.replace('/events');
      } else {
        alert(response.statusText);
      }
    
  }
  
  document.querySelector('.delete-event-btn').addEventListener('click', deleteEventFormHandler);