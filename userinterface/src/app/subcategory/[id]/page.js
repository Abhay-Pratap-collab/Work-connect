"use client"
import { Box, Grid } from "@mui/material";

import SubCategories from "../../subcategorycomponents/subcategorycomponents/SubCategories";

import Packages from "../../subcategorycomponents/subcategorycomponents/Packages";
import Cart from "../../subcategorycomponents/subcategorycomponents/Cart";
import { useMediaQuery } from "@mui/material";
import Promise from "../../subcategorycomponents/subcategorycomponents/Promise";
import { useState, useEffect } from "react";
import Footer from "../../components/headercomponent/footer/Footer";
import Header from "../../components/headercomponent/header";
import Slider from "../../subcategorycomponents/subcategorycomponents/Slider";
import PriceComponent from "../../subcategorycomponents/subcategorycomponents/PriceComponent";
import { postData } from "@/app/fetchserver/FetchServer";
import { useParams } from "next/navigation";

export default function subcategory() {
  const [cartItem, setCartItem] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [pricing, setPricing] = useState([])
  const [refresh,setRefresh]=useState(false)

  const params = useParams()
  const halfScreen = useMediaQuery("(max-width:900px)")
  const fetchAllSubCategory = async () => {
    var response = await postData('userinterface/fetch_all_subcategory_by_categoryid', { categoryid: id })
    setSubCategory(response.data)
  }
  useEffect(function () {
    fetchAllSubCategory()
  }, [])


  const { id } = params
  const images = ['first.png', 'second.png', 'thrid.png'];
  return (<div>
    <Header />
    <div style={{ width: '100vw', maxWidth: '1350px', height: '100%', margin: 'auto', display: 'flex', gap: '30px', padding: '20px', marginTop: '90px' }} >
      <div style={{ width: '320px', height: '100%', display: 'flex', flexDirection: 'column' }} >
        <SubCategories refresh={refresh} setRefresh={setRefresh} data={subcategory} pricing={pricing} setPricing={setPricing} />
        <div style={{ width: '100%', height: 'auto', display: halfScreen ? "" : "none" }} >
          <Cart cartItem={cartItem} setCartItem={setCartItem} />
          <Promise />
        </div>
      </div>
      <div style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }} >
        <div style={{ width: '100%', height: 'auto', display: halfScreen ? "" : "" }} >
          <Slider data={images} />
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', height: 'auto', position: 'sticky', top: '0px' }} >
          <div style={{ minWidth: '400px', height: 'auto', border: '1px solid #c4c3c3', borderTopLeftRadius: '10px' }} >
            <Packages data={pricing} cartItem={cartItem} setCartItem={setCartItem} />

          </div>
          <div style={{ width: '40%', height: '100', borderTop: '1px solid #c4c3c3', padding: '20px', position: 'sticky', top: '10px', display: halfScreen ? "none" : "" }} >
            <Promise />
            <Cart  />
          </div>

        </div>

      </div>
    </div>
    <Footer />
  </div>)
}