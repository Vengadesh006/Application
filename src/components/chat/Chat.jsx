
import React, { useState } from "react";
import search from "../../assets/search.png";
import { IoMdSearch } from "react-icons/io";
import { CiPhone, CiServer } from "react-icons/ci";
import { HiOutlineDotsVertical, HiPhone } from "react-icons/hi";
import { MdOutlineKeyboardVoice, MdOutlineFileUpload } from "react-icons/md";
import { LiaTelegramPlane } from "react-icons/lia";
import user1 from "../../assets/user.jpeg";
import user2 from "../../assets/w1.jfif"
import user3 from "../../assets/w2.jfif"
import user4 from "../../assets/w4.jfif"
import user5 from "../../assets/me1.jfif"
import user6 from "../../assets/me2.jfif"
import user7 from "../../assets/me3.jfif"
import user8 from "../../assets/w5.jfif"
import user9 from "../../assets/me4.jfif"
import user10 from "../../assets/me5.jfif"
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { Message } from "./Message";
import { useSelector } from "react-redux";





export const Chat = ({isOpen, setIsOpen}) => {

  const [user, setUser] = useState([
    { username: "Deve", chat: "Hi there, how can I assist you?", img: user1 },
    { username: "Alex", chat: "Let’s work on the new UI today!", img: user2 },
    { username: "Sarah", chat: "Meeting at 4 PM, don’t forget!", img: user3 },
    { username: "Osman Campos", chat: "Meeting at 4 PM, don’t forget!", img: user4 },
    { username: "Jayden Chursh", chat: "Meeting at 4 PM, don’t forget!", img: user5 },
    { username: "JaCob Mcleod", chat: "Meeting at 4 PM, don’t forget!", img: user6 },
    { username: "Jamin Lowery", chat: "Meeting at 4 PM, don’t forget!", img: user7 },
    { username: "Vanessa Cox", chat: "Meeting at 4 PM, don’t forget!", img: user8 },
    { username: "Anotoy Cordanes", chat: "Meeting at 4 PM, don’t forget!", img: user8 },
  ]);

  const inputHandler = async (e) => {};

  return (
    <div className="w-full h-full flex shadow-xl bg-white rounded-4xl relative overflow-hidden">
      {/* Sidebar (Users) */}
      <div className="flex flex-col w-full lg:w-2/6 ms:1/2 bg-transparent py-4 ">
        <div className="flex justify-between overflow-hidden bg-transparent rounded-md">
          <div className="flex flex-1 items-center gap-2 ml-5 py-1 mr-4 px-2 bg-[#dbdcfe] rounded-xl">
            <div className="text-2xl">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full py-2 lg:py-1 text-[0.9rem] text-gray-300 placeholder:font-normal placeholder:text-black"
              onChange={inputHandler}
            />
           
          </div>
           <div className="flex items-center md:hidden mr-3" onClick={() => setIsOpen(!isOpen) }> 
                <HiDotsVertical />
            </div>
        </div>

        {/* Users */}
        <div className="flex flex-col overflow-y-auto">
          {user.map((info, i) => (
            <div
              key={i}
              className="flex gap-2 mx-4 my-1 p-2 cursor-pointer hover:bg-[#edeef8] hover:rounded-xl"
            >
              <img
                src={info.img}
                className="w-18 h-16 object-cover rounded-md"
                alt="user"
              />
              <div>
                <h1 className="text-base font-medium mb-1">{info.username}</h1>
                <p className="text-gray-500 text-sm truncate w-40">{info.chat}..</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area (Hidden on Mobile, Visible from md breakpoint) */}
      <div className="hidden md:flex flex-col px-5 flex-1 relative py-3">
        {/* Header */}
        <div className="flex justify-between items-center rounded-sm">
          <div>
            <h1 className="text-[28px] font-[600]">Design Chat  </h1>
            <p className="text-gray-500 text-lg">23 members, 10 online</p>
          </div>
          <div className="flex items-center gap-4 cursor-pointer ">
            <CiSearch className="text-[27px] text-gray-400 " />
            <HiOutlinePhone className="text-[25px] text-gray-400" />
            <HiOutlineDotsVertical className="text-[20px] text-gray-400" />
          </div>
        </div>

        {/* Messages */}
        <Message />

        {/* Input */}
        <div className="flex items-center gap-3 rounded-3xl bg-[#eeeffa] absolute bottom-2 right-5 left-5 px-5 py-4">
          <label htmlFor="file" className="cursor-pointer">
            <MdOutlineFileUpload className="text-2xl text-[#636fbd] " />
          </label>
          <input type="file" id="file" hidden />

          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-1 py-2 text-lg rounded-lg outline-none text-sm placeholder:text-[#636fbd] placeholder:font-medium placeholder:tracking-tight"
          />
          <MdOutlineKeyboardVoice className="text-2xl cursor-pointer text-[#636fbd] " />
          <LiaTelegramPlane className="text-2xl cursor-pointer text-[#636fbd] " />
        </div>
      </div>
    </div>
  );
};
