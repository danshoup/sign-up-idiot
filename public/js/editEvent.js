async function editFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="event-title"]').value;
    const event_date = document.querySelector('input[name="event_date"]').value;
    const event_address = document.querySelector('input[name="event_address"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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
        document.location.replace('/userProfile');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-event-form').addEventListener('submit', editFormHandler);