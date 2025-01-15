import React, { useRef, useState } from 'react';
import { FaImage } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";

const InputComponent = ({ reciever, setChat }) => {
  const [message, setMessage] = useState({ text: '', image: '' });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMessage((prev) => ({ ...prev, image: reader.result }));
      };
    }
  };

  const handleSend = async () => {
    const response = await fetch(`http://localhost:5000/api/messages/send/${reciever}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ text: message.text, image: message.image }),
    });
    const data = await response.json();
    if (data.success) {
      setMessage({ text: '', image: '' });
      setChat((prev) => [...prev, data.message]);
    }
  };

  return (
    <div className="grid grid-cols-[92%_4%_4%] bg-black mr-4 rounded-xl px-2 py-2">
      <input
        type="text"
        name="text"
        value={message.text}
        onChange={handleChange}
        placeholder="Enter a message."
        className="w-full outline-none"
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <FaImage
        className="size-5 mx-2 hover:cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      />
      <BsSend
        onClick={handleSend}
        className="mx-2 my-1 hover:text-blue-500 hover:cursor-pointer"
      />
    </div>
  );
};

export default InputComponent;
