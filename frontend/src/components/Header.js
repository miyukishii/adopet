import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BiUser } from 'react-icons/bi';
import { MdOutlineAdd } from 'react-icons/md';

import AppContext from "../context/AppContext";
import logo from '../assets/logo-black.png';
import Menu from './Menu';

export default function Header({screen}) {
  const navigate = useNavigate();
  const {userData} = useContext(AppContext);

  const urlDonate = window.location.pathname === "/donate";

  return (
    <header className='flex justify-between p-3'>
      {    
        (userData.length === 0)
        ? <button onClick={() => { navigate('/login') }}>
            <BiUser fontSize="1.5rem" />
          </button>
        : <Menu userData={userData} />
      }
      
      {
        (screen)
        ? <p className='uppercase'>{screen}</p>
        : <Link to="/home" > <img src={logo} alt='Adopet logo' className='w-12' /> </Link>
      }

      {
        (userData.length === 0 || urlDonate)
        ? <div className='w-[24px] h-[24px]'/>

        : <button onClick={() => { navigate('/donate') }} className="header-icon">
            <MdOutlineAdd fontSize="1.5rem" />
          </button>
      }

    </header>
  )
}