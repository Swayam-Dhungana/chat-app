import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/createContext";

const ChatComponent = ({ creds, chat }) => {
  const [messages, setMessages] = useState([]);
  const [clickedMessage, setClickedMessage] = useState(null); // State to track clicked message
  const [loading, setLoading] = useState(false); // State to show skeleton loader
  const { sender } = useContext(UserContext);

  useEffect(() => {
    if (sender && sender._id) {
      setLoading(true); // Show loading before fetching messages
      getMessage().finally(() => setLoading(false)); // Hide loading after messages are fetched
    }
  }, [sender]);

  const getMessage = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${sender._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    }
  };

  const formatTimeWithDay = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const isSameDay =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isSameDay) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return (
        date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
        `, ` +
        date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  };

  return (
    <div>
      {sender ? (
        <>
          {/* Header */}
          <div className="mt-2 flex items-center gap-2 underline hover:cursor-pointer">
            {creds.profilePic && (
              <img
                src={creds.profilePic}
                className="size-10 rounded-full"
                alt="User Profile"
              />
            )}
            <p>{creds.username ? creds.username : "Hello User!"}</p>
          </div>

          {/* Messages */}
          <div className="h-[450px] overflow-y-auto bg-gray-800 p-4 rounded">
            {loading ? (
              // Skeleton Loader
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <div className="w-3/4 h-8 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : messages && messages.length > 0 ? (
              messages.map((data, index) => (
                <div
                  key={index}
                  className={`${
                    data.senderId === sender._id ? "text-left" : "text-right"
                  } mb-2`}
                >
                  <div>
                    <div
                      className={`${
                        data.image ? "" : "hidden"
                      } w-full flex ${
                        data.senderId === sender._id ? "justify-start" : "justify-end"
                      }`}
                    >
                      <img
                        src={data.image}
                        className="size-64 rounded"
                        alt="Message Attachment"
                      />
                    </div>
                    <p
                      className="px-2 py-1 bg-black shadow rounded inline-block hover:cursor-pointer"
                      onClick={() => setClickedMessage(index)} // Track click
                    >
                      {data.text}
                    </p>
                    {clickedMessage === index && ( // Show time and day based on the condition
                      <p className="text-gray-400 text-xs mt-1">
                        {formatTimeWithDay(data.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No messages available</p>
            )}
          </div>
        </>
      ) : (
        // If no sender is selected, show the welcome message and hide input area
        <div className="flex justify-center items-center h-full text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Welcome to Talken</h2>
            <p className="mt-4">Select a contact to start chatting.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
