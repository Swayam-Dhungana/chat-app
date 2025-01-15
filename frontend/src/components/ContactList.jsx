import React from 'react';
import { IoIosContacts } from "react-icons/io";

const ContactList = ({ users, renderMessage }) => {
  return (
    <div className="border-r border-gray-400 m-3">
      <div className="flex items-center">
        <IoIosContacts className="size-10 mx-1" />
        <p>Contacts</p>
      </div>
      <div>
        {users.map((data) => (
          <div
            key={data._id}
            className="flex items-center hover:cursor-pointer gap-3 mx-2 my-2 px-2 py-4 bg-gray-600 rounded-xl"
            onClick={() => renderMessage(data._id)}
          >
            <img
              src={data.profilePic ? data.profilePic : "default.webp"}
              alt=""
              className="rounded-full size-8"
            />
            <p>{data.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
