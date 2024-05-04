import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Navbar from "../Components/NavBar";
import ViewSection from "../Components/ViewSection";

const Browse = () => {

  return (
    <>
        <Navbar/>
        <ViewSection/>
    </>
  )
}

export default Browse;