



"use client";
import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { LuMinus, LuPlus } from 'react-icons/lu';
import styles from "./price.module.css"
import { serverURL } from '@/app/fetchserver/FetchServer';

// Keep your existing static arrays here
const packages = [
    {
        "id": "foam-jet-2ac",
        "title": "Foam-jet service (2 ACs)",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 1298,
        "originalPrice": 1396,
        "perUnitMetric": "₹649 per AC",
        "duration": "1 hr 30 mins",
        "badge": null,
        "image": "ac service.png",
        "highlights": [
            "Applicable for both window or split ACs",
            "Indoor unit deep cleaning with foam & jet spray"
        ]
    },
    {
        "id": "foam-jet-3ac",
        "title": "Foam-jet service (3 ACs)",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 1797,
        "originalPrice": 2097,
        "perUnitMetric": "₹599 per AC",
        "duration": "2 hrs 15 mins",
        "badge": "Free gas check",
        "image": "ac service.png",
        "highlights": [
            "Deep cleaning of 3 indoor units",
            "Includes a comprehensive gas pressure evaluation"
        ]
    },
    {
        "id": "foam-jet-4ac",
        "title": "Foam-jet service (4 ACs)",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 2196,
        "originalPrice": 2796,
        "perUnitMetric": "₹549 per AC",
        "duration": "3 hrs",
        "badge": "Free gas check",
        "image": "ac service.png",
        "highlights": [
            "Best value pack for larger homes",
            "Jet pump power wash filter cleaning"
        ]
    },
    {
        "id": "foam-jet-5ac",
        "title": "Foam-jet service (5 ACs)",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 2196,
        "originalPrice": 2796,
        "perUnitMetric": "₹549 per AC",
        "duration": "3 hrs",
        "badge": "Free gas check",
        "image": "ac service.png",
        "highlights": [
            "Best value pack for larger homes",
            "Jet pump power wash filter cleaning"
        ]
    }
]
const services = [
    {
        "id": "foam-jet",
        "title": "Foam-jet service",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 'start at 699',
        "perUnitMetric": "Add more & save up to 21%",
        "highlights": [
            "Applicable for both window or split ACs",
            "Indoor unit deep cleaning with foam & jet spray"
        ]
    }
]
const repair = [
    {
        "id": "Ac repair",
        "title": "AC repair",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 'start at 699',
        "image": "acrepair.png",
        "highlights": [
            "Complete check up to identify issues before repair",
        ]
    },
    {
        "id": "Gas refil",
        "title": "Gas refill & check-up",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "duration": "3 hrs",
        "image": "ac service.png",
        "highlights": [
            "Complete check up to identify issues before repair",
        ]
    }
]
const Installation = [
    {
        "id": "ac install",
        "title": "AC installation",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 'start at 699',
        "image": "ac service.png",
        "highlights": [
            "Installation of indoor & outdoor units with free gas check",
        ]
    },
    {
        "id": "ac uninstallation",
        "title": "AC uninstallation",
        "rating": 4.76,
        "totalReviews": "2.6M reviews",
        "price": 'start at 699',
        "image": "ac service.png",
        "highlights": [
            "Uninstallation of both indoor & outdoor units ",
        ]
    }
]

