import React, { useState } from 'react'
import { MdOutlineLogout, MdOutlineFileUpload, MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdChatboxes, IoMdSearch, IoMdClose } from "react-icons/io";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { HiPhone, HiOutlineDotsVertical } from "react-icons/hi";
import { LiaTelegramPlane } from "react-icons/lia";
import { GrGallery } from "react-icons/gr";
import logo from "../../assets/new.png"
import { MdLogin } from "react-icons/md";
import { Profile } from '../profile/Profile';
import { Home } from "../home/Home"
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

export const Nav = ({ isOpen, setChat, setPage }) => {

  const logout = () => {
    console.log("remove");
    localStorage.removeItem('token')
  }


  return (
    <div
      className={`fixed top-0 left-0 h-full w-24 text-[#8a8788] z-30 
        flex flex-col items-center justify-between py-3
        transform transition-transform duration-300 ease-in-out bg-[#212023]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:relative sm:translate-x-0 `}
    >
      {/* Logo */}
      <div>
        <img
          src={logo}
          className="w-20 h-20 object-container"
          alt="logo"
        />
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-3 overflow-y-scroll">
        <li className=" flex flex-col items-center gap-1 justify-center cursor-pointer hover:text-[#f1f1f1]  relative hover:bg-[#464646]  transite-300 hover:rounded-lg size-20"
          onClick={() => setPage("home")}
        >
          <IoMdChatboxes className="text-[28px]" />
          <span className="absolute top-2 right-4 size-6 flex items-center justify-center text-xs bg-orange-500 text-[#8a8788] text-white rounded-full">
            23
          </span>
          <p className="text-xs mt-1">Chats</p>
        </li>
        <li className="flex flex-col items-center justify-center cursor-pointer hover:text-[#f1f1f1] relative hover:bg-[#464646] hover:rounded-lg size-20"
          onClick={() => setChat(false)}
        >
          <FaFolder className="text-[23px]" />
          <span className="absolute top-1 right-4 size-6 text-white flex items-center justify-center  text-xs bg-orange-500 text-[#8a8788] text-whit rounded-full">
            4
          </span>
          <p className="text-xs mt-1">Work</p>
        </li>
        <li
          onClick={() => setChat(false)}
          className="flex flex-col items-center gap-1 justify-center cursor-pointer  hover:text-[#f1f1f1] hover:bg-[#464646] hover:rounded-lg size-20">
          <FaFolderOpen className="text-[23px]" />
          <p className="text-xs mt-1">Friends</p>
        </li>
        <li
          onClick={() => setChat(false)}
          className="flex flex-col items-center gap-1  justify-center cursor-pointer  hover:text-[#f1f1f1] hover:bg-[#464646] hover:rounded-lg size-20">
          <FaFolderOpen className="text-[23px]" />
          <p className="text-xs mt-1">News</p>
        </li>
        <li
          onClick={() => setChat(false)}
          className="flex flex-col items-center gap-1  justify-center cursor-pointer  hover:text-[#f1f1f1] hover:bg-[#464646] hover:rounded-lg size-20">
          <FaFolderOpen className="text-[23px]" />
          <p className="text-xs mt-1">Archive</p>
        </li>
        <li className='flex items-center justify-center' >
          <div className="w-8 border-t border-gray-500 my-4"></div>
        </li>
        <li
          onClick={() => setPage("profile")}
          className="flex flex-col items-center gap-1  justify-center cursor-pointer  hover:text-[#f1f1f1] hover:bg-[#464646] hover:rounded-lg size-20">
          <IoPersonCircleOutline className="text-[23px]" />
          <p className="text-xs mt-1">Profile</p>
        </li>
        <li
          onClick={() => setChat(false)}
          className="flex flex-col items-center  gap-1 justify-center cursor-pointer  hover:text-[#f1f1f1] hover:bg-[#464646] hover:rounded-lg size-20">
          <RiEditBoxLine className="text-[23px]" />
          <p className="text-xs mt-1">Edit</p>
        </li>
      </ul>

      {/* Logout */}
      <div className="flex flex-col gap-1 items-center cursor-pointer">
        <Link to="/login" >
          <MdOutlineLogout className="text-[23px]" />
          <p className="text-xs tracking-wide"> login </p>
        </Link>
      </div>
    </div>
  )
}
