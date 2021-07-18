const newFormHandler = async (event) => {
  event.preventDefault();

    // Connects with newEvent.handlebars
    const name = document.querySelector('#inputEventName"]').value.trim(); 
    const event_start_date = document.querySelector('#eventStart').value.trim();
    const event_end_date = document.querySelector('#eventEnd').value.trim();
    const event_address_line1 = document.querySelector('#inputAddress').value.trim();
    const event_address_line2 = document.querySelector('#inputAddress2').value.trim();
    const event_address_city = document.querySelector('#inputCity').value.trim();
    const event_address_state = document.querySelector('#inputState').value.trim();
    const event_address_zip = document.querySelector('#inputZip]').value.trim();
  
  if (name && event_start_date && event_end_date && event_address_line1 && event_address_line2 && event_address_city && event_address_state && event_address_zip){
    const response = await fetch(`/api/event`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        event_start_date,
        event_end_date,
        event_address_line1,
        event_address_line2,
        event_address_city,
        event_address_state,
        event_address_zip
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
  
  document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);