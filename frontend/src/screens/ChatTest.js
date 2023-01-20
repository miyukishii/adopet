import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import AppContext from '../context/AppContext'
import api from "../services/services";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AiOutlineLeft, AiOutlineSend } from 'react-icons/ai';

const socket = io.connect("http://localhost:3001");

function ChatTest() {
  const { id } = useParams();
  const { userData } = useContext(AppContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [otherContact, setOtherContact] = useState('');
  const [otherContactData, setOtherContactData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      api.get(`/chat/${id}`, {
        headers: {'Authorization': userData.token}
      })
      .then((response) => {
        if (response.status === 200) {
          (userData._id === response.data.userId)
          ? setOtherContact(response.data.giverId)
          : setOtherContact(response.data.userId)
      }
    }).catch((error) => {
        console.log(error.message);
      });
    };
    fetchAPI();
  }, [id, userData]);

  useEffect(() => {
    api.get(`/${otherContact}`, {
      headers: {'Authorization': userData.token}
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setOtherContactData(response.data)
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }, [otherContact])

  useEffect(() => {
    socket.emit("joinChat", id);
    
    const getPrevChat = async () => {
      api.get(`/chat/${id}`, {
        headers: {'Authorization': userData.token}
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMessageList(response.data.messages);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    }

    getPrevChat();
}, [id, userData.token])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: userData.fullName,
        message: currentMessage,
      };

      await socket.emit("sendMessage", messageData);
     
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
    const putMessage = {
      "author": userData.fullName,
      "message": currentMessage,
    }

      
      api.put(`/chat/message/${id}`,
      { "messages": putMessage },
      {"headers": {'Authorization': userData.token} })
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket.on]);

  return (
    <div
      className="bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6] h-screen font-TwCentMT"
    >
      <header className='h-10 flex justify-between items-center py-6'>
        <Link to="/home" className='bg-[#FBFBFB] z-50 rounded-full w-fit flex items-center justify-center p-2 opacity-50 self-center ml-6'>
          <AiOutlineLeft className='text-lg'/>
        </Link>
        <p className="text-xl">{otherContactData.fullName}</p>
        <div className="h-[34px] w-[34px]" />
      </header>

        <div className="flex flex-col w-screen px-8 h-[85%] overflow-auto">
            {messageList.map((messageContent, index) => {
              return (
                <div className={(userData.fullName === messageContent.author) ? `flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end` : `flex w-full mt-2 space-x-3 max-w-xs` } key={index}>
                  <div>
                    <p id="author">{messageContent.author}</p>
                      <div className={(userData.fullName === messageContent.author) ? `bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg`  : `bg-gray-300 p-3 rounded-r-lg rounded-bl-lg` }>
                        <p className="text-sm">{messageContent.message}</p>
                      </div>
                    </div>
                </div>
            );
            })}
        </div>
        
        <div className="my-4 flex w-screen px-3">
          <input
            className="h-10 w-full rounded text-sm mr-4 p-4"
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>
            <AiOutlineSend className='text-red-900' />
          </button>
        </div>
        
  </div>
  );
}

export default ChatTest;


                  // <div
                    //   className="message"
                    //   id={userData.fullName === messageContent.author ? "other" : "you "}
                    //   key={index}
                    // >
                    //   <div>
                    //     <div className="message-content">
                    //       <p>{messageContent.message}</p>
                    //     </div>
                    //     <div className="message-meta">
                    //       <p id="time">{messageContent.time}</p>
                    //       <p id="author">{messageContent.author}</p>
                    //     </div>
                    //   </div>
                    // </div>