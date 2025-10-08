import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberFetch } from '../redux/slice/SliceData/GetMember'
import { BsFillPinAngleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { userStatus } from '../config/Firebase';
import { IMAGE_URL } from '../../Image';

export const Chatmembers = ({ MEMBERID, index, show }) => {

    const disptach = useDispatch()

    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const res = await disptach(getMemberFetch(token)).unwrap()
            } catch (err) {
                console.log(err)
            }

        }

        fetchMember()

    }, [disptach, token])

    const { memberData, loading } = useSelector(state => state.memberStrore)

    const { userId } = useSelector(state => state.userGetStore)

    useEffect(() => {
        const currentId = userId?.id
        userStatus(currentId)
    }, [userId])

    // Object.values(memberData).map((user) => console.log(`${IMAGE_URL}/${user.avatar}`))

    if (loading) return <p className='text-center text-gray-300' > Loading.. </p>


    return (

        <div className=' overflow-y-scroll' >
            {Array.isArray(memberData) && memberData.length > 0 ? (
                <>
                    {
                        memberData.map((user, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between gap-2 my-1 p-2  cursor-pointer ${index === idx ? " bg-[#edeef8] rounded-xl" : ""}  hover:bg-[#edeef8] hover:rounded-xl`}
                                onClick={() => MEMBERID(user, idx)}
                            >
                                <div className="flex gap-5">

                                    <img
                                        src={
                                            user?.avatar?.startsWith("https")
                                                ? user.avatar
                                                : `${IMAGE_URL}/${user.avatar}`
                                        }
                                         className="w-16 h-16 object-cover rounded-md    "
                                        alt="profile"
                                    />
                                    <div className="flex flex-col gap-3">
                                        <h1 className='text-lg/5 font-medium tracking-normal font-[Inter] ' > {user.username} </h1>
                                        <p className='text-sm tracking-wide text-gray-400' >  {user?.lastMessage}  </p>
                                    </div>

                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    {/* Timestamp */}
                                    <p className="text-gray-400 text-sm">
                                        {user.timestamp
                                            ? new Date(Number(user.timestamp)).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : ""}
                                    </p>

                                    <div className="flex items-center gap-1">
                                        {user?.unreadMeg > 0 && (<>
                                            <span className="w-5 h-5 flex items-center justify-center text-sm text-white rounded-full bg-[#ff7856]">
                                                {user?.unreadMeg}
                                            </span>
                                            <BsFillPinAngleFill className="text-xl text-[#7879ea]" />
                                        </>)}

                                    </div>
                                </div>

                            </div>
                        ))

                    }


                </>
            ) : <h2 className='text-center text-sm text-gray-600 ' > No Chat Memers  </h2>}


        </div>



    )
}

// {user.timestamp
//     ? new Date(Number(user.timestamp)).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//     })
//     : ""}
//  {
//       {user?.lastMessage}                                           user.unreadMeg > 0 ? (<span className='size-5 flex items-center text-sm text-white justify-center rounded-full py-2 bg-[#ff7856]' > {user.unreadMeg} </span>) : null
//                                             }
//                                             <BsFillPinAngleFill className='text-xl text-[#7879ea] ' />



