// story_script.js

// Function to display loading spinner
function showDiv() {
  document.getElementById('loading').style.display = 'block';
}

document.getElementById('get_user_story').addEventListener('click', async () => {
  const profileUsername = document.getElementById('profile_username').value;

  try {
    const response = await fetch('http://127.0.0.1:5000/get_user_story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: profileUsername }),
    });

    if (!response.ok) {
      throw new Error('User has no story or profile not found.');
    }

    // Read the Content-Type header to determine the image/video format (e.g., 'image/jpeg', 'video/mp4', etc.)
    const contentType = response.headers.get('Content-Type');

    // Convert the response to a blob object representing the story data
    const blob = await response.blob();

    // Create an object URL for the blob
    const objectURL = URL.createObjectURL(blob);

    // Display the user's story by setting the image source to the object URL
    document.getElementById('user_story').src = objectURL;
    
    // Show the user's story container and hide the loading spinner
    document.getElementById('user_story_container').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } catch (error) {
    alert(error.message);
    // Hide the loading spinner if there's an error
    document.getElementById('loading').style.display = 'none';
  }
});
