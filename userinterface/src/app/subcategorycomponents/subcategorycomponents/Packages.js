"use client"
import React from 'react'
import ServiceCard from './ServiceCard'

const  data=[
  {name:'Super saver packages',subcategory:[{typeofservice:'Foam-jet service (2ACs)',amount:'1290',offer:'1198',timeservice:'1 hr 30 mins',picture:'ac service.png',include:['Applicable for both window & split ACs','Indoor unit deep cleaning with foam & jet spray']},{typeofservice:'Foam-jet service (3ACs)',amount:'1647',offer:'1290',timeservice:'2 hr 15 mins',picture:'foam-jet-service.jpg',include:[]},{typeofservice:'Foam-jet service (4ACs)',amount:'1996',offer:'2596',timeservice:'3 hr',picture:'foam-jet-service.jpg',include:[]},{typeofservice:'Foam-jet service (5ACs)',amount:'3245',offer:'2495',timeservice:'3 hr 45 mins',picture:'foam-jet-service.jpg',include:[]}]},
  {name:'Service',subcategory:[{typeofservice:'Foam-jet service (2ACs)',amount:'1290',offer:'1198',timeservice:'1 hr 30 mins',picture:'service.jpg',include:['Applicable for both window & split ACs','Indoor unit deep cleaning with foam & jet spray']}]},
  {name:'Repair & gas refill',subcategory:[{typeofservice:'AC repair',amount:'299',offer:'',timeservice:'',picture:'ac service.png',include:['Complete check-up to identify issues before repair']},{typeofservice:'Gas refill & check-up',amount:'',offer:'',timeservice:'2 hr 30 mins',picture:'foam-jet-service.jpg',include:[]}]},
  {name:'Installation/uninstallation',subcategory:[{typeofservice:'AC installation',amount:'799',offer:'',timeservice:'',picture:'ac service.png',include:['Installation of indoor & outdoor units with free gas check']},{typeofservice:'AC uninstallation',amount:'599',offer:'',timeservice:'',picture:'foam-jet-service.jpg',include:['Uninstallation of both indoor & outdoor units']}]},
]

export default function Packages({cartItem,setCartItem}) {

  const fillData=()=>{
    return data.map((item,i)=>{
      return(<div key={i} style={{height:'auto'}} >
        <p style={{fontSize:'27px',fontWeight:'700'}} >{item.name}</p>
     {item.subcategory.map((item,i)=>{
      return(
      <ServiceCard data={item} key={i} cartItem={cartItem} setCartItem={setCartItem} />
      )
    })}
    <div style={{width:'100%',height:'3px',background:'#eee',borderRadius:'10px'}} ></div>
  </div>)
    })
  }

  return (
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',gap:'30px',padding:'20px'}} >
        {fillData()}
    </div>
  )
}
