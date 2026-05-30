import React from 'react'
import { MdCheck } from "react-icons/md";
import styles from "./promise.module.css"

export default function Promise() {
  return (
    <div className={styles.maindiv} >
      <div className={styles.cont}>
        <h4>WC Promise</h4>
        <p className={styles.promise}  ><MdCheck size="20" />Verifies Professionals</p>
        <p  className={styles.promise}  ><MdCheck size="20" />Hassle Free Booking</p>
        <p  className={styles.promise} ><MdCheck size="20" />Transparent Pricing</p>
      </div>
      <img src="stamp.png" className={styles.image} />
    </div>
  )
}
