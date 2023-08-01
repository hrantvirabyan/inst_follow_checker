import instaloader

def download_own_stories(username):
    L = instaloader.Instaloader()
    
    try:
        # Retrieve your own profile
        profile = instaloader.Profile.from_username(L.context, username)
        
        # Download your own stories
        L.download_stories(userids=[profile.userid], filename_target='{}/story_{}', fast_update=True)
        print("Your stories have been downloaded successfully.")
        
    except instaloader.exceptions.InvalidArgumentException:
        print("Please provide a valid username.")
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"Profile with username '{username}' does not exist.")

if __name__ == "__main__":
    username = "your_username"  # Replace with your Instagram username
    download_own_stories(username)
