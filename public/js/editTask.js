const taskPickHandler = async (event) => {
  event.preventDefault();
  
    const task = event.target.getAttribute("data-task");
    const event_id = event.target.getAttribute("data-event");


    const response = await fetch(`/api/tasks/${task}`, {
        method: 'put',
        body: JSON.stringify({
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace(`/event/${event_id}`);
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelectorAll('.task-signup-btn').forEach(item => {
    item.addEventListener("click", taskPickHandler)});

 