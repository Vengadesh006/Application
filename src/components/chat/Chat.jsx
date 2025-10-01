import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_USER } from "../redux/slice/SliceData/filterUser";
import { Sentmessage } from "./Sentmessage";
import { memberFetch } from "../redux/slice/SliceData/memberSlice";
import { Chatmembers } from "./Chatmembers";
import { GETMESSAGE, SENTMESSAGE } from "../config/Firebase";

export const Chat = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const [text, setText] = useState("");

  const [message, setMessage] = useState([]);

  const [receiverId, setReceiverId] = useState(null);

  const [chatMember, setChatMember] = useState("")

  const [searchInput, setSearchInput] = useState({ username: "" });

  const deferredQuery = useDeferredValue(searchInput.username);

  const { filterItems, loading, errors } = useSelector(
    (state) => state.userFilterStore
  );
  const { userId } = useSelector((state) => state.userGetStore);

  // set sender id 
  const senderId = userId?.id

  // Set receiver
  const MEMBERID = (user) => {
    setReceiverId(user?.receiverId);
    setChatMember(user?.username)
    console.log("Receiver Selected:", user?.receiverId);
  };

  const conventionId = [senderId, receiverId].sort().join("-")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  // Filter users
  useEffect(() => {
    const filterQuery = async () => {
      if (!deferredQuery.trim()) return;
      try {
        const res = await dispatch(
          FILTER_USER({ text: deferredQuery, token })
        ).unwrap();
        console.log("Filtered Users:", res);
      } catch (err) {
        console.error("Filter error:", err);
      }
    };
    filterQuery();
  }, [deferredQuery, dispatch, token]);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    if (!deferredQuery) return [];
    return filterItems.filter((item) =>
      item.username.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [filterItems, deferredQuery]);


  // Send chat message
  const CHATMESSAGE = () => {

    if (!senderId || !receiverId) {
      console.warn("No sender/receiver selected");
      return;
    }

    const payload = {
      senderId,
      receiverId,
      text,
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

    console.log("Listening on:", conventionId);

  }, [userId?.id, receiverId]);


  const ADD_MEMBER = async (member) => {

    const payload = {
      receiverId: member?.id,
      lastMessage: "hay",
    };


    try {
      const res = await dispatch(memberFetch({ payload, token })).unwrap();
      console.log("Member Added:", res);
    } catch (err) {
      console.error("Add member error:", err);
    }
  };

  return (
    <div className="w-full h-full flex shadow-xl bg-white rounded-4xl relative overflow-hidden">
      {/* Sidebar */}
      <div className="flex flex-col w-full lg:w-2/6 bg-transparent py-4">
        <div className="flex justify-between items-center bg-transparent rounded-md">
          <div className="flex flex-1 items-center gap-2 ml-5 py-1 mr-4 px-2 bg-[#dbdcfe] rounded-xl">
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
        <div className="flex flex-col overflow-y-auto mt-3">
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
          ) : (
            <Chatmembers MEMBERID={MEMBERID} />
          )}
        </div>
      </div>

      {/* Chat Area */}
      <Sentmessage
        text={text}
        message={message}
        setText={setText}
        CHATMESSAGE={CHATMESSAGE}
        chatMember={chatMember}
      />
    </div>
  );
};
