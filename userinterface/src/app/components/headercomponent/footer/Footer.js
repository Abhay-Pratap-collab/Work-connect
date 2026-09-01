
"use client";

import { Grid, Container, Typography, Box } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Footer.module.css"

export default function Footer() {

  // SECTION 1
  const companyData = {
    title: "Company",
    links: [
      "About us",
      "Investor Relations",
      "Terms & conditions",
      "Privacy policy",
    ],
  };

  // SECTION 2
  const customerData = {
    title: "For customers",
    links: [
      "UC reviews",
      "Categories near you",
      "Contact us",
    ],
  };

  // SECTION 3
  const professionalData = {
    title: "For professionals",
    links: [
      "Register as a professional",
    ],
  };

  // SECTION 4
  const socialData = {
    title: "Social links",
    socialIcons: [
      <a href="https://www.instagram.com/accounts/login/?hl=en"> <InstagramIcon /></a>,
      <a href="https://www.facebook.com/"> <FacebookIcon /></a>,
      <TwitterIcon />,
      <LinkedInIcon />,
    ],
  };

  return (
    <footer className={styles.Footer}>
      <div className={styles['main-div']}>

        {/* <Container maxWidth="lg"> */}
        <div>

          <img
            src="abc.png"
            alt=""
            className={styles.logo}
          />
        </div>
        <Grid container spacing={18}
        >

          {/* LOGO */}


          {/* COMPANY */}
          <Grid item={"true"} xs={12} sm={6} md={3}>
          
            <div
          

              className={styles.companyTitle}
            >
              <p>{companyData.title}</p>


              {companyData.links.map((link, i) => (
                <span
                  key={i}
                  style={{
                    color: '#8b8989', fontSize: 14, marginTop: 4, cursor: 'pointer', overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollbarWidth: 'none',
                    transform: 'translateZ(0)',
                  }}
                >
                  {link}
                </span>
              ))}
            </div>
          </Grid>

          {/* CUSTOMERS */}
          <Grid item={"true"} xs={12} sm={6} md={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <h2>{customerData.title}</h2>

              {customerData.links.map((link, i) => (
                <span
                  key={i}
                  style={{
                    color: '#8b8989', fontSize: 14, marginTop: 4, cursor: 'pointer', overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollbarWidth: 'none',
                    transform: 'translateZ(0)',
                  }}
                >
                  {link}
                </span>
              ))}
            </div>
          </Grid>

          {/* PROFESSIONALS */}
          <Grid item={"true"} xs={12} sm={6} md={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <h3>{professionalData.title}</h3>

              {professionalData.links.map((link, i) => (
                <span
                  key={i}
                  className={styles.companyLink}
                >
                  {link}
                </span>
              ))}
            </div>
          </Grid>

          {/* SOCIAL */}
          <Grid item={"true"} xs={12} sm={6} md={3}>
            <div
              className={styles.socialdata}
            >
              <h2>{socialData.title}</h2>

              <div
                className={styles.socialContainer}
              >
                {socialData.socialIcons.map((icon, i) => (
                  <div
                    key={i}
                    className={styles.sociallink}

                  >
                    {icon}
                  </div>
                ))}
              </div>
              
            </div>
            <div style={{marginTop:'10px'}}>

                
                <img src="app.png"  height="34px" />
                

              </div>
               <div>

                
                <img src="playstore.png"  height="70px"/>
                

              </div>
          </Grid>


          <Box className={styles.footerDisclaimerContainer}>
            <Box className={styles.captionText}>

              * As on December 31, 2024
            </Box>

            <Box className={styles.captionText}>
              © Copyright 2026 Urban Company Limited (formerly known as UrbanClap
              Technologies India Limited and UrbanClap Technologies India India Limited)
              All rights reserved. | CIN: L74140DL2014PLC274413

            </Box>



          </Box>
        </Grid>
        {/* </Container> */}
      </div>
    </footer>
  );
}