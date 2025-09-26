import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserId } from '../redux/slice/SliceData/updateUser';

export const UpdateProfile = () => {

  const { userId, loading } = useSelector(state => state.userGetStore )

  const id = userId?.id
  
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  const [serverData, setServerData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    avatar: null,
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    if (userId) {
      setServerData({
        username: userId.username || "",
        password: userId?.password,
        email: userId.email || "",
        phone: userId.phone || "",
        avatar: null,
        firstName: userId.firstName || "",
        lastName: userId.lastName || ""
      });
    }
  }, [userId]);

  const onChangeEvent = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setServerData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setServerData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handlerServe = (e) => {
    
    e.preventDefault();

    const formData = new FormData();

    formData.append('username', serverData?.username)

    formData.append('password', serverData?.password)

    formData.append('email', serverData?.email)

    formData.append('firstName', serverData?.firstName)

    formData.append("lastName", serverData?.lastName)

    if(serverData?.avatar && serverData?.avatar !== null && serverData?.avatar !== "" ){
      formData.append("avatar", serverData?.avatar)
    }

     const res = dispatch(updateUserId({id, formData, token }))

     console.log(res);
     
    
  }

 

  return (
    <div className="w-full p-4">
      <form className="flex flex-col gap-2" onSubmit={handlerServe}>
        <h1 className="text-center text-xl">Profile</h1>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label>Username :</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="username"
            value={serverData?.username}
            onChange={onChangeEvent}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label>Password :</label>
          <input
            type="password"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="password"
            value={serverData?.password}
            onChange={onChangeEvent}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label>Email :</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="email"
            value={serverData.email}
            onChange={onChangeEvent}
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label>First Name :</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="firstName"
            value={serverData.firstName}
            onChange={onChangeEvent}
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label>Last Name :</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="lastName"
            value={serverData.lastName}
            onChange={onChangeEvent}
          />
        </div>

        {/* Avatar */}
        <div className="flex flex-col gap-2">
          <label>Avatar :</label>
          <input
            type="file"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="avatar"
            onChange={onChangeEvent}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label>Phone :</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 outline-none rounded-lg"
            name="phone"
            value={serverData.phone}
            onChange={onChangeEvent}
          />
        </div>

        <button className="w-full py-3 bg-indigo-300 rounded-xl">
          {loading ? "loading" : "update data"}
        </button>
      </form>
    </div>
  );
}
