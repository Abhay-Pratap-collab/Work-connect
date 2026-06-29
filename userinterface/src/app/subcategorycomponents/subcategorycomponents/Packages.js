"use client"
import React from 'react'
import ServiceCard from './ServiceCard'



export default function Packages({ data, cartItem, setCartItem }) {
    console.log("Packages data:", data);
  console.log("Is Array:", Array.isArray(data));


  const fillData = () => {

    return (<div style={{ height: 'auto' }} >
      <p style={{ fontSize: '27px', fontWeight: '700' }} >{data[0]?.subcategoryname}</p>
      {data.map((item, i) => {
        return (
          <ServiceCard data={item} key={i} cartItem={cartItem} setCartItem={setCartItem} />
        )
      })}
      <div style={{ width: '100%', height: '3px', background: '#eee', borderRadius: '10px' }} ></div>
    </div>)

  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }} >
      {fillData()}
    </div>
  )
}
