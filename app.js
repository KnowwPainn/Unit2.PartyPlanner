document.addEventListener('DOMContentLoaded', () => {
    const partyListContainer = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm');
  
    // Function to fetch parties from the API
    const fetchParties = async () => {
      try {
        const response = await fetch('/events'); // Update with your API endpoint for fetching parties
        const parties = await response.json();
  
        // Render the party list
        renderPartyList(parties);
      } catch (error) {
        console.error('Error fetching parties:', error.message);
      }
    };
  
    // Function to render the party list
    const renderPartyList = (parties) => {
      partyListContainer.innerHTML = ''; // Clear previous content
  
      parties.forEach((party) => {
        const partyElement = document.createElement('div');
        partyElement.innerHTML = `
          <p>Name: ${party.name}</p>
          <p>Date: ${party.date}</p>
          <p>Time: ${party.time}</p>
          <p>Location: ${party.location}</p>
          <p>Description: ${party.description}</p>
          <button onclick="deleteParty(${party.id})">Delete</button>
        `;
        partyListContainer.appendChild(partyElement);
      });
    };
  
    // Function to handle party deletion
    window.deleteParty = async (partyId) => {
      try {
        await fetch(`/events/${partyId}`, { method: 'DELETE' }); // Update with your API endpoint for deleting a party
        fetchParties(); // Refresh the party list
      } catch (error) {
        console.error('Error deleting party:', error.message);
      }
    };
  
    // Event listener for form submission
    partyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Gather form data
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const location = document.getElementById('location').value;
      const description = document.getElementById('description').value;
  
      try {
        // Send a POST request to add a new party
        await fetch('/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, date, time, location, description }),
        });
        fetchParties(); // Refresh the party list
      } catch (error) {
        console.error('Error adding party:', error.message);
      }
    });
  
    // Initial fetch of parties
    fetchParties();
  });