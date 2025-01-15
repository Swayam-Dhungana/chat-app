import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/createContext';
import ContactList from '../components/ContactList';
import ChatComponent from '../components/ChatComponent';
import InputComponent from '../components/InputComponent';

const HomePage = () => {
  const [height, setHeight] = useState(`100vh`);
  const [creds, setCreds] = useState({ username: "", profilePic: "" });
  const [users, setUsers] = useState([]);
  const [reciever, setReciever] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data
  const { getUserData, getUsers, setSender } = useContext(UserContext);

  useEffect(() => {
    const navbarHeight = 60;
    setHeight(`calc(100vh - ${navbarHeight}px)`);
    
    // Fetch user and contact data
    Promise.all([getUserData(), getUsers()]).then(([userData, userList]) => {
      setCreds({ username: userData.user.username, profilePic: userData.user.profilePic });
      setUsers(userList);
      setLoading(false); // Stop loading when data is fetched
    });
  }, []);

  const renderMessage = (id) => {
    const user = users.find((u) => u._id === id);
    if (user) {
      setSender(user);
      setReciever(user._id);
      setCreds({ username: user.username, profilePic: user.profilePic });
    }
  };

  return (
    <div className="bg-gray-900 w-screen flex justify-center items-center" style={{ height }}>
      <div className="w-[90%] rounded-xl h-[90%] bg-gray-800 grid grid-cols-[30%_70%]">
        {loading ? (
          // Skeleton Loader
          <>
            {/* Contact List Skeleton */}
            <div className="p-4 space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-12 bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>
            
            {/* Chat Section Skeleton */}
            <div className="flex flex-col justify-between p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-1/3 h-8 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex-1 bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </>
        ) : (
          <>
            {/* Contact List */}
            <ContactList users={users} renderMessage={renderMessage} />
            {/* Chat Section */}
            <div>
              <ChatComponent creds={creds} chat={chat} />
              <InputComponent reciever={reciever} setChat={setChat} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
