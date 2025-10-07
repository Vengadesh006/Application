import React, { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineKeyboardVoice, MdOutlineFileUpload } from "react-icons/md";
import { LiaTelegramPlane } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Message } from "./Message";

export const Sentmessage = ({ text, message, setText, CHATMESSAGE, chatMember }) => {

    const { userId } = useSelector((state) => state.userGetStore);

    const senderId = userId?.id;

    const view = useRef(null)


    useEffect(() => {
        view.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])

    return (
        <div className="hidden lg:flex w-full max-h-[97vh] flex-col flex-1 py-2 px-5 relative">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">
                        {!chatMember ? "Design Chat" : chatMember}
                    </h1>
                    <p className="text-gray-500 text-lg flex items-center gap-2">
                        {chatMember ? "online" : "offline"}
                        <span
                            className={`w-3 h-3 rounded-full ${chatMember ? "bg-green-500" : "bg-red-500"
                                }`}
                        ></span>
                    </p>
                </div>
                <div className="flex items-center gap-6 cursor-pointer">
                    <CiSearch className="text-2xl text-gray-400" />
                    <HiOutlinePhone className="text-xl text-gray-400" />
                    <HiOutlineDotsVertical className="text-lg text-gray-400" />
                </div>
            </div>


            {/* Messages */}
            <div className="flex flex-col gap-2 mt-4 w-full h-full px-2 max-h-full overflow-y-auto">
                {
                    Array.isArray(message) && message.length === 0 ?
                        <div className="flex items-center justify-center min-h-100" >
                            <p className="text-2xl font-semibold" > WelCome Pro Chat.   </p>
                        </div>

                        : (
                            Object.values(message)
                                .sort((a, b) => a.timestamp - b.timestamp)
                                .map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.senderId === senderId ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs p-2 rounded-lg text-sm ${msg.senderId === senderId
                                                ? "bg-[#7678ee] text-white"
                                                : "bg-[#eeeffa] text-black"
                                                }`}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div>{msg.text}</div>
                                                <div className="text-[10px] flex justify-end">
                                                    {msg.timestamp
                                                        ? new Date(Number(msg.timestamp)).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )
                }

                     <div ref={view} />
               
            </div>

            <div className=" flex items-center justify-between py-4 px-4 gap-3 rounded-2xl bg-[#eeeffa] 
            ">
                <div className="flex gap-2 items-center">

                    <label htmlFor="file" className="cursor-pointer"> <MdOutlineFileUpload className="text-2xl text-[#75757a]" /> </label>
                    <input type="file" id="file" hidden />
                    <input type="text" value={text} placeholder="Type a message" className=" px-1 py-2 text-sm rounded-lg outline-none placeholder:text-[#bcbccc] placeholder:font-medium" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && CHATMESSAGE()} />

                </div>

                <div className="flex gap-4 items-center">
                     <MdOutlineKeyboardVoice className="text-2xl cursor-pointer text-[#75757a]" />
                <LiaTelegramPlane className="text-2xl cursor-pointer text-[#75757a]" onClick={CHATMESSAGE} />

                </div>
               
            </div>
        </div >

    )
}
// {message &&   md:absolute lg:fixed lg:bottom-1 lg:left-5/9 lg:-translate-x-1/2 bottom-1
//                     Object.values(message)
//                         .sort((a, b) => a.timestamp - b.timestamp) // ✅ correct place
//                         .map((msg, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`flex ${msg.senderId === senderId ? "justify-end" : "justify-start"}`}
//                             >
//                                 <div
//                                     className={`max-w-xs p-2 rounded-lg text-sm ${msg.senderId === senderId
//                                         ? "bg-[#7678ee] text-white"
//                                         : "bg-[#eeeffa] text-black"
//                                         }`}
//                                 >
//                                     <div className="flex flex-col gap-1">
//                                         <div>{msg.text}</div>
//                                         <div className="text-[10px] flex justify-end">
//                                             {msg.timestamp
//                                                 ? new Date(Number(msg.timestamp)).toLocaleTimeString([], {
//                                                     hour: "2-digit",
//                                                     minute: "2-digit",
//                                                 })
//                                                 : ""}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                 }
