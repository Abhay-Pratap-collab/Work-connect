import { colors, Grid } from "@mui/material";
import FeatureItem from "./smallReusableComponents/FeatureItem";

export default function Feature()
{
    return(<div style={{width:'500px',height:'auto'}}>
        <Grid container spacing={3.2}>
            <Grid size={12}>
                <FeatureItem image="logo.png" heading="Workconnect" ></FeatureItem>

            </Grid>
            <Grid size={12} >
                <FeatureItem image="setting.png" heading="Adaptable performance" text="Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks."/>
            </Grid>
            <Grid size={12} >
                <FeatureItem image="support.png" heading="Built to last" text="Experience unmatched durability that goes above and beyond with lasting investment."/>
            </Grid>
            <Grid size={12} >
                <FeatureItem image="like.png" heading="Great user experience" text="Integrate our product into your routine with an intuitive and easy-to-use interface."/>
            </Grid>
            <Grid size={12} >
                <FeatureItem image="rocket.png" heading="Innovative functionality" text="Stay ahead with features that set new standards, addressing your evolving needs better than the rest."/>
            </Grid>
        </Grid>    
        </div>)
}