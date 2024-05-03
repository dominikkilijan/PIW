// App.js
import React from 'react';
import './App.css';
import { RouterProvider,  Outlet,  Route, createBrowserRouter, createRoutesFromElements, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './NavBar';
import BrowseSection from './BrowseSection';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      {/* <Route path="" element={<Home />} />
      <Route path="new" element={<New />} /> */}
    </Route>
  )
);


function AppLayout() {
  return (
    <>
    <Navbar/>
    <BrowseSection/>
    </>
  );
}

const App = () => <RouterProvider router={router} />

export default App;
