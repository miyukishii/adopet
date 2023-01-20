import { useNavigate } from "react-router-dom";

import { MdOutlinePets } from 'react-icons/md';
import { AiOutlineWechat } from 'react-icons/ai';

function Navbar() {
  const urlHome = window.location.pathname === "/home";
  const urlChatList = window.location.pathname === "/chatlist";
  const navigate = useNavigate();

  return (
    <nav
      className='fixed bottom-0 w-screen flex justify-between bg-[#48586F]'>
      <div className={(urlHome) ? `w-1/2 h-full p-1.5 flex justify-center shadow-inner-2xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]` : `w-1/2 h-full p-1.5 flex justify-center`}>
        <div
          onClick={() => navigate("/home")}
          className="text-white flex flex-col justify-center items-center">
          <MdOutlinePets className='text-xl' />
          <p className="text-xs">Home</p>
        </div>
      </div>
      <div
        onClick={() => navigate("/chatlist")}
        className={(urlChatList) ? `w-1/2 h-full p-1.5 flex justify-center shadow-inner-2xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]` : `w-1/2 h-full p-1.5 flex justify-center`}>
          <div className="text-white flex flex-col justify-center items-center">
            <AiOutlineWechat className='text-xl' />
            <p className="text-xs">Chats</p>
          </div>
      </div>
    </nav>
  );
}
    
export default Navbar;