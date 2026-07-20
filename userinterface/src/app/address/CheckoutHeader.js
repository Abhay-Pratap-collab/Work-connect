import styles from "./address.module.css"
export default function CheckoutHeader()
{
     return (
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <img
                        className={styles.headerImage}
                        src="W.png" ></img>
                    <h4 >Checkout</h4>
                </div>
            </div>
        )
}