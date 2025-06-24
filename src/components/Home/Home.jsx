import React, { useState, useEffect, useContext } from 'react';
import Style from "./Home.module.css";
import { CounterContext } from '../../Context/CounterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
  </>
}
