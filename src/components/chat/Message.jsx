import React from 'react'
import user1 from "../../assets/user.jpeg";
import user2 from "../../assets/me1.jfif"
import user3 from "../../assets/w1.jfif"
import user4 from "../../assets/w2.jfif"
import d from "../../assets/d.jfif"
import v from "../../assets/v.jfif"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import fire from "../../assets/fire.png"

export const Message = () => {

    return (
        <div>
            <div className="flex flex-col gap-2 mt-4 w-full bg-transparent h-[735px] bg-red-200 overflow-y-auto">
                <div className="flex justify-start mb-2">
                    <div className="flex items-end">
                        <img src={user1} className="w-15 h-14 rounded-xl object-cover" alt="user" />
                    </div>

                    <div className="bg-[#eeeffa] py-2 px-4 rounded-xl max-w-[340px] ">
                        <h5 className='mb-1 text-[#5e5a93]' > Deve </h5>
                        <p className="text-base/5 ">I added new flows to our design system.
                            new you can use then the project
                        </p>
                        <div className="flex justify-between text-[#c4c5c8]  text-sm my-2">
                            <div className="flex items-center gap-1">
                                <p className='p-1 bg-[#dbdcfe] rounded-full' > 👍</p> <span>3 </span>
                            </div>

                            <p>9:30</p>
                        </div>
                    </div>
                </div>
                {/* secound text */}
                <div className="flex justify-start ml-15 ">
                    <div className="bg-[#eeeffa] flex flex-col  rounded-xl max-w-[340px] py-2 px-4 ">
                        <h5 className='text-[#5b5594] text-sm' > Alex Hunt </h5>
                        <p className="text-sm my-1">  Hey guys! import News !</p>
                         <div className="flex justify-end text-sm text-[#c4c5c8] gap-2">
                                    <div className='flex items-center gap-1'> <MdOutlineRemoveRedEye /> <span>16</span> </div>
                                    <span >09:27</span>
                                </div>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="flex items-end">
                        <img src={user3} className="w-15 h-14 rounded-md object-cover" alt="user" />
                    </div>

                    <div className="flex flex-col  bg-[#eeeffa]  rounded-xl max-w-md py-2 px-4 ">
                        <h5 className='text-sm' > Alex Hunt </h5>
                        <p className="text-base/6 text-sm"> our intern @jchurch has successfullly completed his
                            probationary period and is now part our taem . </p>
                            <div className="flex justify-between items-center my-1">
                                <div className="flex items-center gap-1">
                                <img src={fire} className='w-6 h-6 objct-cover p-1 bg-[#dbdcfe] rounded-full' alt="" /> <span>5</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#c4c5c8]">
                                    <div className='flex items-center gap-1'> <MdOutlineRemoveRedEye /> <span>16</span> </div>
                                    <span>09:27</span>
                                </div>
                            </div>
                    </div>
                </div>
                {/* left side */}

                <div className="flex gap-2 justify-end my-2">
                    <div className="bg-[#7676ed] text-white px-4 py-4 rounded-xl max-w-sm">
                        <p className='text-sm' >jadan congratualtion ! i will be glad to work with you an the project 😉</p>

                    </div>
                    <div className="flex items-end">
                        <img src={user1} className="w-15 h-14 rounded-md object-cover" alt="user" />
                    </div>

                </div>

                {/* image */}
                <div className="flex mx-4 justify-start ">
                    <div className="flex items-end">
                        <img src={user2} className="w-15 h-14 rounded-md object-cover" alt="user" />
                    </div>
                    <div className="">
                        <img src={d} className='w-80 h-40 object-cover rounded-xl' alt="" />
                        <div className="bg-gray-100 text-white px-4 py-4 rounded-xl max-w-xs">
                            <h6 className='text-[#5b5594] font-semibold text-sm' > Jessie Rollins </h6>
                            <img src={v} className='w-83 h-16 object-cover' alt="" />
                             <div className="flex justify-end gap-3 text-[#c4c5c8] mt-3 text-sm">
                                    <div className='flex items-center gap-1'> <MdOutlineRemoveRedEye /> <span>16</span> </div>
                                    <span>09:27</span>
                                </div>
                        </div>
                    
                    </div>

                </div>

            </div >

        </div>
    )
}
