"use client";

import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,

    Radio,
    Button,
    Grid,
} from "@mui/material";
import styles from "./address.module.css"

import ScheduleIcon from '@mui/icons-material/Schedule';
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { serverURL, postData, getData } from '@/app/fetchserver/FetchServer'
import BoltIcon from "@mui/icons-material/Bolt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
export default function Slot({ disabled, setSlotBooked, }) {
    const [serviceType, setServiceType] = useState("schedule");
    const [weekDay, setWeekDay] = useState("");
    const [date, setDate] = useState("")
    const [month, setMonth] = useState("")
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [slot, setSlot] = useState("");
    const [showSlot, setShowSlot] = useState('')
    const [selectedSlot, setSelectedSlot] = useState("");
    const [instantService, setIntantService] = useState(false)
    const [experts, setExperts] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    var product = useSelector((state) => state.product)
    var cartItems = Object.values(product)
    const categoryId = cartItems[0]?.categoryid;
    const subcategoryId = cartItems[0]?.subcategoryid;

    // console.log("Category ID:", categoryId);
    // console.log("Subcategory ID:", subcategoryId);
    useEffect(() => {

        const fetchExperts = async () => {

            const response = await getData("experts/fetch_experts");

            console.log("Expert response:", response);

            if (response.status) {
                setExperts(response.data);
            }
        };

        fetchExperts();

    }, []);
    const matchingExperts = experts.filter(
        (expert) =>
            expert.categoryid == categoryId &&
            expert.subcategoryid == subcategoryId
    );


    const slots = [
        "08:00 AM",
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM",
        "05:30 PM",
        "06:00 PM",
        "06:30 PM",
        "07:00 PM",
        "07:30 PM",
    ];



    const dates = Array.from({ length: 3 }, (_, index) => {
        const d = new Date();
        d.setDate(d.getDate() + index + 1);

        return {
            day: d.toLocaleDateString("en-US", {
                weekday: "short",
            }),
            date: d.getDate(),
            month: d.toLocaleDateString("en-US", {
                month: "short",
            }),
        };
    });
    const handleSlot = () => {
        setSlot(`${weekDay}, ${month} ${date} - ${selectedSlot}`)
        handleClose()
    }

    const handleDate = (i, day, month, date) => {
        setSelectedDate(i)
        setWeekDay(day)
        setDate(date)
        setMonth(month)
    }
    const handleClose = () => {
        setOpen(false);
    }
    console.log("open:", open);



    const SelectExperts = () => {
        return (
            <div style={{ padding: "20px", }}>

                <h2>Select Expert</h2>

                {matchingExperts.length === 0 ? (
                    <p>No expert available for this service.</p>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "15px"
                        }}
                    >
                        {matchingExperts.map((expert) => {

                            const isSelected =
                                selectedExpert === expert.expertid;

                            return (
                                <div
                                    key={expert.expertid}
                                    onClick={() =>
                                        setSelectedExpert(expert.expertid)
                                    }
                                    style={{
                                        width: "120px",
                                        padding: "12px",
                                        borderRadius: "10px",
                                        cursor: "pointer",

                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",

                                        border: isSelected
                                            ? "2px solid #6E42E5"
                                            : "1px solid #ddd",

                                        background: isSelected
                                            ? "#f0ebff"
                                            : "#fff",

                                        transition: "0.2s"
                                    }}
                                >

                                    {/* IMAGE */}
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "65px",
                                            height: "65px"
                                        }}
                                    >
                                        <img
                                            src={`${serverURL}/images/${expert.photograph}`}
                                            alt={`${expert.firstname} ${expert.lastname}`}
                                            style={{
                                                width: "65px",
                                                height: "65px",
                                                borderRadius: "50%",
                                                objectFit: "cover",

                                                filter: isSelected
                                                    ? "brightness(0.7)"
                                                    : "brightness(1)"
                                            }}
                                        />

                                        {/* TICK */}
                                        {isSelected && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
                                                    width: "24px",
                                                    height: "24px",
                                                    borderRadius: "50%",
                                                    background: "#6E42E5",
                                                    color: "white",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontWeight: "bold",
                                                    border: "2px solid white"
                                                }}
                                            >
                                                ✓
                                            </div>
                                        )}
                                    </div>

                                    {/* NAME */}
                                    <h3
                                        style={{
                                            margin: "8px 0 0",
                                            fontSize: "15px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {expert.firstname} {expert.lastname}
                                    </h3>

                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        );
    };
    const selectedExpertData = matchingExperts.find(
        (expert) => Number(expert.expertid) === Number(selectedExpert)
    );
    const Call = () => {

        return (
            <div>

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        fontSize: 24,
                    }}
                >
                    {selectedExpertData
                        ? `When should the professional ${selectedExpertData.firstname} ${selectedExpertData.lastname} arrive?`
                        : "When should the professional arrive?"
                    }
                </DialogTitle>



                <DialogContent>
                    <div>


                        <div
                            style={{
                                padding: "15px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                pointerEvents: !instantService ? "none" : "auto", opacity: !instantService ? 0.5 : 1,
                                border: "1px solid #ddd",
                            }}
                            onClick={() => setServiceType("instant")}
                        >
                            <div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        background: "#f1f1f1",
                                        padding: "3px 2px",
                                        borderRadius: "5px",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <BoltIcon
                                        sx={{
                                            fontSize: 14,
                                            mr: 0.5,
                                            color: "#999",
                                        }}
                                    />

                                    <p style={{ fontSize: "14px", fontWeight: "600" }}>Instant</p>
                                </div>

                                <p style={{ fontSize: "16px", fontWeight: "600" }}>In 60 mins</p>
                                {!instantService ?
                                    <p style={{ fontSize: "12px", color: "#d17014", marginTop: "5px", opacity: 1 }}>
                                        Unavailable at the moment
                                    </p>
                                    : ""}
                            </div>

                            <Radio checked={serviceType === "instant"} />
                        </div>

                        <div
                            style={{
                                padding: "15px",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setServiceType("schedule")}
                            >
                                <div>
                                    <p style={{ fontSize: "15px", fontWeight: "600" }}>
                                        Schedule for later
                                    </p>

                                    <p style={{ fontSize: "13px", color: "grey", marginTop: '5px' }}>
                                        Select your preferred day & time
                                    </p>
                                </div>

                                <Radio checked={serviceType === "schedule"} />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    marginBottom: "20px",
                                    marginTop: "20px",
                                }}
                            >
                                {dates.map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleDate(index, item.day, item.month, item.date)}
                                        variant={selectedDate === index ? "contained" : "outlined"}
                                        sx={{
                                            minWidth: 65,
                                            height: 65,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            bgcolor: selectedDate === index ? "#F3EEFF" : "#fff",
                                            color: selectedDate === index ? "#6C3BFF" : "#444",
                                            border:
                                                selectedDate === index
                                                    ? "1px solid #6C3BFF"
                                                    : "1px solid #ddd",

                                            "&:hover": {
                                                bgcolor: selectedDate === index ? "#F3EEFF" : "#fafafa",
                                            },
                                        }}
                                    >
                                        <p style={{ fontSize: "13px" }}>{item.day}</p>

                                        <p style={{ fontSize: "16px", fontWeight: "600" }}>
                                            {item.date}
                                        </p>
                                    </Button>
                                ))}
                            </div>

                            <div
                                style={{
                                    background: "#F5F5F5",
                                    padding: "16px",
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    marginBottom: "10px",
                                }}
                            >
                                <CreditCardIcon
                                    sx={{
                                        color: "#555",
                                        fontSize: 22,
                                    }}
                                />

                                <p style={{ fontSize: "15px" }}>
                                    Online payment only for selected date
                                </p>
                            </div>

                            <p
                                style={{
                                    fontWeight: "500",
                                    fontSize: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                Select start time of service
                            </p>

                            <Grid container spacing={2}>
                                {slots.map((slot) => (
                                    <Grid xs={4} key={slot}>
                                        <Button
                                            fullWidth
                                            onClick={() => setSelectedSlot(slot)}
                                            variant={selectedSlot === slot ? "contained" : "outlined"}
                                            sx={{
                                                height: 50,
                                                borderRadius: 2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                bgcolor: selectedSlot === slot ? "#6C3BFF" : "#fff",
                                                color: selectedSlot === slot ? "#fff" : "#000",

                                                "&:hover": {
                                                    bgcolor: selectedSlot === slot ? "#6C3BFF" : "#fafafa",
                                                },
                                            }}
                                        >
                                            {slot}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>

                            <div
                                style={{
                                    marginTop: "10px",
                                    position: "sticky",
                                    bottom: 0,
                                    backgroundColor: "#fff",
                                    paddingTop: 2,
                                    paddingBottom: 1,
                                }}
                            >
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    disabled={serviceType === "schedule" && !selectedSlot}
                                    // onClick={handleSlot}
                                    onClick={() => {
                                        setShowSlot(`${weekDay}, ${month} ${date} - ${selectedSlot}`);
                                        setOpen(false)
                                        setSlotBooked(true)

                                    }}

                                    sx={{
                                        height: 56,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 700,
                                        bgcolor: "#6C3BFF",

                                        "&:hover": {
                                            bgcolor: "#5b2ee6",
                                        },

                                        "&.Mui-disabled": {
                                            bgcolor: "#ddd",
                                            color: "#999",
                                        },
                                    }}
                                >
                                    Proceed to checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>

            </div>
        );
    }
    return (
        <div>


            <div className={styles.addressCard}>
                <div className={styles.addressHeader}>
                    <div className={styles.iconContainer}>
                        <ScheduleIcon sx={{ color: "#666", fontSize: 22 }} />
                    </div>

                    <p className={styles.headingCss}>Slot</p>


                </div>
                <p>{showSlot}</p>

                {
                    !disabled && (


                        <Button
                            variant="contained"
                            fullWidth


                            onClick={() => {

                                setOpen(true);

                            }}

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
                            Select Data & Time
                        </Button>
                    )
                }

                <Dialog
                    slotProps={{
                        paper: {
                            sx: {
                                width: 550,
                                height: 650,
                                borderRadius: 3,
                            },
                        },
                    }}
                    open={open}
                    onClose={() => setOpen(false)}


                >
                    <SelectExperts />
                    <Call />
                </Dialog>


            </div>

        </div>


    )

}