import AppContext from '../context/AppContext'
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/services';

import { AiOutlineLeft } from 'react-icons/ai';

import statesList from '../mocks/states';

export default function EditProfile() {
  const { userData, setUserData } = useContext(AppContext);
  const { email, fullName, password, _id } = userData;
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // handle toggle 
  const toggle = () =>{
      setOpen(!open)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    api.put(`/${_id}`, {
      email, password, fullName, state
    },
    {
      "headers": {'Authorization': userData.token},
    }).then((response) => {
      if (response.status === 204) {
        navigate('/profile');
      }
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };


  const onChangeSelectInput = (event) => {
    setState(event.target.value);
  };

  return (
  <div className="bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6]">
      <header className='h-20 flex'>
          <Link to="/profile" className='bg-[#FBFBFB] z-50 rounded-full w-fit flex items-center justify-center p-2 opacity-50 self-center ml-6'>
            <AiOutlineLeft className='text-lg'/>
          </Link>
      </header>
       <section className="placeholder-[#474747] h-screen flex flex-col items-center font-TwCentMT">
            <form className="space-y-4 w-full md:space-y-6 px-10" onSubmit={handleSubmit}>
              <div>

              <label htmlFor="fullName">Full name</label>
              <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleChange}
                  className="
                    border
                    sm:text-sm rounded-[5px]
                    block p-2.5
                    w-full h-[48px]
                    border-[#BFBFBF] 
                    text-red  mb-4
                    focus:ring-blue-500 
                    placeholder-[#474747] 
                    focus:border-blue-500
                    drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
                  required
                />

                <label htmlFor="pasword">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className="
                    border
                    sm:text-sm rounded-[5px]
                    block p-2.5
                    w-full h-[48px]
                    border-[#BFBFBF] 
                    text-red  mb-4
                    focus:ring-blue-500 
                    placeholder-[#474747] 
                    focus:border-blue-500
                    drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
                  required
                />
            
                <label htmlFor="grid-state">State</label>
                <select
                  id="grid-state"
                  required
                  onChange={ onChangeSelectInput }
                  className="border
                  sm:text-sm rounded-[5px]
                  block p-2.5
                  w-full h-[48px]
                  border-[#BFBFBF] 
                  text-red
                  focus:ring-blue-500 
                  text-[#474747]
                  mb-4
                  placeholder-[#474747] 
                  focus:border-blue-500
                  drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
                >
                    <option disabled defaultValue selected className='option-disabled'>Select state</option>
                      {
                        statesList.map(({nome}, index) => (
                          <option
                            id="state"
                            name="state"
                            value={nome}
                            key={index}
                            
                          >
                            {nome}
                          </option>
                        ))
                      }
                </select>
            </div>
              <div className='flex items-center justify-center'>
                <button type="submit" className="w-[221px] h-[43px] text-white
                bg-[#00a3ffcc]
                focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
                font-thin
                focus:ring-primary-300 rounded-[15px] text-sm 
                px-5 py-2.5 text-center">
                  Save changes
                </button>
              </div>
            </form>
    </section>
    </div>
  )
}