// pfp_script.js

function showDiv(){
  document.getElementById('loading').style.display = 'block';
}

document.getElementById('get_profile_pic').addEventListener('click', async () => {
  const profileUsername = document.getElementById('profile_username').value;

  try {
    const response = await fetch('http://127.0.0.1:5000/get_profile_picture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: profileUsername }),
    });

    if (!response.ok) {
      throw new Error('Profile not found or private.');
    }

    // Read the Content-Type header to determine the image format (e.g., 'image/jpeg', 'image/png', etc.)
    const contentType = response.headers.get('Content-Type');
    
    // Convert the response to a blob object representing the image data
    const blob = await response.blob();
    
    // Create an object URL for the blob
    const objectURL = URL.createObjectURL(blob);

    // Open the profile picture URL in a new tab
    window.open(objectURL, '_blank');
  } catch (error) {
    alert(error.message);
  }
  
});
