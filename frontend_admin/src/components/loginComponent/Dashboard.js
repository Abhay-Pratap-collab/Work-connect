import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import {
  MdApps,
  MdShoppingBag,
  MdAnalytics,
  MdAccountBalance,
  MdBookOnline,
  MdInsertDriveFile,
  MdSchool,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import { serverURL } from "../../services/FetchNodeServices";
import { useRef, useState,useEffect } from "react";
import AppDashboard from "./AppDashBoard";
import DisplayAll from "../cityComponent/DisplayAll";
import DisplayAllCity from "../cityComponent/DisplayAllCity";
import City from "../cityComponent/City";
import Place from "../placeComponent/Place"
import DisplayAllPlace from "../placeComponent/DisplayAllPlace";
import Category from "../categoryComponent/Category";
import Subcategory from "../SubCategoryComponent/Subcategory";
import Expert from "../Experts/Experts";
import { BrowserRouter as Router,Routes,Route } from "react-router";
import DisplayAllCategory from "../categoryComponent/DisplayAllCategory";
import DisplayAllSubcategory from "../SubCategoryComponent/DisplayAllSubcategory"
import DisplayExperts from "../Experts/DisplayExperts";
import Includes from "../includesComponent/Includes"
import DisplayAllIncludes from "../includesComponent/DisplayAllIncludes";
import Login from "../LoginComponent/Login"

import { useNavigate } from "react-router";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("App");
    const navigate=useNavigate()
      useEffect(()=>{
        navigate('/dashboard/appdashboard')
      },[])
  
  const menuItems = [
    { name: "App", icon: <MdApps size={25}/>,link:'/dashboard/AppDashboard' },
    { name: "Cities", icon: <MdShoppingBag size={25} />,link:'/dashboard/displayallcity' },
    { name: "Place", icon: <MdAnalytics size={25} />,link:'/dashboard/displayallplace' },
    { name: "Category", icon: <MdAccountBalance size={25} />,link:'/dashboard/displayallcategory' },
    { name: "Sub Category", icon: <MdBookOnline size={25} />,link:'/dashboard/displayallsubcategory' },
    { name: "Expert", icon: <MdInsertDriveFile size={25} />,link:'/dashboard/displayallexpert' },
    { name: "Includes", icon: <MdSchool size={25} />,link:'/dashboard/displayallincludes' },
    { name: "Logout", icon: <MdSchool size={25} />,link:'/dashboard/adminlogin' },
  ];

  const expandedMenu=()=>{
    return(<div style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "20vh",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              paddingLeft: 20,
              
            }}
          >
            <img src="/logo.png" style={{ width: 70 }} />
          </div>
          {menuItems.map((item) => {
            return (
              <div
                onClick={() => setActive(item.name)}
                style={{
                  width: "80%",
                  height: "6vh",
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    color: active == item.name ? "#037338" : "#5f5959",
                    background: active == item.name ? "#d8f2e4" : "transparent",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 5,
                    cursor:'pointer',
                    
                  }}
                  onClick={()=>navigate(item.link)}
                >
                  <span>{item.icon}</span>

                  <span
                    style={{
                      marginLeft: 10,
                      overflow: "hidden",
                      color: "green",
                      display: "-webkit-box",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      flex: "1 1 auto",
                      fontSize: "1rem",
                      lineHeight: 1.57143,
                      fontWeight: 600,
                      color: "grey",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>)
  }

const collapsedMenu=()=>{
    return(<div style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "20vh",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              paddingLeft: 20,
              
            }}
          >
            <img src="/logo.png" style={{ width: 38 }} />
          </div>
          {menuItems.map((item) => {
            return (
              <div
                onClick={() => setActive(item.name)}
                style={{
                  width: "80%",
                  height: "6vh",
                  marginLeft: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    color: active == item.name ? "#037338" : "#5f5959",
                    background: active == item.name ? "#d8f2e4" : "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 5,
                    flexDirection:'column'
                    
                  }}
                >
                  <span>{item.icon}</span>

                  <span
                    style={{
                     
                      overflow: "hidden",
                      color: "green",
                      display: "-webkit-box",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      flex: "1 1 auto",
                      fontSize: "0.625rem",
                      lineHeight: 1.57143,
                      fontWeight: 600,
                      color: "grey",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>)
  }
  


  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          transition: "0.3s",
          position: "relative",
          width: collapsed ? "6%" : "15%",
          height: "100vh",
          background: "#fff",
          borderRight: "0.2px solid #cec9c9",
        }}
      >
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: 30,
            height: 30,
            borderRadius: 15,
            border: "0.2px solid #cec9c9",
            background: "#fff",
            top: "8%",
            right: collapsed ? "-18%" : "-7%",
          }}
        >
          {collapsed ? (
            <IoIosArrowForward
              style={{
                color: " #637381",
                fontSize: "1.125rem",
                fontWeight: 100,
              }}
            />
          ) : (
            <IoIosArrowBack
              style={{
                color: " #637381",
                fontSize: "1.125rem",
                fontWeight: 100,
              }}
            />
          )}
        </div>
        {collapsed?collapsedMenu():expandedMenu()}

        
      </div>
      <div style={{margin:10,width:'80%'}}>
        <Routes>
      <Route element={<Dashboard/>} path="/dashboard"/>
     
      <Route element={<City/>} path="/city"></Route>
      <Route element={<DisplayAll/>} path="/displayall"></Route>
      <Route element={<DisplayAllCity/>} path="/displayallcity"></Route>
      <Route element={<Place/>} path="/place"></Route>
      
      <Route element={<DisplayAllPlace/>} path="/displayallplace"></Route>
      <Route element={<Category />} path="/category" />
        <Route element={<DisplayAllCategory />} path="/displayallcategory" />

        <Route element={<Subcategory />} path="/subcategory" />
        <Route element={<DisplayAllSubcategory />} path="/displayallsubcategory" />

        <Route element={<Expert />} path="/expert" />
        <Route element={<DisplayExperts />} path="/displayallexpert" />
        <Route element={<Includes />} path="/includes" />
        {/* <Route element={<DisplayAllIncludes/>} path="displayallinludes"/> */}
              <Route element={<DisplayAllIncludes/>} path="/displayallincludes"/>
              <Route element={<AppDashboard/>} path="/AppDashboard"/>
                    <Route element={<Login/>} path="/adminlogin"/>
              

        


    </Routes>
 
      </div>
    </div>
  );
}

