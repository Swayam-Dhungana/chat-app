import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [height, setHeight] = useState("100vh");
  const [creds, setCreds] = useState(null); // Initially null to indicate loading
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await response.json();
      if (!data || !data.user) throw new Error(data.msg || "Failed to fetch user data");
      return data.user;
    } catch (error) {
      console.error(error.message);
      alert("Error fetching user data");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const navbarHeight = 60;
    setHeight(`calc(100vh - ${navbarHeight}px)`);
    getUserData().then((data) => {
      if (data) {
        setCreds({
          profilePic: data.profilePic || "",
          username: data.username || "Unknown User",
          email: data.email || "Not Available",
          createdAt: data.createdAt || new Date().toISOString(),
          active: "online",
        });
      }
      setLoading(false); // Stop loading
    });
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return alert("Only image files are allowed!");
    }
    if (file.size > 5 * 1024 * 1024) {
      return alert("File size exceeds 5MB limit!");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        const response = await fetch("http://localhost:5000/api/auth/update-profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ profilePic: base64Image }),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.msg || "Failed to update profile picture");

        setCreds((prevCreds) => ({ ...prevCreds, profilePic: data.msg.profilePic }));
        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error.message);
        alert("Failed to update profile picture. Please try again.");
      }
    };
  };

  return (
    <div className="w-screen flex justify-center items-center" style={{ height }}>
      <div className="w-2/3 bg-black rounded-xl p-8 text-white">
        {loading ? (
          // Skeleton Loader
          <div className="animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mb-6"></div>
              <div className="w-full max-w-md">
                <div className="mb-4 h-8 bg-gray-700 rounded"></div>
                <div className="mb-4 h-8 bg-gray-700 rounded"></div>
                <div className="mb-4 h-8 bg-gray-700 rounded"></div>
                <div className="mb-4 h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          // Actual Profile Page
          <div className="flex flex-col items-center">
            {/* Profile Picture Upload */}
            <div className="relative mb-6">
              <img
                src={creds.profilePic || "default.webp"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-600 cursor-pointer"
                onClick={() => document.getElementById("profileImageInput").click()}
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
                <label className="block text-gray-400 mb-1">Joined On</label>
                <input
                  type="text"
                  value={formatDate(creds.createdAt)}
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
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
