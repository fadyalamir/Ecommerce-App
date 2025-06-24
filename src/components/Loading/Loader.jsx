import React from 'react';
import styles from './Loader.module.css';
import { ThreeCircles } from 'react-loader-spinner';

export default function Loader() {
  return <>
    <div className='my-5 flex justify-center'>
      <ThreeCircles height="100" width="100" color="#0aad0a" visible={true} ariaLabel="three-circles-rotating"/>
    </div>
  </>
}