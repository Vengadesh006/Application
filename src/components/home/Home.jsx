import React, { useState } from 'react'
import { Nav } from '../nav/Nav'
import { Sliderbar } from '../slidebar/Sliderbar'
import { Chat } from '../chat/chat'
import { auth } from "../config/Firebase"
import { useSelector } from 'react-redux'
import { Profile } from '../profile/Profile'

export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [chat, setChat] = useState(true)

    const [page, setPage] = useState("home")

    const renderPage = () => {
          switch (page) {
             case "home":
                return <>
                    <div className="relative lg:left-2 lg:m-0  m-3">
                            <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>

                        <div className="hidden md:block mr-2">
                            <Sliderbar />
                        </div>
                    </>
            case "profile" : 

                return <Profile />

            default : 
                return <p className='text-white text-2xl' > page not fount  </p> 
    }

    }

  

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className={`w-[96%] h-[640px] lg:h-[1000px] max-w-full min-h-full shadow-xl py-1 gap-4
               grid grid-cols-1 sm:grid-cols-[73px_auto] md:grid-cols-[73px_3fr] 
               ${page === "home" ? "lg:grid-cols-[73px_3fr_270px]" : "lg:grid-cols-[73px_auto]"} 
               ml-5 mb-5 overflow-hidden rounded-2xl bg-[#212023]`}
            >
                <Nav isOpen={isOpen} setChat={setChat} setPage={setPage} />
                {renderPage()}
            </div>
        </div>

    )
}

