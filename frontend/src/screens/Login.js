import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/services';
import AppContext from '../context/AppContext'

export default function Login() {
  const { authorization, setAuthorization, setUserLogged, redirect, setRedirect } = useContext(AppContext);

    const [formValue, setFormValue] = useState({
      email: '',
      password: '',
    });
  
    const { email, password } = formValue;
    const handleSubmit = (event) => {
      event.preventDefault();
      
      api.post('/login', {
        email, password
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('uid', response.data._id);
          setAuthorization(true)
          setUserLogged(true);
          setRedirect(true)
        }
      }).catch((error) => {
        console.log(error.message);
        setAuthorization(false)
        setTimeout(() => {
            setAuthorization(null)
          }, 4000);
      });
    };
  
    const handleChange = (event) => {
      const { name, value, type } = event.target;
      setFormValue((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };
  
    if (redirect) {
        return <Navigate to="/home" />;
    }
    return (
        <section className="bg-[#48586F] h-screen flex justify-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-[30px] font-thin text-center leading-tight tracking-tight text-white uppercase">
                    Login
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
                    <div className='flex items-center justify-center'>
                      <button type="submit" className="w-[221px] h-[43px] text-white
                      bg-[#00a3ffcc]
                      focus:ring-4 focus:outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] uppercase 
                      font-thin
                      focus:ring-primary-300 rounded-[15px] text-sm 
                      px-5 py-2.5 text-center">
                        Login
                      </button>
                    </div>
                    <p className="text-sm text-center font-light text-gray-400">
                        Don't have an account yet? <a href="/signup" className="font-medium hover:underline text-[#00a3ffcc]">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    {(authorization === null || authorization === true) ? null : (
        <div id="toast-bottom-right" className="flex absolute opc motion-reduce:transition-none motion-reduce:hover:transform-none right-5 bottom-5 items-center 
        p-4 space-x-4 w-full max-w-xs rounded-lg  shadow 
        text-gray-400 divide-gray-700 space-x bg-gray-800" role="alert">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 rounded-lg bg-red-800">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 
                4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path></svg>
        </div>
        <div className="ml-3 text-sm font-normal">Usuário e/ou senha inválido(s)</div>
        </div>
        )}
    </div>

    </section>
  )
}