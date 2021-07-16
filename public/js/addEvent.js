$('#datepicker').datepicker('getDate');

async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="event-name"]').value;
    const event_date = document.querySelector('input[name="event-date"]').value;
    const event_address = document.querySelector('input[name="event-address"]').value;
    const event_owner = document.querySelector('input[name="event-owner"]').value;
  
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        event_date,
        event_address,
        event_owner
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
  
  document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);