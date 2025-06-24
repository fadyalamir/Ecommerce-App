import React, { useState, useEffect } from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  // console.log(props);
  if(localStorage.getItem('userToken') !== null) {
    // Navigate To Component What He Needed
    return props.children;
  } else {
    // Navigate To Login
    return <Navigate to={'/login'}/>
  }
}
