/**
 * 
 */
// Listen for form submission event
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the page from reloading when the form is submitted

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    // Construct the data to be sent
    const userData = {
        name: name,
        email: email,
        age: parseInt(age) // Convert age to integer
    };

    // Send a POST request using Fetch API
    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'User creation success: ' + JSON.stringify(data);
    })
    .catch(error => {
        document.getElementById('result').innerText = 'User creation failed: ' + error;
    });
});
