"use client"
import { Grid } from '@mui/material'
import React, { act, useEffect, useState } from 'react'
import styles from "./SubCategory.module.css"
import { IoIosArrowForward } from 'react-icons/io'
import { serverURL, postData } from '@/app/fetchserver/FetchServer'



export default function SubCategories({refresh,setRefresh, data, pricing, setPricing }) {
const [active, setActive] = useState(data?.[0]?.subcategoryid || "");
  // const [active, setActive] = useState(data[0?.subcategoryid])
  const [hover, setHover] = useState("")

  const fetchPricing = async (scid) => {
    var response = await postData("userinterface/fetch_all_pricing", { subcategoryid: scid })
    setPricing(response?.data)
    setRefresh(!refresh)
  }
 
  useEffect(function(){
    if(data.length>0)
    {
      setHover(data[0]?.subcategoryid)
      setActive(data[0]?.subcategoryid)
      fetchPricing(data[0]?.subcategoryid)
       setRefresh(!refresh)
    }
  },[data])

 const handleCategoryClick = (item) => {
  setActive(item.subcategoryid);
  fetchPricing(item.subcategoryid);
};


  const fillSubcategory = () => {
    return data.map((item, i) => {
      return (
        <Grid size={4} key={i} >
          <div onClick={()=> handleCategoryClick(item)} onMouseOver={() => setHover(item.subcategoryid)} onMouseLeave={() => setHover("")} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowWrap: 'anywhere', gap: '6px', cursor: 'pointer' }} >
            <img src={`${serverURL}/images/${item.icon}`} style={{ width: '70px', height: '70px', border: active === item.subcategoryid ? "2px solid black" : "none", borderRadius: '10px', padding: '2px' }} />
            <p style={{ fontSize: '12px', color: '#4d4c4c' }} >{item.subcategoryname}</p>
            <div style={{ width: hover === item.subcategoryid ? "90%" : "0%", transition: "width 0.2s linear", color: 'green', background: 'black', height: '1px' }} ></div>
          </div>

        </Grid>
      )
    })
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.heading} >Ac Service and Repair</p>
        <div className={styles.rating} ><img src="rating.png" style={{ width: '15px', height: '15px' }} /><p style={{ borderBottom: '0.5px dashed #727272', paddingBottom: '3px', boxSizing: 'border-box' }} >4.76(13.3 M bookings)</p></div>
      </div>
      <div onClick={() => setOpen(true)} style={{ width: '100%', height: '80px', background: '#eee', borderRadius: '10px', padding: '20px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <div >
          <p style={{ fontSize: '12.5px', fontWeight: '500', color: '#535353' }} ><img src="/checked.png" style={{ width: '12px', marginRight: '5px' }} />UC COVER</p>
          <p style={{ fontSize: '13px', marginTop: '10px' }} >Upto 30 days warranty on repairs</p>
        </div>
        <IoIosArrowForward />
      </div>
      <div className={styles.subcategorybox} >
        <Grid container spacing={4} >
          <Grid size={12} style={{ width: '100%' }} >
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }} >
              <span style={{ fontSize: '11px', width: '100px', color: '#838181' }} >Select a service </span>
              <hr style={{ color: 'grey', width: '60%' }} ></hr>
            </div>
          </Grid>
          {fillSubcategory()}
        </Grid>
      </div>
    </div>
  )
}
