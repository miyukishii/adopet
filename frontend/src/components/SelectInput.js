import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import statesList from '../mocks/states';

export default function SelectInput({screen}) {
  const { setState, setFilter } = useContext(AppContext);
  const urlHome = window.location.pathname === "/home";

  const onChangeSelectInput = (event) => {
    screen === 'home' ? setFilter(event.target.value) : setState(event.target.value);
  };

  return (
      <select
       id="grid-state"
       required
       onChange={ onChangeSelectInput }
       className={
        (urlHome) 
       ? 
       `p-2 bg-[#D6C496] uppercase relative
       rounded-full text-sm border-0
       outline-none focus:outline-none focus:ring w-full`
       :
       `border border-[#BFBFBF]
       sm:text-sm rounded-lg h-[48px]
       block w-full p-2.5 bg-[#48586F]
       text-white focus:ring-blue-500 
       focus:border-blue-500"`}
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
  )
}