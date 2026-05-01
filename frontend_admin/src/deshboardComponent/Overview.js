import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"

import {
  MdApps,
  MdShoppingBag,
  MdAnalytics,
  MdAccountBalance,
  MdBookOnline,
  MdInsertDriveFile,
  MdSchool,
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";
import { serverURL } from "../services/FetchNodeServices";



import { useRef, useState } from "react";
import Dashboard from "./Dashboard";

export default function Overview() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState('App')
  const menuItems = [
    { name: "App", icon: <MdApps size={25} color="grey" /> },
    { name: "Ecommerce", icon: <MdShoppingBag size={25} color="grey" /> },
    { name: "Analytics", icon: <MdAnalytics size={25} color="grey" /> },
    { name: "Banking", icon: <MdAccountBalance size={25} color="grey" /> },
    { name: "Booking", icon: <MdBookOnline size={25} color="grey" /> },
    { name: "File", icon: <MdInsertDriveFile size={25} color="grey" /> },
    { name: "Course", icon: <MdSchool size={25} color="grey" /> },
  ];

  const expandedMenu = () => {
    return (<div style={{ width: "100%" }}>
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
              width: "90%",
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
              }}
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

  const collapsedMenu = () => {
    return (<div style={{ width: "100%" }}>
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
              width: "90%",
              height: "6vh",
              marginLeft: 5,
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
                flexDirection: 'column'

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
    <div style={{ transition: "0.2s", display: "flex", width: collapsed ? "7%" : "280px", }}>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: '100%',
          background: "#fff",
          background:'yellow',
          // borderRight: "0.2px solid #cec9c9",
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
                cursor:'pointer'
              }}
            />
          ) : (
            <IoIosArrowBack
              style={{
                color: " #637381",
                fontSize: "1.125rem",
                fontWeight: 100,
                cursor:'pointer'
              }}
            />
          )}
        </div>
        {collapsed ? collapsedMenu() : expandedMenu()}


      </div>
      <div >
       
      </div>
     
    </div>
  )

}