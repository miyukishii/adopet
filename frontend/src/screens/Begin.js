import React, { useContext } from 'react';
import AppContext from '../context/AppContext'
import { useNavigate, Link } from 'react-router-dom';

export default function Begin() {
  const { userData } = useContext(AppContext);
  
  const navigate = useNavigate();

  const handleButton = () => {
    if (userData.fullName) {
      navigate("/home")
    } else {
      navigate("/login")
    }
  }
  
  return (
    <div className='h-screen text-center text-transform: uppercase text-sm bg-begin bg-no-repeat bg-cover bg-fixed'>
      <header className='py-5 align-middle'>
        What would you like to do?
      </header>
      <main className='px-5 flex flex-col h-screen text-xl text-white'>
        <div onClick={() => handleButton()} className='bg-slate-500 opacity-80 h-60 rounded flex justify-center items-center shadow-md mt-4 cursor-pointer'>
          <p>Donate pets</p>
        </div>
        <Link to="/home">
        <div onClick={() => handleButton()} className='bg-slate-500 opacity-80 h-60 rounded flex justify-center items-center shadow-md mt-4 cursor-pointer'>
          <p>Adopt pets</p>
        </div>
        </Link>
      </main>
    </div>
  )
}