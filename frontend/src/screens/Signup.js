import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/services';
import AppContext from '../context/AppContext';
import SelectInput from '../components/SelectInput';

export default function Signup() {
    const { state, setAuthorization } = useContext(AppContext);
    const [redirect, setRedirect] = useState(false);
    const [disabledBtn, setDisableBtn] = useState(null);
    const [formValue, setFormValue] = useState({
      email: '',
      password: '',
      fullName: '',
      rewritePassword: '',
    });
  
    const { email, password, fullName, rewritePassword } = formValue;

    const handleSubmit = (event) => {
      event.preventDefault();
      
      api.post('/signup', {
        email, password, fullName, state
      }).then((response) => {
        if (response.status === 201) {
          localStorage.setItem('uid', response.data._id)
          setAuthorization(true);
          setRedirect(true);
        }
      }).catch((error) => {
        console.log(error.message);
        setAuthorization(false);
        setTimeout(() => {
            setAuthorization(null)
          }, 4000);
      });
    };

    useEffect(() => {
      (password === rewritePassword) ? setDisableBtn(false) : setDisableBtn(true)
    }, [password, rewritePassword])
  
    const handleChange = (event) => {
      const { name, value, type } = event.target;
      setFormValue((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };

    if (redirect) {
      return <Navigate to="/login" />;
    }
    return (
      <section className="bg-[#48586F] h-screen flex justify-center font-TwCentMT w-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl text-[30px] font-thin text-center leading-tight tracking-tight text-white uppercase">
            sign up
          </h1>
          
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white" />
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  id="email"
                  className="border
                  sm:text-sm rounded-lg
                  block p-2.5 bg-[#48586F]
                  w-[328px] border-[#BFBFBF] 
                  text-white focus:ring-blue-500 h-[48px]
                  focus:border-blue-500" 
                  placeholder="E-mail" 
                  required={true} 
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white" />
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                id="fullName"
                className="border border-[#BFBFBF]
                sm:text-sm rounded-lg h-[48px]
                block w-full p-2.5 bg-[#48586F]
                text-white focus:ring-blue-500 
                focus:border-blue-500"
                placeholder="Full Name" 
                required={true} 
              />
            </div>

            <SelectInput />

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="border border-[#BFBFBF]
                sm:text-sm rounded-lg h-[48px]
                block w-full p-2.5 bg-[#48586F]
                text-white focus:ring-blue-500 
                focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="rewritePassword" className="block mb-2 text-sm font-medium text-white" />
              <input
                type="password"
                name="rewritePassword"
                id="rewritePassword"
                placeholder="Rewrite Password"
                value={rewritePassword}
                onChange={handleChange}
                className="border border-[#BFBFBF]
                sm:text-sm rounded-lg h-[48px]
                block w-full p-2.5 bg-[#48586F]
                text-white focus:ring-blue-500 
                focus:border-blue-500"
                required
              />
            </div>

            <div className='flex items-center justify-center'>
              <button type="submit"
              disabled={disabledBtn}
                className="w-[221px] h-[43px] text-white
                bg-[#00a3ffcc]
                focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
                font-thin disabled:bg-slate-50
                focus:ring-primary-300 rounded-[15px] text-sm 
                px-5 py-2.5 text-center">
                Login
              </button>
            </div>

          </form>
    </div>
    </section>
  )
}