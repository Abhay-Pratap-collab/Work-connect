"use client"
import Header from "../components/headercomponent/header";
import CategoryScroll from "../components/CategaryScroll";
import HoemPageImage from "../components/homepageimage/HomePageImage";
import CategoryComponent from "../components/headercomponent/categorycomponent/CategoryComponent";
import { Grid } from "@mui/material";
import Footer from "../components/headercomponent/footer/Footer";
import AddComponent from "../components/addcomponent/AddComponent";
import { useEffect, useState } from "react";
import { getData, postData } from "../fetchserver/FetchServer";
import { useRouter } from 'next/navigation';
export default function HomePage() {
  const [category, setCategory] = useState([])
  const router = useRouter()
  const fetchAllCategory = async () => {
    var response = await getData('userinterface/fetch_all_category')
    setCategory(response.data)
  }
  useEffect(function () {
    fetchAllCategory()
  }, [])



  const Scroll = [
    {
      id: 1,
      image: 'Lock.png'

    },
    {
      id: 2,
      image: 'home repair.png'
    },
    {
      id: 3,
      image: 'Relax.jpg',
    },
    {
      id: 4,
      image: 'home repair.png'
    }
  ]

  const itemData = [
    {
      img: 'one.jpeg',
      title: 'Plumber',
      rows: 3,
      cols: 2,
    },
    {
      img: 'two.jpeg',
      title: 'AC repair',
      rows: 2,
      cols: 2
    },
    {

      img: 'four.jpeg',
      title: 'Paint',
      cols: 2,
      rows: 3,
    },
    {
      img: 'three.jpeg',
      title: 'Washroom cleaning',
      cols: 2,
      rows: 2,
    },


  ];


  return (<div style={{ width: '100%' }} >
    <div>

      <Header />
    </div>
    {/* <div style={{  marginLeft: '10px',padding:'110px',margin:'10ppx'}}> */}
    <div style={{
      padding: '110px 50px 20px 50px', // Top padding accounts for fixed header
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>



      {/* <Grid container spacing={4}> */}
      <Grid container spacing={4} style={{ maxWidth: '1350px' }}>
        <Grid size={6}>
          <CategoryComponent data={category} />

        </Grid>
        <Grid size={6} style={{ marginTop: '15px' }}>
          <HoemPageImage data={itemData} />
        </Grid>


      </Grid >
      <div style={{ marginTop: '80px', width: '100%', maxWidth: '1300px', marginBottom: '20px' }}>
        <h1 style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,           // camelCase and capital 'W'
          WebkitBoxOrient: 'vertical',  // Required for line-clamp to work
          overflow: 'hidden',           // Required for line-clamp to work
          fontFamily: 'os_semi_bold',
          fontSize: '36px',
          lineHeight: '44px',
          color: 'rgba(15, 15, 15, 1.00)',
          textDecorationLine: 'none',
          textTransform: 'none',
          fontWeight: 600,
          textAlign: 'left',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif',
          marginBottom: '80px'
        }}>Offers & discounts</h1>
        <CategoryScroll data={Scroll} />
      </div>
      <div style={{ marginTop: '50px', width: '95%' }}>

        <AddComponent />
      </div>








    </div>

    <Footer />


  </div>)
}