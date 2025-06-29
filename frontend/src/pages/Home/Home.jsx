import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import { set } from 'mongoose'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
const Home = ({ searchQuery }) => {
    const [category,setCategory]=useState("All");
    // const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}  searchQuery={searchQuery} />
      

      <AppDownload />
    </div>
  )
}

export default Home
