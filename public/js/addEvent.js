$('#datepicker').datepicker('getDate');

const newEventFormHandler = async (event) => {
  event.preventDefault();
  
    // Method should reflect in newEvent.handlebars
    const name = document.querySelector('#inputEventName').value; 
    const event_start_date = document.querySelector('#eventStart').value;
    const event_end_date = document.querySelector('#eventEnd').value;
    const event_address_line1 = document.querySelector('#inputAddress').value;
    const event_address_line2 = document.querySelector('#inputAddress2').value;
    const event_address_city = document.querySelector('#inputCity').value;
    const event_address_state = document.querySelector('#inputState').value;
    const event_address_zip = document.querySelector('#inputZip').value;
  
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