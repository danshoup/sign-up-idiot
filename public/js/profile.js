const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#event-name').value.trim();
    const event_date = document.querySelector('#event-date').value.trim();
    const event_address = document.querySelector('#event-address').value.trim();
    const event_owner = document.querySelector('#event-owner').value.trim();
  
    if (name && event_date && event_address && event_owner) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ name, event_date, event_address, event_owner }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create event');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete event');
      }
    }
  };
  
  document
    .querySelector('.new-event-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.event-list')
    .addEventListener('click', delButtonHandler);
    const newFormHandler = async (event) => {
      event.preventDefault();
    
      const name = document.querySelector('#event-name').value.trim();
      const event_date = document.querySelector('#event-date').value.trim();
      const event_address = document.querySelector('#event-address').value.trim();
      const event_owner = document.querySelector('#event-owner').value.trim();
    
      if (name && event_date && event_address && event_owner) {
        const response = await fetch(`/api/events`, {
          method: 'POST',
          body: JSON.stringify({ name, event_date, event_address, event_owner }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create event');
        }
      }
    };
    
    const delButtonHandler = async (event) => {
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to delete event');
        }
      }
    };
    
    document
      .querySelector('.new-event-form')
      .addEventListener('submit', newFormHandler);
    
    document
      .querySelector('.event-list')
      .addEventListener('click', delButtonHandler);
    