import styles from "./address.module.css"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRazorpay } from "react-razorpay";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function PaymentCard({ slotBooked }) {
    var users = useSelector((state) => state.users)
    const user = Object.values(users)[0];
    const userData = Object.values(users)[0]
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    const itemTotal = cartItems.reduce(
        (sum, item) => sum + item.amount * item.qty,
        0
    );

    const offerTotal = cartItems.reduce(
        (sum, item) => sum + item.offer * item.qty,
        0
    );

    const amountToPay = itemTotal - offerTotal;
    const handlePayment = () => {

        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH", // Your Razorpay Key ID

            amount: amountToPay * 100, // ₹500 (amount is in paise)

            currency: "INR",

            name: "My Company",

            description: "Service Booking",

            image: "https://your-logo-url.com/logo.png",

            handler: function (response) {

                alert("Payment Successful");

                console.log(response);
                /*
                response.razorpay_payment_id
                response.razorpay_order_id
                response.razorpay_signature
                */
            },

            prefill: {
                name: userData?.mobileno,
                email: "abhay@gmail.com",
                contact: userData?.mobileno,
            },

            notes: {
                address: "Customer Address",
            },

            theme: {
                color: "#6E42E5",
            },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    };


    return (
        <div className={styles.addressCard}>
            <div className={styles.addressHeader}>
                <div className={styles.iconContainer}>
                    < AccountBalanceWalletIcon sx={{ color: "#666", fontSize: 22 }} />
                </div>
                <p className={styles.headingCss}>
                    Payment Method</p>
            </div>
            {slotBooked && (


                <Button
                    variant="contained"
                    fullWidth
                    // disabled
                    // onClick={() => {

                    //     setOpen(true);
                    // }}
                    onClick={handlePayment}

                    sx={{
                        mt: 2,
                        height: 48,
                        background: "#6E42E5",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "16px",

                        fontWeight: 600,

                    }}

                >
                    payment kriye
                </Button>
            )}


        </div>
    )
}