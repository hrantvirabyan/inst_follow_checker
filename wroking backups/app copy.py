# app.py

from flask import Flask, request, jsonify
import instaloader
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_profile_picture(username):
    loader = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(loader.context, username)
    return profile.profile_pic_url

@app.route('/get_profile_picture', methods=['POST'])
def fetch_profile_picture():
    data = request.get_json()
    username = data['username']
    
    try:
        profile_picture_url = get_profile_picture(username)

        # Fetch the profile picture using the requests library (pip install requests)
        import requests
        response = requests.get(profile_picture_url)

        # Set the appropriate content-type in the response headers
        headers = {'Content-Type': response.headers['Content-Type']}

        # Return the profile picture content with appropriate headers
        return response.content, 200, headers
    except:
        return jsonify({'error': 'Profile not found or private.'}), 404

if __name__ == '__main__':
    app.run()
