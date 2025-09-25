import React, { useEffect, useState } from 'react'
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getUserFetch } from '../redux/slice/SliceData/getUser';
import { UpdateProfile } from './UpdateProfile';
import { updateUser } from '../redux/slice/SliceData/updateUser';

export const Profile = () => {

  const { profile, loading, errors } = useSelector(state => state.getUser)

  console.log(profile);


  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  const id = profile?.id || null


  useEffect(() => {
    dispatch(getUserFetch(token))
  }, [dispatch, token])

  useEffect(() => {

    console.log("token 2 : ", token);

    dispatch(updateUser({ id, token }))

  }, [])

  const [modal, setModal] = useState(false)

  return (
    <div className='w-full h-full flex shadow-xl rounded-4xl relative overflow-hidden px-12 bg-white'>
      <div className="w-[90%] max-w-full h-full shadow-xm px-10 py-13">
        {/* Profile Image */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden">
          <img
            src={`http://localhost:3000/upload/${profile?.avatar}`}
            className="w-full h-full object-cover"
            alt="profile"
          />
          <div className="absolute bottom-0 h-16 flex justify-center items-center w-full bg-[#272320]/80">
            <span className="text-2xl text-white">
              <MdOutlinePhotoCamera />
            </span>
          </div>
        </div>

        {/* Section - 1 */}
        <div className="flex flex-col gap-6 my-5 rounded-md border border-gray-300 p-6">
          <h1 className='text-xl font-semibold'>Content Details</h1>

          <div>
            <label className='block my-2'>Username</label>
            <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
              {profile?.user || ""}
            </p>
          </div>

          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <label className='block my-2'>First name</label>
              <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
                {profile?.firstName || ""}
              </p>
            </div>
            <div className="w-1/2">
              <label className='block my-2'>Last name</label>
              <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
                {profile?.lastName || ""}
              </p>
            </div>
          </div>

          {/* Section - 2 */}
          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <label className='block my-2'>Phone Number</label>
              <div className="flex gap-2">
                <p className='w-1/3 border border-gray-300 py-3 px-2 rounded-lg'>+91</p>
                <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
                  {profile?.phone}
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <label className='block my-2'>Timezone</label>
              <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
                Dhaka (GMT +6)
              </p>
            </div>
          </div>

          <div>
            <label className='block my-2'>Email</label>
            <p className='w-full border border-gray-300 py-3 px-2 rounded-lg'>
              {profile?.email}
            </p>
          </div>

          <button
            className='w-34 py-3 bg-[#5e3aeb] text-white font-semibold rounded-full'
            onClick={() => setModal(true)}
          >
            {loading ? "loading.." : "save chanage"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-lg w-[600px] max-w-full z-10 p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Modal Dialog Box</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="mt-4">
              <UpdateProfile />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
