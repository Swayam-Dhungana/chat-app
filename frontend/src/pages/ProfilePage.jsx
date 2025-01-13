import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [height, setHeight] = useState('100vh');
  // const [profilePic, setProfileImage] = useState('default.webp'); // Default image
  const [creds, setCreds] = useState({profilePic:"",username: "", email:"", createdAt:"", active:"online"})
  const getUserData=async()=>{
    const response=await fetch('http://localhost:5000/api/auth/check',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    const data=await response.json()
    if(!data) return data.msg
    return data.user;
  }

  useEffect(() => {
    const navbarHeight = 60;
    setHeight(`calc(100vh - ${navbarHeight}px)`);
    getUserData().then((data)=>{
      setCreds({profilePic:data.profilePic, username:data.username, email: data.email, createdAt: data.createdAt, active:"online"})
    })
  }, []);

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size and type
  if (!file.type.startsWith("image/")) {
    return alert("Only image files are allowed!");
  }
  if (file.size > 5 * 1024 * 1024) {
    return alert("File size exceeds 5MB limit!");
  }

  // Convert image to Base64
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = async () => {
    const base64Image = reader.result;
    setCreds({profilePic: base64Image});

    // Send to server
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ profilePic: base64Image }),
      });

      const data = await response.json();
      if (!data.success) {
        return alert(data.msg);
      }
      alert("Profile picture updated successfully!");
      setProfileImage(data.msg.profilePic); // Set the updated Cloudinary URL
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };
  reader.readAsDataURL(file);
};

  return (
    <div className="w-screen flex justify-center items-center" style={{ height }}>
      <div className="w-2/3 bg-black rounded-xl p-8 text-white">
        <div className="flex flex-col items-center">
          {/* Profile Picture Upload */}
          <div className="relative mb-6">
            <img
              src={creds.profilePic?creds.profilePic:'default.webp'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-600 cursor-pointer"
              onClick={() => document.getElementById('profileImageInput').click()}
            />
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Profile Information */}
          <div className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={creds.username}
                readOnly
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={creds.email}
                readOnly
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Member Since</label>
              <input
                type="text"
                value={creds.createdAt}
                readOnly
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Account Status</label>
              <input
                type="text"
                value={creds.active}
                readOnly
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
