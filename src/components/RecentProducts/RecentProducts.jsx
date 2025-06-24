import React, { useState, useEffect, useContext } from 'react';
import Style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loading/Loader';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {
  // const [recentProducts, setRecentProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // function getRecentProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then(({data}) => {
  //     setRecentProducts(data.data);
  //     setIsLoading(false);
  //   })
  //   .catch((error) => {
  //     setIsLoading(false);
  //   })
  // }

  // useEffect(() => {
  //   getRecentProducts();
  // }, []);

  // const {data: products, isLoading, isFetching, error, isError} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products`),
  //   select: (data) => data.data.data,
  //   staleTime: 20 * 1000,
    // refetchOnMount: true,
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
  // })

  // console.log({isLoading, isFetching});

  const {addItemToCart, setCartItems} = useContext(CartContext);

  async function addItem(id) {
    const response = await addItemToCart(id);
    console.log(response);
    if(response.data.status == "success") {
      // alert('added');
      setCartItems(response.data.numOfCartItems);
      toast.success('Product has been added successfully!');
    }
  }

  const {data: products, isLoading, isFetching, error, isError} = useProducts();

  if(isLoading) {
    return <Loader/>
  }
  if(isError) {
    return <h3>{JSON.stringify(error)}</h3>
  }
  return <>
    <div className="row">
      {/* {recentProducts.map((product) => <div key={product.id} className="w-1/6 px-4"> */}
      {products.map((product) => <div key={product.id} className="w-3/6 md:w-2/6 xl:w-1/6 px-4">
        <div className="product py-4">
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <div>
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className='block font-normal mt-2 text-main'>{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className='flex justify-between items-center'>
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
              </div>
            </div>
          </Link>
          <button onClick={() => addItem(product.id)} className='btn'>add to cart</button>
        </div>
      </div>)}
    </div>
  </>
}
