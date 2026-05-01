import MaterialTable from "@material-table/core";
import { getData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { useStyles } from "./DisplayAllCss";

export default function DisplayAll()
{   const classes=useStyles()
     const [cityList,setCityList]=useState([])
    
    useEffect(()=>{
     fetchCityData()

    },[])
    const fetchCityData=async()=>{
    var res=await getData('city/fetch_all_city')
    if(res.status)
    {
        setCityList(res.data)
    }
    else
    {
        alert(res.message)
    }
}
const showCity=()=>{
    return(<MaterialTable
    title="List of Cities"
    columns={[{title:"CityId",field:'cityid'},
        {title:"City Name",field:'cityname'},
        {title:"Image",render:(rowItem)=> <div><img src={`${serverURL}/images/${rowItem.cityicon}`}style={{width:"40px"}} /></div>},
    ]}
    data={cityList}
    />)
}




    return(<div className={classes.root}>
        <div className={classes.box}>

    {showCity()}
        </div>
    </div>)
}