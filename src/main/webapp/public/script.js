// Listen to form submission event for creating users
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission
    
    // Get input data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    // Construct the data to send
    const userData = {
        name: name,
        email: email,
        age: parseInt(age) // Convert age to an integer
    };

    // Send POST request using Fetch
    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with your Token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'User creation success: ' + JSON.stringify(data);
        fetchUsers(); // Refresh user list after a new user is added
    })
    .catch(error => {
        document.getElementById('result').innerText = 'User creation failed: ' + error;
    });
});

// Fetch the list of users
function fetchUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the previous list
    
    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with your Token
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the user list
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Age: ${user.age}`;
            userList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
}

// Automatically fetch and display the user list when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);

// Listen to form submission event for weather information
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission
    
    // Get the city input
    const city = document.getElementById('city').value;

    // Fetch weather information
    fetch(`http://api.weatherstack.com/current?access_key=YOUR_ACCESS_KEY&query=${city}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('weatherResult').innerText = 'Error: ' + data.error.info;
        } else {
            const weatherInfo = `
                City: ${data.location.name}, ${data.location.country}\n
                Temperature: ${data.current.temperature}°C\n
                Weather Description: ${data.current.weather_descriptions.join(', ')}\n
                Wind Speed: ${data.current.wind_speed} km/h
            `;
            document.getElementById('weatherResult').innerText = weatherInfo;
        }
    })
    .catch(error => {
        document.getElementById('weatherResult').innerText = 'Failed to fetch weather: ' + error;
    });
});
