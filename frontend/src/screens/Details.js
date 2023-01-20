import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

import api from '../services/services';
import AppContext from '../context/AppContext';
import Loading from "../components/Loading/PageLoading";

import { GrFavorite } from 'react-icons/gr';
import { MdFavorite, MdOutlinePets } from 'react-icons/md';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { BiMapPin } from 'react-icons/bi';

export default function Details() {
  const [petData, setPetData] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ spotlight, setSpotlight ] = useState({});
  const { authorization, userData, } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const { id } =  useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.favorites) {
      if (userData.favorites.includes(id)) {
        setIsFavorite(true);
      }
    }
  }, [id, userData]);

  // useEffect get pet data
  useEffect(() => {
    const fetchAPI = async () => {
      api.get(`/pets/${id}`, {
        headers: {'Authorization': userData.token}
      }).then((response) => {
        if (response.status === 200) {
          setPetData(response.data);
          setSpotlight(response.data.photos[0]);
          setLoading(false);
        } 
      }).catch((error) => {
        console.log(error.message);
        setLoading(false);
        navigate('notfound');
      });
    };
    fetchAPI();
  }, [id, userData.token]);

  // useEffect start chat
  const handleButton = () => {
    if (userData.length === 0) {
      return setPopup(true)
    }
    api.post(`/chat`, {
      "giverId": petData.giverId,
      "userId": userData._id,
      "messages": []
    },
    {
      headers: {'Authorization': userData.token}
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        navigate(`/chatbox/${response.data}`);
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }

  // useEffect favorite pet
  const handleFavorite = () => {
    if (isFavorite) {
      api.put(`/favoriteDelete/${userData._id}`, {
        "favorites": id
      },
      {
        headers: {'Authorization': userData.token}
      }).then((response) => {
        if (response.status === 204) {
          setIsFavorite(false);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    } else {
      api.put(`/favorite/${userData._id}`, 
      {
        "favorites": id
      },
      {
        headers: {'Authorization': userData.token}
      },
      ).then((response) => {
        console.log(response);
        if (response.status === 204) {
          setIsFavorite(true);
        }
      }).catch((error) => {
        console.log(error.message);
      });
    }
  }

  if (popup) {
    return (
      <div>
      <p>Your have to login first</p>
      <Link to="/login">
        Login
      </Link>
    </div>
    )
  }

  if (loading) {
    return <Loading />
  }
  return (
    <main  className='bg-[#48586F] font-TwCentMT h-auto text-white' overflow-scroll>

      <header className='my-2 flex absolute'>
        <Link to="/home" className='bg-[#313641] z-50 rounded-full w-fit flex items-center justify-center opacity-60 p-2 self-center ml-2'>
          <AiOutlineLeft className='text-lg text-white'/>
        </Link>
      </header>

      <button
        onClick={handleFavorite}
        className="absolute right-0 top-0 p-2"
      >
        {
          (isFavorite) ? <MdFavorite className="text-4xl text-[#00a3ffcc]" /> : <GrFavorite className="text-4xl text-[#00a3ffcc]" />
        }
      </button>

      <div>
        <img
          src={spotlight}
          alt='spotlight'
          className=" h-[280px] w-screen object-cover"
        />

        <div className=" flex justify-center gap-2 my-3">
        { petData.photos &&
        petData.photos.map((item, index) => (
          <button key={index} onClick={() => setSpotlight(item)}>
            <p className="btn btn-xs" >{index + 1}</p>
          </button>
        ))
        }
        </div>
      </div>

      <div className='flex flex-col px-4 items-center h-screen bg-[#48586F]'>
        <h1 className='text-xl my-2'>{petData.name}</h1>
        <h2 className='text-[15px] font-bold'>Description</h2>
        <p>{petData.description}</p>

        <ul className="border-y-[1px] py-2 my-5 flex flex-col gap-2 w-full border-white items-center">
            {
              (petData.sex === 'female')
              ? (
                <li className='flex'>
                  <BsGenderFemale className='text-2xl mr-6' />
                  <p>Female</p>
                </li>
              )
              : (
                <li className='flex'>
                  <BsGenderMale className='text-2xl mr-6' />
                  <p>Male</p>
                </li>
              )
            }


            <li className='flex'>
              <BiMapPin className='text-2xl mr-6'/>
              <p>{petData.state}</p>
            </li>

            <li className='flex'>
              <MdOutlinePets className='text-2xl mr-6'/>
              <p>{petData.years}</p>
            </li>
        </ul>

        {
        (petData.giverId === userData._id)
        ? 
        <div>
          <Link
           className="w-[221px] h-[43px] text-white
          bg-[#00a3ffcc]
          focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
          font-thin
          focus:ring-primary-300 rounded-[15px] text-sm 
          px-5 py-2.5 text-center" 
          to={`/editpet/${petData._id}`}>
            Edit pet
          </Link>
        </div>
        :
        <div>
          <button
          onClick={handleButton}
          className="w-[221px] h-[43px] text-white
              bg-[#00a3ffcc]
              focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
              font-thin
              focus:ring-primary-300 rounded-[15px] text-sm 
              px-5 py-2.5 text-center"
          >
          Chat with donor
          </button>
        </div>
      }
       

      </div>

    </main>
  );
}