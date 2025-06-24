import React, { useState, useEffect, useContext } from 'react';
import Style from "./CheckOut.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  const {cartId} = useParams();

  const {checkOutSession} = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  // axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
  // .then((apiResponse) => {
  //   if(apiResponse?.data?.message === 'success') {
  //     localStorage.setItem('userToken', apiResponse.data.token);
  //     setUserLogin(apiResponse.data.token);
  //     setIsLoading(false);
  //     navigate('/');
  //     // console.log(apiResponse);
  //   }
  // })
  // .catch((apiResponse) => {
  //   setIsLoading(false);
  //   setApiError(apiResponse?.response?.data?.message);
  //   // console.log(apiResponse?.response?.data?.message);
  // });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: handleSubmit
  });

  async function handleSubmit(values) {
    const response = await checkOutSession(cartId, values);
    // console.log(response.data.session.url);
    window.location.href = response.data.session.url;
  }

  useEffect(() => {

  }, [])

  return <>
    <div className="py-6 max-w-xl mx-auto px-12 md:px-0">
      <h2 className="text-3xl font-bold mb-6 text-main">CheckOut</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number: </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City: </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_details" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password: </label>
        </div>
        <div className='flex items-center'>
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Payment'}
          </button>
        </div>
      </form>
    </div>
  </>
}