// 1. Accept the props passed down from subcategory.js
export default function PriceComponent({data, cartItem, setCartItem }) {

    // 2. Cart Handlers matching the structure Cart.js expects
    const handleCart = (item) => {
        // Parse price just in case it says "starts at 699"
        const amountNum = typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/\D/g, '')) || 0;

        setCartItem((prev) => [
            ...prev,
            { service: item.title, amount: amountNum, offer: item.originalPrice || "", qty: 1 }
        ]);
    }

    const increaseQty = (title) => {
        setCartItem((prev) =>
            prev.map((item) =>
                item.service === title ? { ...item, qty: item.qty + 1 } : item
            )
        );
    }

    const decreaseQty = (title) => {
        setCartItem((prev) =>
            prev.map((item) =>
                item.service === title ? { ...item, qty: item.qty - 1 } : item
            ).filter(item => item.qty > 0)
        );
    }

    // 3. Reusable UI Row to avoid copying JSX 4 times
    const ItemRow = ({ item, index }) => {
        // Check if item exists in cart
        const exist = cartItem?.find((cartI) => cartI.service === item.title);

        return (
            <Box key={item.id} className={styles.itemRow}>
                <Box className={styles.itemRowContent}>

                    {/* Left Content Side */}
                    <Box className={styles.leftContent}>
                        <Typography variant="h6" className={styles.itemTitle}>
                            {item.title}
                        </Typography>

                        <Box className={styles.ratingBlock}>
                            <StarIcon sx={{ fontSize: 16, color: '#4b39b3' }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px' }}>
                                {item.rating}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                ({item.totalReviews})
                            </Typography>
                        </Box>

                        <Box className={styles.priceBlock}>
                            <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>
                                {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                            </Typography>
                            {item.originalPrice && (
                                <Typography sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '13px' }}>
                                    ₹{item.originalPrice}
                                </Typography>
                            )}
                            {item.duration && (
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    • {item.duration}
                                </Typography>
                            )}
                        </Box>

                        {item.perUnitMetric && (
                            <Box className={styles.perUnitBadge}>
                                <Typography >
                                    {item.perUnitMetric}
                                </Typography>
                            </Box>
                        )}

                        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                        <Box component="ul" sx={{ p: 0, m: 0, pl: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {item.highlights.map((text, i) => (
                                <Typography key={i} component="li" variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
                                    {text}
                                </Typography>
                            ))}
                        </Box>

                        <Typography variant="caption" className={styles.viewDetails}>
                            View details
                        </Typography>
                    </Box>

                    {/* Right Interactive Image Side */}
                    <Box className={styles.rightContent}>
                        {item.image && (
                            <Paper variant="outlined" className={styles.imageWrapper}>
                                {item.badge && (
                                    <Box className={styles.imageBadge}>
                                        {item.badge}
                                    </Box>
                                )}
                                <img src={`${serverURL}/images/${item.image}`} alt={item.title} className={styles.itemImage} />
                            </Paper>
                        )}

                        {/* Interactive Add/Qty Button Wrapper */}
                        <Box sx={{
                            position: 'absolute',
                            bottom: index === 0 && !item.image ? 'auto' : -15,
                            top: index === 0 && !item.image ? 5 : 'auto',
                            right: index === 0 && !item.image ? 20 : 'auto',
                            zIndex: 10
                        }}>
                            {exist?.qty > 0 ? (
                                <div className={styles.qtyController}>
                                    <LuMinus size="13" onClick={() => decreaseQty(item.title)} />
                                    <span style={{ fontWeight: 'bold' }}>{exist?.qty || 0}</span>
                                    <LuPlus size="13" onClick={() => increaseQty(item.title)} />
                                </div>
                            ) : (
                                <Button
                                    onClick={() => handleCart(item)}
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        bgcolor: '#fff',
                                        color: '#4b39b3',
                                        fontWeight: 700,
                                        border: '1px solid #e0e0e0',
                                        px: 3,
                                        borderRadius: '5px',
                                        boxShadow: 'none', // Removes default shadow
                                        '&:hover': {
                                            bgcolor: '#fff', // Keeps background white on hover
                                            boxShadow: 'none', // Prevents shadow from appearing on hover
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.mainContainer}>

                {/* Section 1 */}
                <Box className={`${styles.sectionContainer} ${styles.sectionContainerFirst}`}>
                    <h1 className={styles.sectionHeading}>Super saver packages</h1>
                    <Box><img src={`${serverURL}/images/ac service.png`} className={styles.coverImage} alt="cover" /></Box>
                    {packages.map((item, index) => <ItemRow key={item.id} item={item} index={index} />)}
                </Box>

                {/* Section 2 */}
                <Box className={styles.sectionContainer}>
                    <h1 className={styles.sectionHeading}>Service</h1>
                    <Box><img src={`${serverURL}/images/ac service.png`} className={styles.coverImage} alt="cover" /></Box>
                    {services.map((item, index) => <ItemRow key={item.id} item={item} index={index} />)}
                </Box>

                {/* Section 3 */}
                <Box className={styles.sectionContainer}>
                    <h1 className={styles.sectionHeading}>Repair & gas refill</h1>
                    {repair.map((item, index) => <ItemRow key={item.id} item={item} index={index} />)}
                </Box>

                {/* Section 4 */}
                <Box className={styles.sectionContainer}>
                    <h1 className={styles.sectionHeading}>Installation/uninstallation</h1>
                    {Installation.map((item, index) => <ItemRow key={item.id} item={item} index={index} />)}
                </Box>

            </div>
        </div>
    )
}