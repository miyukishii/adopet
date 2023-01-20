import "./style.css"
import { Link, useNavigate } from "react-router-dom";

import avatar from '../../assets/avatar.jpg';
import logo from '../../assets/logo-white.png';

import { AiFillWechat, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';

function Menu({userData}) {
  const logout = () => {
    localStorage.removeItem("uid");
    window.location.reload(false);
  }

  const firstName = userData.fullName.slice(0, userData.fullName.lastIndexOf(" "));

  const navigate = useNavigate();

  return (
    <div className="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label className="menu__btn mt-1 ml-[-2px]" for="menu__toggle">
      <span></span>
    </label>

      <ul className="menu__box flex flex-col items-center text-white fixed top-0">
        <li className="p-4">
          <div className="flex">
            <img
              src={avatar}
              alt='user avatar'
              className="w-[109px] rounded-md"
            />
            <div className="p-2 text-white">
              <p>{`Hello, ${firstName}!`}</p>
              <p className="text-xs lowercase">{userData.email}</p>
              <Link
                to="/profile"
              >
                <p
                  className="bg-white w-full py-[.5px] rounded-full text-black text-center mt-7 text-sm">See Profile</p>
              </Link>
            </div>
          </div>
        </li>

        <li
          onClick={() => navigate('/favorites')}
          className="flex items-center py-4 uppercase border-t-[.5px] border-y-neutral-500 w-full justify-center cursor-pointer"
        >
          <AiOutlineHeart className="text-lg" />
          <p className="ml-2">Favorites</p>
        </li>
        <li
          onClick={() => navigate('/home')}
          className="flex items-center py-4 uppercase border-t-[.5px] border-y-neutral-500 w-full justify-center cursor-pointer">
          <FaPaw />
          <p className="ml-2">Home</p>
        </li>
        <li
          onClick={() => navigate('/chatlist')}
          className="flex items-center py-4 uppercase border-t-[.5px] border-y-neutral-500 w-full justify-center cursor-pointer">
          <AiFillWechat />
          <p className="ml-2">Chats</p>
        </li>
        <li className="flex items-center py-4 uppercase border-t-[.5px] border-y-neutral-500 w-full justify-center">
          <AiOutlineStar />
          <p className="ml-2">Feedbacks</p>
        </li>
          <li
            className="py-4 border-y-[.5px] border-y-neutral-500 w-full">
            <button
              onClick={() => logout()}
              className="flex items-center uppercase w-full justify-center"
            >
              <CiLogin />
              <p className="ml-2">Log Out</p>
            </button>
          </li>

        <li className="fixed bottom-0 mb-2">
          <img
            src={logo}
            alt='user avatar'
            className="w-[90px]"
          />
        </li>
      </ul>
    </div>
  );
}
  
export default Menu;