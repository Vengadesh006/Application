import React, { useState, useEffect } from 'react'
import { Nav } from '../nav/Nav'
import { Sliderbar } from '../slidebar/Sliderbar'
import { Profile } from '../profile/Profile'
import { Chat } from '../chat/Chat'
import { ChatPage } from '../switch/ChatPage'
import { userGetId } from '../redux/slice/SliceData/userGetId'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export const Home = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [chat, setChat] = useState(true)

    const [page, setPage] = useState("home")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const renderPage = () => {
        switch (page) {

            case "home":
                return <ChatPage setIsOpen={setIsOpen} isOpen={isOpen} />

            case "profile":
                return <Profile />

            default:
                return <p className='text-white text-2xl' > page not fount  </p>
        }

    }

    const token = localStorage.getItem('token');

    useEffect(() => {

        const serverFetch = async () => {
            try {
                const res = await dispatch(userGetId(token)).unwrap();
              
            } catch (err) {
                console.log(err);
                toast.error("Please go to the Login page.");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            }
        };

        serverFetch()

    }, [dispatch, token])


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className="w-[96%] h-auto min-h-[500px] max-h-[100vh] overflow-hidden md:h-[700px] lg:h-[7800px] rounded-2xl 
               grid grid-cols-1 md:grid-cols-[96px_auto] bg-[#212023] px-2 py-2"
            >
                <Nav isOpen={isOpen} setChat={setChat} setIsOpen={setIsOpen} setPage={setPage} />

                {renderPage()}

            </div>
        </div>


    )
}

