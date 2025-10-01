import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberFetch } from '../redux/slice/SliceData/GetMember'

export const Chatmembers = ({MEMBERID}) => {

    const disptach = useDispatch()

    const token = localStorage.getItem("token")

    useEffect(() => {
        try {
            const res = disptach(getMemberFetch(token)).unwrap()

        } catch (err) {
            console.log(err)
        }
    }, [disptach, token])

    const { memberData, loading, errors } = useSelector(state => state.memberStrore)

    const members = memberData?.data || []


    return (

        <>

        {members.length > 0 ? (
            <>
            {
                members.map((user, idx) => (
                    <div
                        key={idx}
                        className="flex gap-2 mx-4 my-1 p-2 cursor-pointer hover:bg-[#edeef8] hover:rounded-xl"
                        onClick={() => MEMBERID(user)}
                    >
                        <img
                            src={`http://localhost:3000/upload/${user.avatar}`}
                            alt={user.username}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h1 className="text-base font-medium mb-1">
                                {user.username}
                            </h1>
                            <p className="text-gray-500 text-sm truncate w-40">
                                hay. there new user
                            </p>
                        </div>
                    </div>

                ))

            }

            
            </>
        ) : <h2 className='text-center text-sm text-gray-600 ' > No Chat Memers  </h2> }
            

        </>



    )
}
