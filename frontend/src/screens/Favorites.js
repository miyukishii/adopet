import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// import { MdFavorite } from 'react-icons/md';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import AppContext from '../context/AppContext'
import api from "../services/services";
import Loading from "../components/Loading/PageLoading";

export default function Favorites() {
  const { userData } = useContext(AppContext)
  const [loading, setLoading] = useState(true);
  const [favoritesList, setFavoritesList] = useState([]);
  const [removeFavorite, setRemoveFavorite] = useState(false);
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    const fetchIdData = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        api.get(`/${uid}`).then((response) => {
          if (response.status === 200) {
            setFavoritesList(response.data.favorites)
            setPetsData([]);
          }
        }).catch((error) => {
          console.log(error.message);
        });
      }
    };
    fetchIdData()
  }, [removeFavorite])

  useEffect(() => {
    if (favoritesList) {
      favoritesList.forEach((item) => {
        api.get(`/pets/${item}`, {
          headers: {'Authorization': userData.token}
        }).then((response) => {
          if (response.status === 200) {
            setPetsData((prev) => [...prev, response.data])
            setLoading(false);
          }
        }).catch((error) => {
          console.log(error.message);
        });
      })
    }
  }, [favoritesList]);

  // const handleButton = (idPet) => {
  //   api.put(`/favoriteDelete/${userData._id}`, {
  //   "favorites": idPet
  //   },
  //   {
  //     headers: {'Authorization': userData.token}
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.status === 204) {
  //       console.log(response);
  //       setRemoveFavorite(!removeFavorite);
  //     }
  //   }).catch((error) => {
  //     console.log(error.message);
  //   });
  // }

if (loading) {
  return <Loading />
}
return (
  <div className='bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6] h-screen'>
    <header
    className='h-16 flex items-center justify-between mx-2'>
      <Link
        to="/home"
        className='bg-[#FBFBFB] z-50 rounded-full w-fit flex items-center justify-center p-2 opacity-70 self-center cursor-pointer'
      >
        <AiOutlineLeft className='text-lg'/>
      </Link>
      <h1 className='uppercase'>Favorites</h1>
      <div className='h-[34px] w-[34px]' />
      </header>
    {
      (petsData.length !== 0)
      ? (
        <div className='px-4'>
          {petsData.map((favorite, index) => (
            <Link to={`/${favorite._id}`} key={index}> 
              <div className='bg-[#48586F] rounded-md text-white w-[161px] flex flex-col overflow-hidden mb-2'>
                <img
                  src={favorite.photos[0]}
                  alt={favorite.petName}
                  className="h-[141px] rounded-t-md object-cover"
                />
                {/* <button
                  className='relative top-0 right-0'
                  onClick={() => handleButton(favorite._id)}
                >
                  <MdFavorite />
                </button> */}
                <div className='py-1 px-1'>
                  <div className='flex justify-between items-center'>
                    <h1 className='text-lg truncate overflow-hidden'>{favorite.name}</h1>
                    {
                      (favorite.sex === 'female')
                      ? <BsGenderFemale color="orange" />
                      : <BsGenderMale color="green" />
                    }
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-xs truncate overflow-hidden'>{favorite.years}</p>
                    <p className='text-xs truncate overflow-hidden'>{favorite.state}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )
      : (
        <p>you don't have any favorite pets</p>
      )
    }
  </div>
);
}