import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import useGetAllJobs from '../Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  const {user} = useSelector((store) => store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div className=''>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  )
}

export default Home