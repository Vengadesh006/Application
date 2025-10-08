import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_USER } from "../redux/slice/SliceData/filterUser";
import { Sentmessage } from "./Sentmessage";
import { memberFetch } from "../redux/slice/SliceData/memberSlice";
import { Chatmembers } from "./Chatmembers";
import { GETMESSAGE, MessageUpdate, SENTMESSAGE } from "../config/Firebase";
import { toast } from "react-toastify";
import { getMemberFetch } from "../redux/slice/SliceData/GetMember";
import { IMAGE_URL } from "../../Image";

export const Chat = ({ isOpen, setIsOpen }) => {

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const [text, setText] = useState("");

  const [message, setMessage] = useState([]);

  const [receiverId, setReceiverId] = useState(null);

  const [searchInput, setSearchInput] = useState({ username: "" });

  const deferredQuery = useDeferredValue(searchInput.username);

  const [currentUser, setCurentUser] = useState("")

  const { filterItems, loading, errors } = useSelector(
    (state) => state.userFilterStore
  );
  const { userId } = useSelector((state) => state.userGetStore);

  const [index, setIndex] = useState([])

  const [show, setShow] = useState([])

  // set sender id 
  const senderId = userId?.id

  const MEMBERID = async (user, i) => {
    setReceiverId(user?.userId)

    setCurentUser(user?.username)

    setIndex(i)

    setShow(i)

    let conventionId = [senderId, user?.userId].sort().join("-")

    if (conventionId) {
      try {

        MessageUpdate(conventionId, senderId)

        const res = await dispatch(getMemberFetch(token)).unwrap()

      }
      catch (err) {
        console.log(err);

      }

    }

  };
  const conventionId = [senderId, receiverId].sort().join("-")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  useEffect(() => {
    const filterQuery = async () => {

      if (!deferredQuery.trim()) return;

      try {
        const res = await dispatch(

          FILTER_USER({ text: deferredQuery, token })
        ).unwrap();


      } catch (err) {

        console.error("Filter error:", err);
      }
    };

    filterQuery();

  }, [deferredQuery, dispatch, token]);

  const filteredUsers = useMemo(() => {
    if (!deferredQuery) return [];
    return filterItems.filter((item) =>
      item.username.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [filterItems, deferredQuery]);


  const CHATMESSAGE = () => {

    if (!senderId || !receiverId) {
      console.warn("No sender/receiver selected");
      toast.warning("No sender/receiver selected")
      return;
    }

    const payload = {
      senderId,
      receiverId,
      text,
      read: false,
      timestamp: Date.now(),
    };

    SENTMESSAGE(conventionId, payload);
    console.log("Message sent:", payload);
    setText(""); // clear input after sending
  };

  // Listen to messages
  useEffect(() => {
    if (!userId?.id || !receiverId) return;

    GETMESSAGE(conventionId, (data) => setMessage(data || []));

  }, [userId?.id, receiverId]);


  const ADD_MEMBER = async (member) => {

    setCurentUser(member?.username)

    setReceiverId(member?.id)
  };


  return (
    <div className="w-full  min-h-screen shadow-xl grid grid-cols-1 lg:grid-cols-[1fr_2fr] bg-white rounded-3xl relative py-3 ">
      <div className="flex flex-col  w-full 2 border-r border-gray-200  px-2 ">
        <div className="flex justify-between items-center bg-transparent rounded-md">
          <div className="flex flex-1 items-center gap-2  py-1 mr-4 px-2 bg-[#dbdcfe] rounded-xl">
            <CiSearch className="text-2xl" />
            <input
              type="text"
              name="username"
              value={searchInput.username}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Search"
              className="bg-transparent outline-none w-full py-2 text-sm placeholder:font-normal placeholder:text-black"
            />
          </div>

          <div
            className="flex items-center md:hidden mr-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiOutlineDotsVertical />
          </div>
        </div>

        {/* User List */}
        <div className="flex flex-col mt-2 w-full h-auto min-h-[90vh]  rounded-2xl  ">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {errors && <p className="text-center text-red-500">{errors}</p>}

          {!loading && filteredUsers.length > 0 ? (
            filteredUsers.map((user, idx) => (
              <div
                key={idx}
                className="flex gap-2 mx-4 my-1 p-2 cursor-pointer hover:bg-[#edeef8] hover:rounded-xl"
                onClick={() => ADD_MEMBER(user)}
              >
                <img
                  src={
                    user?.avatar?.startsWith("https")
                      ? user.avatar
                      : `${IMAGE_URL}/${user.avatar}`
                  }
                  className="w-full h-full object-cover"
                  alt="profile"
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
          ) : (
            <Chatmembers MEMBERID={MEMBERID} index={index} show={show} />
          )}
        </div>
      </div>

      <Sentmessage
        text={text}
        message={message}
        setText={setText}
        CHATMESSAGE={CHATMESSAGE}
        chatMember={currentUser}

      />

    </div>
  );
};