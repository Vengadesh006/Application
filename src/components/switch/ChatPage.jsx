import React from 'react'
import { Chat } from '../chat/Chat'
import { Sliderbar } from '../slidebar/Sliderbar'

export const ChatPage = ({ isOpen, setIsOpen }) => {
    return (
        <div className="grid h-[630px] grid-cols-auto md:grid-cols-[2fr] lg:grid-cols-[4fr_1fr] py-1 gap-2">
            <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
            <Sliderbar />
        </div>


    )
}
