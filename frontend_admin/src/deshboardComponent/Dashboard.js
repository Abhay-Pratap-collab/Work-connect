import StatCard from "./StatCard"
import Overview from "./Overview"; // Correct
import Menubar from "./Menubar";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import { Grid } from "@mui/material";

// import Grid from '@mui/material/Grid'; // Ensure this is imported

export default function Dashboard() {
  var data = [
    { heading: "Total active users", number: 18765, graph: 'upgraph.png', updown: 'increase.png', percent: '+2.6% last 7 days' },
    { heading: "Total installed", number: 4876, graph: 'midgraph.png', updown: 'increase.png', percent: '+2.6% last 7 days' },
    { heading: "Total downloads", number: 678, graph: 'downgraph.png', updown: 'decrease.png', percent: '+2.6% last 7 days' }
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <Overview />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        overflowY: 'auto', 
        background: '#f4f6f8' // Changed red to a clean dashboard grey
        // background:'red'
      }}>
        <Menubar />
        

        <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
          
          {/* 1. THE GRID CONTAINER: This MUST wrap the items to make them horizontal */}
          <Grid container spacing={3}>
            
            {/* Component 1 (Wide) */}
          <Grid size={{xs:12,md:7}}>
            <div
style={{ background: '#004b50', borderRadius: '16px', color: 'white',  }}

          >

           <SecondComponent/>
            </div>

          </Grid>
          <Grid size={{xs:12,md:5}}>
            <div 
           style={{ background: 'black', borderRadius: '16px',  }} 
            >

            <FirstComponent/>
            </div>
          </Grid>
          <Grid size={12}>
            <StatCard data={data}/>

          </Grid>

          </Grid>

        </div>
      </div>
    </div>
  );
}