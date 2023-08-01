// pfp_script.js

document.getElementById('get_profile_pic').addEventListener('click', async () => {
    const profileUsername = document.getElementById('profile_username').value;
  
    try {
      const response = await fetch('/get_profile_picture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profileUsername }),
      });
  
      if (!response.ok) {
        throw new Error('Profile not found or private.');
      }
  
      const data = await response.json();
      const profilePicUrl = data.profile_picture_url;
  
      const profilePictureContainer = document.getElementById('profile_picture_container');
      const profilePicture = document.getElementById('profile_picture');
  
      profilePicture.src = profilePicUrl;
      profilePictureContainer.style.display = 'block';
    } catch (error) {
      alert(error.message);
    }
  });
  