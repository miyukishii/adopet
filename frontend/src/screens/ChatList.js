import { useContext, useEffect, useState } from "react";
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom';

import api from "../services/services";
import Loading from '../components/Loading/PageLoading';
import avatar from '../assets/avatar.jpg';
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function ChatList() {
  const { userData } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      api.get(`/chat/userId/${userData._id}`, {
        headers: {'Authorization': userData.token}
      })
      .then((response) => {
        if (response.status === 200) {
          setChatList(response.data);
          setLoading(false);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    };
    fetchAPI();
  }, [userData]);

  useEffect(() => {
    chatList.forEach(({userId, giverId}) => {
      if (userId === userData._id) {
        api.get(`/${giverId}`, {
          headers: {'Authorization': userData.token}
        })
        .then((response) => {
          if (response.status === 200) {
            setContacts(prevState => [...prevState, response.data.fullName]);
            setLoading(false);
          }
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        api.get(`/${userId}`, {
          headers: {'Authorization': userData.token}
        })
        .then((response) => {
          if (response.status === 200) {
            setContacts(prevState => [...prevState,response.data.fullName]);
            setLoading(false);
          }
        }).catch((error) => {
          console.log(error.message);
        });
      }
    })
  }, [chatList, userData._id])

if (loading) {
  return <Loading />
}
return (
  <div className=" bg-[#BAF6F6] h-screen font-TwCentMT">
    <Header screen={'chats'} />
    {
      (chatList.length && contacts.length && loading === false)
      ? (
        <div className="px-4">
          {chatList.map((chat, index) => (
            <div
              className="py-1.5 flex border-y-[1px] border-[#C8C8C8]"
              key={index}
            >
              <img
                src={avatar}
                alt="avatar"
                className="w-[82px] h-[75px] rounded"
              />
              <div className="px-2 flex flex-col justify-around">
                <p>{contacts[index]}</p>
                <Link to={`/chatbox/${chat._id}`} className="text-white
                      bg-[#00a3ffcc]
                      focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
                      font-thin
                      focus:ring-primary-300 rounded-[15px] text-sm 
                      px-5 py-2.5 text-center">
                  keep chating
                </Link>
              </div>
            </div>
          ))}
        </div>
      )
      : (
        <p className="text-center py-4">You don't have any message</p>
      )
    }
    {(userData.length !== 0) ? <Navbar /> : null }
  </div>
);
}
