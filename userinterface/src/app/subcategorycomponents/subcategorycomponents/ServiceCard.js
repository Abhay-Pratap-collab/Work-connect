// "use client"
// import React, { useState } from 'react'
// import { LuMinus, LuPlus } from 'react-icons/lu';
// import { PiTagFill } from "react-icons/pi";
// import styles from "./SubCategory.module.css"


// export default function ServiceCard({ data, cartItem, setCartItem }) {

//   const handleCart = (service, amount, offer) => {
//     setCartItem((prev) => [...prev, { service: service, amount: amount, offer: offer, qty: 1 }])
//   }

//   const exist = cartItem.find(
//     (item) => item.service === data.typeofservice

//   )
//   const increaseQty = () => {
//     setCartItem((prev) =>
//       prev.map((item) =>
//         item.service === data.typeofservice
//           ? { ...item, qty: item.qty + 1 }
//           : item
//       )

//     )
//   }
//   const decreaseQty = () => {
//     setCartItem((prev) => prev.map((item) =>
//       item.service === data.typeofservice ? { ...item, qty: item.qty - 1 } : item
//     )
//       .filter(item => item.qty > 0)
//     );
//   };
//   const includes = () => {
//     return data.include.map((include, index) => {
//       return (<li key={index} style={{ fontSize: '12px', color: '#686868', marginLeft: '20px' }} >{include}</li>)
//     })
//   }
//   return (
//     <div className={styles.serviceBox} >
//       <div className={styles.priceBox} >
//         <h4>{data.typeofservice}</h4>
//         <div style={{ fontSize: '13px', color: 'grey', display: 'flex', gap: '4px' }} ><img src="/checked.png" style={{ width: '13px', height: '13px' }} /><p>4.26(2.6M reviews)</p></div>
//         {data.offer == "" ? <p style={{ fontSize: '14px', fontWeight: '700' }} >Starts at ₹{data.amount}</p> : <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><h4>{`₹${data.offer}`}</h4><s>{`₹${data.amount}`}</s><p>{data.timeservice}</p></div>}
//         <div style={{ fontSize: '12px', color: '#067e20', display: 'flex', alignItems: 'center', gap: '5px' }} ><PiTagFill /><p>₹549 per AC</p></div>
//         <ul style={{ paddingTop: '10px', borderTop: '0.5px dashed #c9c9c9' }} >
//           {includes()}
//         </ul>
//         <h6 style={{ fontSize: '14px', color: '#9574f0', }} >View details</h6>

//       </div>
//       <div style={{ position: 'relative', marginBottom: '20px' }} >
//         <img src={data.picture} style={{ width: '130px' }} />
//         <div style={{ position: 'absolute', top: '85%', left: '26px' }} >
//           {exist?.qty > 0 ? (
//             <div style={{ width: '80px', height: '36px', border: '1px solid #6f36da', color: '#6f36da', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 10px 10px 10px', background: 'white', cursor: 'pointer' }} >
//               <LuMinus size="13" onClick={() => decreaseQty()} /><span>{exist?.qty || 0}</span><LuPlus size="13" onClick={() => increaseQty()} />
//             </div>
//           ) : (
//             <button onClick={() => handleCart(data.typeofservice, data.amount, data.offer)} style={{ padding: '10px', width: '80px', height: '36px', border: '1px solid #9574f0', borderRadius: '6px', color: '#9574f0', background: 'white', fontWeight: '600', cursor: 'pointer' }} >Add</button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"
import React from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';

export default function ServiceCard({ cartItem, setCartItem }) {
  // 1. Handlers to update quantities from inside the cart
  const increaseQty = (serviceName) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.service === serviceName
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (serviceName) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.service === serviceName
          ? { ...item, qty: item.qty - 1 }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  // 2. Helper functions to safely parse numbers
  const getActivePrice = (item) => {
    // Use the offer price if it exists and isn't empty, otherwise use the base amount
    const price = item.offer && item.offer !== "" ? item.offer : item.amount;
    return Number(price.toString().replace(/,/g, '')) || 0;
  };

  const getOriginalPrice = (item) => {
    return Number(item.amount.toString().replace(/,/g, '')) || 0;
  };

  // 3. Calculate Totals
  const totalAmount = cartItem.reduce((sum, item) => sum + (getActivePrice(item) * item.qty), 0);
  const totalOriginal = cartItem.reduce((sum, item) => sum + (getOriginalPrice(item) * item.qty), 0);

  // 4. Empty State
  if (cartItem.length === 0) {
    return null; // Or return a styled "Empty Cart" div if you prefer
  }

  return (
    <div style={{ width: '100%', border: '1px solid #e0e0e0', padding: '24px', borderRadius: '12px', background: 'white' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Cart</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
        {cartItem.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Left: Service Name */}
            <h4 style={{ flex: 1, fontSize: '15px', fontWeight: '500', margin: 0, paddingRight: '15px' }}>
              {item.service}
            </h4>

            {/* Middle: Quantity Controller (matching your ServiceCard style) */}
            <div style={{ width: '80px', height: '36px', border: '1px solid #c9c9c9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', background: '#f5f5f5', color: '#6f36da', cursor: 'pointer' }}>
              <LuMinus size="13" onClick={() => decreaseQty(item.service)} />
              <span style={{ color: 'black', fontWeight: '600', fontSize: '14px' }}>{item.qty}</span>
              <LuPlus size="13" onClick={() => increaseQty(item.service)} />
            </div>

            {/* Right: Price formatting */}
            <div style={{ width: '80px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '15px', fontWeight: '600' }}>
                ₹{getActivePrice(item) * item.qty}
              </span>
              {item.offer && item.offer !== "" && (
                <s style={{ fontSize: '12px', color: '#888' }}>
                  ₹{getOriginalPrice(item) * item.qty}
                </s>
              )}
            </div>
            
          </div>
        ))}
      </div>

      {/* Checkout/View Cart Button */}
      <button 
        style={{ 
          width: '100%', 
          background: '#6f36da', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          padding: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '16px', fontWeight: '700' }}>₹{totalAmount}</span>
          {totalOriginal > totalAmount && (
            <s style={{ fontSize: '12px', opacity: 0.8 }}>₹{totalOriginal}</s>
          )}
        </div>
        <span style={{ fontSize: '16px', fontWeight: '700' }}>View Cart</span>
      </button>

    </div>
  );
}