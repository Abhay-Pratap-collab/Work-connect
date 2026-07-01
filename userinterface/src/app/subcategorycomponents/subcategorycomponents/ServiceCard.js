"use client"
import React, { useState } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';
import { PiTagFill } from "react-icons/pi";
import styles from "./SubCategory.module.css"
import { serverURL } from '@/app/fetchserver/FetchServer';
import PlusMinus from './PlusMinus ';
import { useSelector } from 'react-redux';


export default function ServiceCard({ data, refresh, setRefresh}) {
  var product = useSelector((state) => state.product)
  var cartItems = Object.values(product)


  return (
    <div className={styles.serviceBox} >
      <div className={styles.priceBox} >
        <h4>{data.typesofservices} {data.no_of_ac} Ac </h4>
        <div style={{ fontSize: '13px', color: 'grey', display: 'flex', gap: '4px' }} >
          <img src="/checked.png" style={{ width: '13px', height: '13px' }} /><p>4.26(2.6M reviews)</p></div>
        {data.offer == "" ? <p style={{ fontSize: '14px', fontWeight: '700' }} >Starts at ₹{data.amount}</p> : <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><h4>{`₹${data.amount - data.offer}`}</h4><s>{`₹${data.amount}`}</s><p>{data.time_services}</p></div>}
        <div style={{ fontSize: '12px', color: '#067e20', display: 'flex', alignItems: 'center', gap: '5px' }} ><PiTagFill /><p>₹{(data.offer == 0 ? parseInt(data.amount) : parseInt(data.amount - data.offer)) / parseInt(data.no_of_ac)} per ac</p></div>

        <h6 style={{ fontSize: '14px', color: '#9574f0', }} >View details</h6>

      </div>
      <div style={{ position: 'relative', marginBottom: '20px' }} >
        <img src={`${serverURL}/images/${data.picture}`} style={{ width: '130px' }} />

        <PlusMinus refresh={refresh} setRefresh={setRefresh}
          data={data}
          qty={
            cartItems?.find((item) => item.priceid === data.priceid)?.qty || 0
          }
        />
      </div>
    </div>
  )
}
