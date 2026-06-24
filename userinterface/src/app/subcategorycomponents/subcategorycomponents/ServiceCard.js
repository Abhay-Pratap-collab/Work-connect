"use client"
import React, { useState } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';
import { PiTagFill } from "react-icons/pi";
import styles from "./SubCategory.module.css"
import { serverURL } from '@/app/fetchserver/FetchServer';
import PlusMinus from './PlusMinus ';


export default function ServiceCard({ data, cartItem, setCartItem }) {

  const handleCart = (service, amount, offer) => {
    setCartItem((prev) => [...prev, { service: service, amount: amount, offer: offer, qty: 1 }])
  }

  const exist = cartItem.find(
    (item) => item.service === data.typeofservice

  )
  const increaseQty = () => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.service === data.typeofservice
          ? { ...item, qty: item.qty + 1 }
          : item
      )

    )
  }
  const decreaseQty = () => {
    setCartItem((prev) => prev.map((item) =>
      item.service === data.typeofservice ? { ...item, qty: item.qty - 1 } : item
    )
      .filter(item => item.qty > 0)
    );
  };
  const includes = () => {
    return data.include.map((include, index) => {
      return (<li key={index} style={{ fontSize: '12px', color: '#686868', marginLeft: '20px' }} >{include}</li>)
    })
  }
  return (
    <div className={styles.serviceBox} >
      <div className={styles.priceBox} >
        <h4>{data.typesofservices} {data.no_of_ac} Ac </h4>
        <div style={{ fontSize: '13px', color: 'grey', display: 'flex', gap: '4px' }} >
          <img src="/checked.png" style={{ width: '13px', height: '13px' }} /><p>4.26(2.6M reviews)</p></div>
        {data.offer == "" ? <p style={{ fontSize: '14px', fontWeight: '700' }} >Starts at ₹{data.amount}</p> : <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><h4>{`₹${data.amount-data.offer}`}</h4><s>{`₹${data.amount}`}</s><p>{data.time_services}</p></div>}
        <div style={{ fontSize: '12px', color: '#067e20', display: 'flex', alignItems: 'center', gap: '5px' }} ><PiTagFill /><p>₹{(data.offer==0?parseInt(data.amount):parseInt(data.amount-data.offer))/parseInt(data.no_of_ac)} per ac</p></div>
      
        <h6 style={{ fontSize: '14px', color: '#9574f0', }} >View details</h6>

      </div>
      <div style={{ position: 'relative', marginBottom: '20px' }} >
        <img src={`${serverURL}/images/${data.picture}`} style={{ width: '130px' }} />
        {/* <div style={{ position: 'absolute', top: '85%', left: '26px' }} >
          {exist?.qty > 0 ? (
            <div style={{ width: '80px', height: '36px', border: '1px solid #6f36da', color: '#6f36da', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 10px 10px 10px', background: 'white', cursor: 'pointer' }} >
              <LuMinus size="13" onClick={() => decreaseQty()} /><span>{exist?.qty || 0}</span><LuPlus size="13" onClick={() => increaseQty()} />
            </div>
          ) : (
            <button onClick={() => handleCart(data.typeofservice, data.amount, data.offer)} style={{ padding: '10px', width: '80px', height: '36px', border: '1px solid #9574f0', borderRadius: '6px', color: '#9574f0', background: 'white', fontWeight: '600', cursor: 'pointer' }} >Add</button>
          )}
        </div> */}
        <PlusMinus/>
      </div>
    </div>
  )
}
