import React, { useEffect, useState } from 'react'
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { userGetId } from '../redux/slice/SliceData/userGetId';
import { UpdateProfile } from './UpdateProfile';

export const Profile = () => {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const { userId, loading } = useSelector((state) => state.userGetStore);

  const token = localStorage.getItem('token');

  useEffect(() => {

    const serverFetch = async () => {
      try {
        const res = await dispatch(userGetId(token)).unwrap()
        console.log(res)
      }
      catch (err) {
        console.log(err)
      }
    }

    serverFetch()

  }, [dispatch])



  return (
    <div className="w-full h-full flex shadow-xl rounded-4xl relative overflow-hidden px-12 bg-white">
      <div className="w-[90%] max-w-full h-full shadow-xl px-10 py-12">
        {/* Profile Image */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden">
          <img
            src={
              userId?.avatar
                ? `http://localhost:3000/upload/${userId.avatar}`
                : "/default-avatar.png"
            }
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
          <h1 className="text-xl font-semibold">Contact Details</h1>

          <div>
            <label className="block my-2">Username</label>
            <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
              {userId?.username || ""}
            </p>
          </div>

          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <label className="block my-2">First name</label>
              <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
                {userId?.firstName || ""}
              </p>
            </div>
            <div className="w-1/2">
              <label className="block my-2">Last name</label>
              <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
                {userId?.lastName || ""}
              </p>
            </div>
          </div>

          {/* Section - 2 */}
          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <label className="block my-2">Phone Number</label>
              <div className="flex gap-2">
                <p className="w-1/3 border border-gray-300 py-3 px-2 rounded-lg">
                  +91
                </p>
                <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
                  {userId?.phone || ""}
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <label className="block my-2">Timezone</label>
              <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
                Dhaka (GMT +6)
              </p>
            </div>
          </div>

          <div>
            <label className="block my-2">Email</label>
            <p className="w-full border border-gray-300 py-3 px-2 rounded-lg">
              {userId?.email || ""}
            </p>
          </div>

          <button
            className="w-34 py-3 bg-[#5e3aeb] text-white font-semibold rounded-full"
            onClick={() => setModal(true)}
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-20 p-4 flex items-center justify-center bg-black/50">
          {/* Modal Box */}
          <div className="relative bg-white p-3 rounded-2xl shadow-xl w-full max-w-lg mx-2 overflow-y-auto max-h-[100vh]">

            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h2 className="text-lg text-center font-semibold">Update Profile</h2>
              <button
                onClick={() => setModal(false)}
                className="text-gray-500 hover:text-gray-800 transition"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <UpdateProfile modal={modal} setModal={setModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

