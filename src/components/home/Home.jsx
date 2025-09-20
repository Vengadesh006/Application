import React, { useState } from 'react'
import { Nav } from '../nav/Nav'
import { Sliderbar } from '../slidebar/Sliderbar'
import { Chat } from '../chat/chat'
import {auth} from "../config/Firebase"

export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const [chat, setChat] = useState(true)


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className="w-[96%] h-[640px] lg:h-[1000px] max-w-full min-h-full shadow-xl py-1 gap-4
               grid grid-cols-1 sm:grid-cols-[73px_auto] md:grid-cols-[73px_3fr] lg:grid-cols-[73px_3fr_270px]
               ml-5 mb-5 overflow-hidden rounded-2xl bg-[#212023]"
            >
                <Nav isOpen={isOpen} setChat={setChat} />

                {
                    chat ? (<>
                        <div className="relative lg:left-2 lg:m-0  m-3">
                            <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>

                        <div className="hidden md:block mr-2">
                            <Sliderbar />
                        </div>
                    </>) : (
                        <div className="flex justify-center min-h-screen items-center ">
                              <h1 className='text-white text-center' > Page Not Found ! </h1>
                        </div>
                      
                     )
                }



            </div>
        </div>

    )
}

// w-full h-full shadow-xl max-w-[98rem] rounded-4xl bg-[#212023] px-2 py-2
//                   grid grid-cols-1 sm:grid-cols-[100px_auto] lg:grid-cols-[100px_3fr_auto]
//                  overflow-hidden
