import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BiMapPin, BiEditAlt } from 'react-icons/bi';

import avatar from '../assets/avatar.jpg';
import MyPets from './MyPets';

export default function ProfileInfo({ userData, pets }) {

  const navigate = useNavigate();

  return (
    <div className=' absolute flex flex-col items-center justify-center font-TwCentMT top-10 w-screen'>
      <img
        src={avatar}
        alt='user avatar'
        className='w-[109px] h-[100px] mb-5 rounded-lg'
      />
      <Link to='/editprofile'
        className='bg-[#BAF6F6] p-2 absolute z-50 top-20 ml-24 rounded-full
      '>
        <BiEditAlt className='text-xl'/>
      </Link>

      <h1 className='uppercase text-xl'>{userData.fullName}</h1>
      <p className='mb-4'>In ADOPET since Jan 2003</p>

      <ul className='border-y-[1px] border-black py-4 flex flex-col gap-2 w-[250px]'>
        <li className='flex'>
          <AiOutlineMail className='text-2xl mr-4' />
          <p>{userData.email}</p>
        </li>

        <li className='flex'>
          <BiMapPin className='text-2xl mr-4' />
          <p>{userData.state}</p>
        </li>

        <li className='flex'>
          <AiOutlinePhone className='text-2xl mr-4' />
          <p>{(userData.telephone) ? (userData.telephone) : 'Phone not registered'}</p>
        </li>
      </ul>

      <MyPets pets={pets}/>
          
      <button
        onClick={() => navigate('/editprofile')}
        className='bg-[#48586F] p-2 rounded w-[200px] my-4 text-white uppercase text-sm'
      >
        Edit profile
      </button>
  </div>
  )
}