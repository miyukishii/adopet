import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosAddCircleOutline } from 'react-icons/io';

import api from '../services/services';
import yearsList from '../mocks/years';
import AppContext from '../context/AppContext'
import Header from '../components/Header';

export default function Donate() {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext);
    const [sex, setSex] = useState('male');
    const [years, setYears] = useState('1 month');
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputList, setInputList] = useState([{ input: "", input_rank: null }]);

    const [formValue, setFormValue] = useState({
      name: '',
      description: '',
      photo1: null,
      photo2: null,
      photo3: null,
      photo4: null,
    });
  
    const { name, description, photo1, photo2, photo3, photo4 } = formValue;
    const { state } = userData;

    const handleSubmit = (event) => {
      event.preventDefault();
      api.post('/pets', {
       name,
       sex,
       description,
       "photos": [photo1, photo2, photo3, photo4].filter((e) =>  e != null),
       "giverId": userData._id,
       state,
       years
      },{
        headers: {'Authorization': userData.token}
      }).then((response) => {
        if (response.status === 201) {
          navigate("/home");
        }
      }).catch((error) => {
        console.log(error.message);
      });
    };
  
    useEffect(() => {
      if (inputList.length <= 4) {
        inputList[inputList.length - 1].input === ""
          ? setIsDisabled(true)
          : setIsDisabled(false)
      }
    }, [inputList])

    const handleListAdd = () => {
      setInputList([
        ...inputList,
        {
          input: "",
          input_rank: null
        }
      ])
    }
  
    const handleChange = (event) => {
      const { name, value, type } = event.target;
      setFormValue((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };

    const onChangeSelectInputYears = (event) => {
      setYears(event.target.value);
    };

    const onChangeSelectInputSex = (event) => {
      setSex(event.target.value);
    };

    return (
      <div className='bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6]'>
        <Header />
        <section className="placeholder-[#474747] h-screen flex flex-col pt-14 items-center font-TwCentMT">
          <h1 className="text-lg text-[30px] font-thin text-center leading-tight tracking-tight text-black uppercase">
            Add pet
          </h1>
          <form className="space-y-4  md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Pet name"
                onChange={handleChange}
                className="
                  border
                  sm:text-sm rounded-[5px]
                  block p-2.5
                  w-full h-[48px]
                  border-[#BFBFBF] 
                  text-red mt-2
                  focus:ring-blue-500 
                  placeholder-[#474747] 
                  focus:border-blue-500
                  drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
                required
              />

              <select
                onChange={ onChangeSelectInputSex }
                className="border
                sm:text-sm rounded-[5px]
                block p-2.5
                w-full h-[48px]
                border-[#BFBFBF] 
                text-red
                focus:ring-blue-500 
                text-[#474747]
                mt-4
                placeholder-[#474747] 
                focus:border-blue-500
                drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
              >
                <option
                  id="sex"
                  name="sex"
                  value="male"
                  selected
                >
                  Male
                </option>
                <option
                  id="sex"
                  name="sex"
                  value="female"
                >
                  Female
                </option>
              </select>

              <textarea
                className='w-[328px] h-[64px] 
                placeholder-[#474747]
                border
                sm:text-sm rounded-[5px]
                block p-2.5
                border-[#BFBFBF] 
                text-red
                focus:ring-blue-500 
                text-[#474747]
                mt-4
                drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
      
                id="description"
                name="description"
                rows="4"
                placeholder='Description'
                cols="37"
                value={description}
                onChange={handleChange}/>

              <select
                onChange={ onChangeSelectInputYears }
                className="border
                sm:text-sm rounded-[5px]
                block p-2.5
                w-full h-[48px]
                border-[#BFBFBF] 
                text-red
                focus:ring-blue-500 
                text-[#474747]
                mt-4
                placeholder-[#474747] 
                focus:border-blue-500
                drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
              >
              {yearsList.map((year, index) => (
                    <option
                      id="years"
                      name="years"
                      value={year}
                      key={index}
                    >
                      {year}
                    </option>
                  ))
                }
              </select> 
                
                { inputList.length > 0
                  ? inputList.map((input, index) => (
                    <div key={index} className="flex">
                      <label htmlFor="photo" className="block mb-2 text-sm font-medium" />
                      <input
                      required
                      className="border
                      sm:text-sm rounded-[5px]
                      mt-4
                      block p-2.5
                      w-full h-[48px]
                      border-[#BFBFBF] 
                      text-red
                      focus:ring-blue-500 
                      placeholder-[#474747] 
                      focus:border-blue-500
                      drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" 
                      type="text"
                      id={`photo${index + 1}`}
                      name={`photo${index + 1}`}
                      label={`input ${index + 1}`}
                      placeholder={`Photo ${index + 1}`}
                      // value={`photo${index + 1}`}
                      onChange={handleChange}
                      />
                    </div>
                ))
                  : "No item in the list"
                }
                  <button 
                    className='flex items-center mt-2'
                    onClick={handleListAdd}
                    disabled={ (inputList.length > Number(3) ?  true : false)} >
                    <p className='mr-1'>Add photo</p>
                    <IoIosAddCircleOutline />
                  </button>
            </div>

            <div className='flex items-center justify-center'>
              <button type="submit" className="w-[221px] h-[43px] text-white
              bg-[#00a3ffcc]
              focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
              font-thin
              focus:ring-primary-300 rounded-[15px] text-sm 
              px-5 py-2.5 text-center">
                Register pet
              </button>
            </div>

        </form>
      </section>
      </div>
  )
}