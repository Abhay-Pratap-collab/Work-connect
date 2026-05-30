"use Client"
import React, { useState } from 'react'
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";


export default function Cart({ cartItem, setCartItem }) {

  const totalOfferAmount = cartItem.reduce(
    (total, item) => total + (item.offer * item.qty), 0
  )
  const totalAmount = cartItem.reduce(
    (total, item) => total + (item.amount * item.qty), 0
  )
  const increaseQty = (service) => {
    setCartItem(prev =>
      prev.map(item =>
        item.service === service
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (service) => {
    setCartItem(prev =>
      prev
        .map(item =>
          item.service === service
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const fillCart = () => {
    return cartItem.map((item, index) => {

      return (<div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <p style={{ fontSize: '14px', width: '110px' }}>{item.service}</p>
        <div style={{ width: '80px', height: '33px', border: '1px solid #6f36da', color: '#6f36da', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 10px 10px 10px', }} >
          <span><LuMinus size="13" onClick={() => decreaseQty(item.service)} /></span><span>{item.qty}</span><span><LuPlus size="13" onClick={() => increaseQty(item.service)} /></span>
        </div>
        <div style={{ fontSize: '12px', width: '50px', textAlign: 'right' }} >
          <p>₹{item.offer * item.qty}</p>
          <s style={{ color: 'grey' }} >₹{item.amount * item.qty}</s>
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
          <img src="/shopping-cart.png" style={{ width: '50px' }} />
          <p>No items in your cart</p>
        </div>
      )}
    </div>
  )
}
