"use client"
import { useSelector } from "react-redux"
import PlusMinus from "../subcategorycomponents/subcategorycomponents/PlusMinus "
import { useEffect, useState } from "react"
// import styles from "./check.module.css"
import styles from "./address.module.css"

import { Checkbox } from "@mui/material";
export default function RightCard({ refresh, setRefresh }) {
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    console.log(cartItems)
    const itemTotal = cartItems.reduce(
        (sum, item) => sum + item.amount * item.qty,
        0
    );

    const offerTotal = cartItems.reduce(
        (sum, item) => sum + item.offer * item.qty,
        0
    );

    const amountToPay = itemTotal - offerTotal;

    const fillCart = () => {
        return cartItems.map((item, index) => {

            return (<div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <p className={styles.typeofservice}>{item.typesofservices}</p>
                <div className={styles.plusminus}>
                    <PlusMinus refresh={refresh} setRefresh={setRefresh} data={item} qty={item.qty} />
                </div>
                <div className={styles.amount}>
                    <p>₹{item.offer > 0 ? (item.amount - item.offer) * item.qty : (item.amount) * item.qty}</p>
                    <s style={{ color: 'grey' }} >₹{item.offer == 0 ? 0 : item.amount * item.qty}</s>
                </div>
            </div>)
        })
    }
    return (
        <div>

            <div className={styles.rightColumn}>

                <div className={`${styles.card}`}>
                    <h4>AC Service and Repair</h4>

                    <div style={{ paddingTop: "10px" }}>
                        {fillCart()}
                    </div>
                    <div className={styles.checkboxRow}>

                        <Checkbox
                            sx={{
                                color: "black",
                                "&.Mui-checked": {
                                    color: "black",
                                },
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        />

                        <span className={styles.checkboxText}>
                            Avoid calling before reaching the location
                        </span>

                    </div>
                </div>

            </div>

            <div className={styles.coupon}>
                <p className={styles.couponTextFirst}>Coupons and Offers</p>
                <p className={styles.couponSecond}>Login / Sign up to view offers</p>
            </div>

            <div className={styles.card}>

                <h4 className={styles.paymentHeading}>Payment Summary</h4>

                <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                    <span>Offer</span>
                    <span>-₹{offerTotal}</span>
                </div>

                <hr />

                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", padding: 10 }}>
                    <span>Amount to pay</span>
                    <span>₹{amountToPay}</span>
                </div>

            </div>
            <div className={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", padding: 10 }}>

                    <span>Amount to pay</span>
                    <span>₹{amountToPay}</span>
                </div>


            </div>


        </div>
    );
}