import { useStyles } from "./StatCard.css";
export default function StatCard({data})

{
   const showData=()=>{
    return data.map((item)=>{
        return(<div className={classes.box} >
        <div className={classes.heading} >{item.heading}</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'30px'}} ><div className={classes.number} >{item.number}</div><img src={item.graph} loading="lazy" className={classes.chart} /></div>
        <div className={classes.day} ><img src={item.updown} loading="lazy" style={{width:'14px'}} /><strong>{item.percent}</strong></div>
    </div>)
    })
   } 
   var darkmode=false
   const classes=useStyles(darkmode)
    return(
        <div style={{width:'100%',display:'flex'}}>
            {showData()}
        </div>
    )
}