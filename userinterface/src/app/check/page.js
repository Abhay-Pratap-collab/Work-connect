"use client";

import styles from "./check.module.css";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useSelector } from "react-redux";

import { FaPercentage } from "react-icons/fa";
import PlusMinus from "../subcategorycomponents/subcategorycomponents/PlusMinus ";

export default function Check() {
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    return (
        <div className={styles.card}>
            <h2 className={styles.heading}>
                AC Service and Repair
            </h2>

            {cartItems.map((item, index) => (
                <div key={index}>

                    <div className={styles.serviceItem}>

                        <div className={styles.left}>

                            <p className={styles.serviceName}>
                                {item.typesofservices}
                            </p>

                        </div>

                        <div className={styles.middle}>

                            <PlusMinus
                                refresh={refresh}
                                setRefresh={setRefresh}
                                data={item}
                                qty={item.qty}
                            />

                        </div>

                        <div className={styles.right}>

                            <p className={styles.price}>
                                ₹
                                {item.offer > 0
                                    ? (item.amount - item.offer) * item.qty
                                    : item.amount * item.qty}
                            </p>

                            {item.offer > 0 && (
                                <s className={styles.oldPrice}>
                                    ₹{item.amount * item.qty}
                                </s>
                            )}

                        </div>

                    </div>

                    {index !== cartItems.length - 1 && (
                        <div className={styles.divider}></div>
                    )}

                </div>
            ))}

            <div className={styles.checkboxRow}>

                <Checkbox
                    size="small"
                    defaultChecked
                />

                <span className={styles.checkboxText}>
                    Avoid calling before reaching the location
                </span>

            </div>

        </div>
    );
}