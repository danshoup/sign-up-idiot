const newEventFormHandler = async (event) => {
  event.preventDefault();
  
    // Method should reflect in newEvent.handlebars
    const name = document.querySelector('input[name="event-name"]').value; 
    const event_date = document.querySelector('input[name="event-date"]').value;
    const event_address = document.querySelector('input[name="event-address"]').value;
  
  if (name && event_date && event_address){
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        event_date,
        event_address,
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
};
  
  document.querySelector('.new-event-form').addEventListener('submit', newEventFormHandler);