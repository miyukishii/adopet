import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import SelectInput from '../../components/SelectInput';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext'
import api from '../../services/services';
import Navbar from '../../components/Navbar';
import Loading from "../../components/Loading/PageLoading"

import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pets, setPetList] = useState([]);
  const { filter, userData } = useContext(AppContext);

  useEffect(() => {
    const fetchAPI = async () => {
      api.get(`/pets`).then((response) => {
        if (response.status === 200) {
          setPetList(response.data);
          setLoading(false);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    api.get(`/pets/petByUserId?q=${filter}`)
    .then((response) => {
      if (response.status === 200 && filter) {
        setPetList(response.data)
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }, [filter])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6] h-screen font-TwCentMT'>
      <Header />
      <div className='px-2'>
        <SelectInput screen='home' />
      </div>
      <main className='px-3 my-3 flex flex-wrap w-full justify-center gap-3'>
        {pets.map((pet, index) => (
          <Link to={`/${pet._id}`} key={index}> 
            <div className='bg-[#48586F] rounded-md text-white w-[161px] flex flex-col overflow-hidden'>
              <img
                src={pet.photos[0]}
                alt={pet.petName}
                className="h-[141px] rounded-t-md object-cover"
              />
              <div className='py-1 px-1'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-lg truncate overflow-hidden'>{pet.name}</h1>
                  {
                    (pet.sex === 'female')
                    ? <BsGenderFemale color="orange" />
                    : <BsGenderMale color="green" />
                  }
                </div>
                <div className='flex justify-between'>
                  <p className='text-xs truncate overflow-hidden'>{pet.years}</p>
                  <p className='text-xs truncate overflow-hidden'>{pet.state}</p>
                </div>
              </div>
            </div>
          </Link>
      ))}
      </main>
      {(userData.length !== 0) ? <Navbar /> : null }
    </div>
  )
}