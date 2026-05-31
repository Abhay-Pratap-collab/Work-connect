"use client";
import { Box, Typography, Paper, Grid } from '@mui/material';
import styles from "./CategoryComponent.module.css"
import { serverURL } from '@/app/fetchserver/FetchServer';
import { useRouter } from 'next/navigation';
export default function CategoryComponent({ data }) {
    const router = useRouter()
    const check = (id) => {
        // alert(`hii ${categoryname}`)
        router.push(`/subcategory/${id}`)
    }
    return (
        <div className={styles.mainContainer}>
            <Grid container spacing={7} sx={{ padding: 2, }}>

                {data.map((item) => (

                    <Grid item={"true"} key={item.categoryname} xs={4} sm={6} md={1.2}>
                        <Box onClick={() => check(item.categoryid)}
                            className={styles.clickableItem}
                        >
                            <Paper variant="outlined" className={styles.iconBox}>


                                <span style={{ fontSize: '2rem' }}><img src={`${serverURL}/images/${item.icon}`} style={{ width: "30px" }} /></span>
                            </Paper>
                            <Typography variant="caption" align="center" sx={{ fontWeight: 500 }}>
                                {item.categoryname}
                            </Typography>
                        </Box>
                    </Grid>
                ))}

            </Grid>
        </div>
    )

}