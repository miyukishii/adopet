import React from 'react';
import { Link } from 'react-router-dom';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

export default function MyPets({ pets }) {

  return (
    <div className='font-TwCentMT'>
      <p className="uppercase text-xl px-4 pt-6">Animals in adoption</p>
      <div className="carousel carousel-center w-screen p-4 space-x-4 rounded-box">
      { (pets !== undefined) &&
        pets.map((pet, index) => (
          <Link to={`/${pet._id}`} key={index}> 
            <div className='bg-[#48586F] carousel-item rounded-md text-white w-[161px] flex flex-col overflow-hidden mb-2'>
              <img
                src={pet.photo1}
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
    </div>
    </div>
  );
}