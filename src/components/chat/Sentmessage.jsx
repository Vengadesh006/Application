import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineKeyboardVoice, MdOutlineFileUpload } from "react-icons/md";
import { LiaTelegramPlane } from "react-icons/lia";
import { useSelector } from "react-redux";

export const Sentmessage = ({ text, message, setText, CHATMESSAGE, chatMember }) => {

    const { userId } = useSelector((state) => state.userGetStore);

    const senderId = userId?.id;

    Object.values(message).map((data) => console.log(data))

    return (
        <div className="hidden md:flex flex-col px-5 flex-1 relative py-3">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[28px] font-semibold">Design Chat</h1>
                    <p className="text-gray-500 text-lg">
                       {chatMember} 
                    </p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                    <CiSearch className="text-[27px] text-gray-400" />
                    <HiOutlinePhone className="text-[25px] text-gray-400" />
                    <HiOutlineDotsVertical className="text-[20px] text-gray-400" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2 mt-4 w-full  h-[735px] max-h-full overflow-y-auto">
                {message &&
                    Object.values(message).map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.senderId === senderId ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-xs p-2 rounded-lg text-sm ${msg.senderId === senderId
                                        ? "bg-[#7678ee] text-white"
                                        : "bg-[#eeeffa] text-black"
                                    }`}
                            >
                                <div className="flex flex-col gap-1">
                                        <div className=""> {msg.text}  </div>
                                        <div className="text-[10px] flex items-center justify-end"> {msg.timestamp ? new Date(Number(msg.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""} </div>

                                </div>
                                  
                            </div>
                        </div>
                    )).sort(((a, b) => a.timestamp - b.timestamp))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 rounded-3xl bg-[#eeeffa] fixed right-90 left-140 bottom-2 z-20  px-5 py-4">
                <label htmlFor="file" className="cursor-pointer">
                    <MdOutlineFileUpload className="text-2xl text-[#636fbd]" />
                </label>
                <input type="file" id="file" hidden />

                <input
                    type="text"
                    value={text}
                    placeholder="Type a message"
                    className="flex-1 px-1 py-2 text-sm rounded-lg outline-none placeholder:text-[#636fbd] placeholder:font-medium"
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && CHATMESSAGE()}
                />
                <MdOutlineKeyboardVoice className="text-2xl cursor-pointer text-[#636fbd]" />
                <LiaTelegramPlane
                    className="text-2xl cursor-pointer text-[#636fbd]"
                    onClick={CHATMESSAGE}
                />
            </div>
        </div>
    );
};
