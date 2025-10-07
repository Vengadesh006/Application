import React from 'react'
import { IoMdClose } from "react-icons/io";
import img1 from '../../assets/m1.jpg'
import img2 from '../../assets/m2.jpg'
import img3 from '../../assets/m3.jpg'
import img4 from '../../assets/m4.jpg'
import img5 from '../../assets/m5.jpg'
import img6 from '../../assets/m6.jpg'
import { IoIosArrowDown } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import { CiFileOn } from "react-icons/ci";
import { MdOutlineAudiotrack } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import room1 from "../../assets/room1.jpg"
import room2 from "../../assets/room2.jpg"
import { FiImage, FiFileText, FiMusic, FiLink, FiMic } from "react-icons/fi";


export const Sliderbar = () => {
  const user = [
    { name: "Tanisha Combs", Img: img1, type: "admin" },
    { name: "Alex Hunt", Img: img2 },
    { name: "Jasmin Lowery", Img: img3 },
    { name: "Jasmin Lowery", Img: img3 },
    { name: "Jasmin Lowery", Img: img3 },
    { name: "Jasmin Lowery", Img: img3 },
    { name: "Jasmin Lowery", Img: img3 },
  ]

  const group = [
    { icon: <FiVideo />, name: "13 Videos" },
    { icon: <FiFileText />, name: "378 Files" },
    { icon: <FiMusic />, name: "10 Audios files " },
    { icon: <FiLink />, name: "25 shared links" },
    { icon: <FiMic />, name: "2589 Voice message" }
  ]


  return (
    <div className="flex flex-col overflow-y-auto ">

      {/* Shared Files Section */}
      <div
        class="bg-white mb-2 rounded-3xl py-4 px-5 
    "
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[19px] font-medium"> Group Info </h1>

          <button className=" hover:text-red-500 ">
            <IoMdClose />
          </button>
        </div>
        <h1 className="my-4 font-semibold">Files</h1>

        <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 rounded-lg px-1 py-1">
          <div className="flex items-cente gap-3">
            <span className="text-[20px] text-[#0e0e0e] "> <GrGallery /> </span>
            <span className="text-sm font-medium"> 265 Photo </span>
          </div>
          <IoIosArrowDown className="text-[#0e0e0e] " />

        </div>
        <div className="flex my-4 gap-3">
          <img src={room1} className='w-36 h-27 object-cover rounded-2xl ' alt="" />
          <img src={room2} className='w-36 h-27 object-cover rounded-2xl ' alt="" />
        </div>

        <ul className="space-y-4">
          {group.map((item, i) => (
            <li key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 rounded-lg px-1 py-1">
              <div className="flex gap-2 items-center">
                <span className="text-[22px] text-[#0e0e0e]  ">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <IoIosArrowDown className="text-[#0e0e0e] " />
            </li>
          ))}

        </ul>

      </div>

      {/* Members Section */}
      <div 
      className="px-5 py-3 rounded-4xl bg-[#dbdcfe] "
      
      >

        <div className="flex  justify-between mb-3 items-center">
          <h1 className="text-sm font-bold">23 Members</h1>
          <button className="text-gray-500  ">
            <IoMdClose />
          </button>
        </div>
        <ul className="flex flex-col max-h-full  h-[390px]  gap-4  overflow-y-scroll">
          {user.map((item, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img
                src={item.Img}
                className="w-14 h-14 rounded-xl object-cover"
                alt={item.name}
              />
              <div className="flex gap-3 items-center">
                <span className="text-[12px] font-semibold text-[#0e0e0e]">{item.name}</span>
                {item.type && (
                  <span className=" font-normal text-gray-400 lowercase">{item.type}</span>
                )}

              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
