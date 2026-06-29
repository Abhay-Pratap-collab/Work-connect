"use Client"
import { serverURL } from '@/app/fetchserver/FetchServer';
import React, { useState } from 'react'
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { useSelector } from 'react-redux';
import PlusMinus from './PlusMinus ';


export default function Cart() {
  var product = useSelector((state) => state.product)
  var cartItem = Object.values(product)

  const totalOfferAmount = cartItem.reduce(
    (total, item) => total + (item.offer * item.qty), 0
  )
  const totalAmount = cartItem.reduce(
    (total, item) => total + (item.amount * item.qty), 0
  )

  const fillCart = () => {
    return cartItem.map((item, index) => {

      return (<div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <p style={{ fontSize: '14px', width: '110px' }}>{item.typesofservices}</p>
      <div>
        <PlusMinus/>
      </div>
        <div style={{ fontSize: '12px', width: '50px', textAlign: 'right' }} >
          <p>₹{item.offer>0?(item.amount-item.offer)*item.qty:(item.amount)*item.qty}</p>
          <s style={{ color: 'grey' }} >₹{item.offer==0?0:item.amount * item.qty}</s>
        </div>
      </div>)
    })
  }

  return (
    <div style={{ width: '100%', minHeight: '100px', border: '1px solid #c4c3c3', borderRadius: '10px', padding: '20px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '30px' }} >
      {cartItem.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} >
          <h3>Cart</h3>
          {fillCart()}
          <hr></hr>
          <div style={{ width: '100%', height: '45px', borderRadius: '6px', background: '#6f36da', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', color: 'white' }} ><div style={{ display: 'flex', alignItems: 'center', gap: '3px' }} ><h5>₹{totalOfferAmount}</h5><h6><s style={{}} >₹{totalAmount}</s></h6></div><h5>View Cart</h5></div>
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }} >
          <img src={`${serverURL}/images/shopping-cart.png`} style={{ width: '50px' }} />
          <p>No items in your cart</p>
        </div>
      )}
    </div>
  )
}
