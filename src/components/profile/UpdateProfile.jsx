import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserId } from '../redux/slice/SliceData/updateUser';
import { userGetId } from '../redux/slice/SliceData/userGetId';
import { toast } from 'react-toastify';
import { getMemberFetch } from '../redux/slice/SliceData/GetMember';

export const UpdateProfile = ({ modal, setModal }) => {

  const { userId } = useSelector(state => state.userGetStore)

  const [loading, setLoading] = useState(false)

  const id = userId?.id

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  const [image, setImage] = useState(null)

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

    const { name, value, files, type } = e.target;

    if (type === "file") {

      const file = files[0]

      setImage(URL.createObjectURL(file))

      setServerData((prev) => ({
        ...prev,
        [name]: files?.[0]
      }));
    } else {

      setServerData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };

  console.log(userId?.avatar)

  const handlerServe = async (e) => {

    setLoading(true)

    e.preventDefault();

    console.log(serverData)

    const formData = new FormData();

    formData.append("username", serverData?.username);

    formData.append("email", serverData?.email);

    formData.append("firstName", serverData?.firstName);

    formData.append("lastName", serverData?.lastName);

    if (serverData?.avatar !== null) {
      formData.append("avatar", serverData?.avatar);
    }

    formData.append("phone", serverData?.phone)

    try {

      const res = await dispatch(updateUserId({ id, formData, token })).unwrap()

      dispatch(userGetId(token));

      dispatch(getMemberFetch(token))

      setLoading(false)
      setModal(false)

      toast.success(res)

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full p-1">
      <form className="flex flex-col gap-2" onSubmit={handlerServe}>
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
        <div className="flex flex-col gap-2 border border-gray-300 p-3 rounded-xl ">
          <div className="w-20 h-20">
            {userId?.avatar?.startsWith("https") ? (
              <img
                className="w-full h-full object-cover rounded-xl"
                src={userId.avatar}
                alt="user image"
              />
            ) : !image ? (
              <img
                className="w-full h-full object-cover rounded-xl"
                src={`http://localhost:3000/upload/${userId?.avatar}`}
                alt="user image"
              />
            ) : (
              <img
                className="w-full h-full object-cover rounded-xl"
                src={image}
                alt="user image"
              />
            )}

          </div>
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

        <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl flex items-center justify-center gap-2">
          {loading ? (<>
            <div class="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p> Loading.. </p>

          </>) : (<h1> update profile </h1>)}

        </button>
      </form>
    </div>
  );
}
