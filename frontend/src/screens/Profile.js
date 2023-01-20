import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import AppContext from '../context/AppContext';
import api from '../services/services';
import Loading from '../components/Loading/PageLoading';

import { AiOutlineLeft } from 'react-icons/ai';

export default function Profile() {
  const { userData } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [pets, setPetList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchAPI = async () => {
      api.get(`/pets/giver/${userData._id}`, {
        headers: {'Authorization': userData.token}
      }).then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setPetList(response.data);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    };
    fetchAPI();
  }, [userData]);

  if (loading) {
    return <Loading />;
  }
    return (
    <div>
      <header className='bg-[#48586F] h-24 flex '>
          <Link to="/home" className='bg-[#FBFBFB] z-50 rounded-full w-fit flex items-center justify-center p-2 opacity-50 self-center ml-6'>
            <AiOutlineLeft className='text-lg'/>
          </Link>
      </header>
      <ProfileInfo pets={pets} userData={userData}/>
    </div>
  );
}