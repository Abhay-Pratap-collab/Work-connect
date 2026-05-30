// "use client"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { serverURL } from "../fetchserver/FetchServer";
// import { useRef, useState } from "react";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { red } from "@mui/material/colors";





// export default function CategoryScroll({data}) {
    
//     const [mouseState, setMouseState] = useState(false)
//     const [button,setButton]=useState(false)

//     const mySlider = useRef();
//     var settings = {
       
//         infinite: true,
//         speed: 700,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         // autoplay: true,
//         autoplaySpeed: 2000,

//         arrows: false,
//     };
//     const showSlider = () => {
//         return (
//             data.map((item) => {
//                 return (
//                     <div style={{ margin: '2px', display: 'flex' ,width:'100%'}}>



//                         <div style={{
//                             width: "95%",
//                             height: "100%",
//                             overflow: "hidden",
//                             display:'flex',
//                             gap:'10px'
//                             // background:'yellow'
//                         }}>
//                             <img
//                                 src={`${serverURL}/images/${item.image}`}
//                                 style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     objectFit: "cover",
//                                     gap: '0px',
//                                     display: 'block',
//                                      cursor: 'pointer',
//                                     borderRadius: '10px',
//                                           transition: 'transform 0.2s ease',



//                                 }}onMouseEnter={(e) => {
//       e.currentTarget.style.transform = "scale(1.02)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "scale(1)";
//     }}

//                             />


//                         </div>
//                     </div>)

//             })

//         )

//     }
//     const handleBack = () => {
//         mySlider.current.slickPrev();
//     };
//     const handleForward = () => {
//         if (!showBackArrow) setShowBackArrow(true);
//         mySlider.current.slickNext();
//     };


//     return (<div style={{ width: '98%' ,height:'110%',padding:'0px '}} >
//         <div style={{
//             width: '100%',
//             position: "relative",
//         }}>
//             <div
//                 style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     top: "40%",
//                     left: '-20px',
//                     cursor: "pointer",
//                     width: 50,
//                     height: 50,
//                     borderRadius: 15,
//                     display: 'flex',
//                     background: mouseState ? 'rgba(255,255,255, 0.2)' : '',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     right: '15px',
//                     border: '5px solid white',
//                     borderRadius: '50%',
//                     boxSizing: 'border-box',
//                     boxShadow: '0px 8px 15px rgba(28, 42, 197, 0.1)',
//                     background: "white",


//                 }}
//                 onMouseDown={() => setMouseState(true)}
//                 onMouseUp={() => setMouseState(false)}
//             >

//                 <ArrowBackIcon onClick={handleBack} style={{ zIndex: -1, color: "black" }} />
//             </div>
//             <div
//                 style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     top: "40%",
//                     // right: 80,
//                     cursor: "pointer",
//                     width: 50,
//                     height: 50,
//                     borderRadius: 15,
//                     display: 'flex',
//                     background: mouseState ? 'rgba(255,255,255, 0.2)' : '',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     right: '5px',
//                     border: '5px solid white',
//                     borderRadius: '50%',
//                     boxSizing: 'border-box',
//                     boxShadow: '0px 8px 15px rgba(28, 42, 197, 0.1)',
//                     background: "white",



//                 }}
//                 onMouseDown={() => setMouseState(true)}
//                 onMouseUp={() => setMouseState(false)}
//             >

//                 <ArrowForwardIcon onClick={handleForward} style={{ zIndex: -1, color: "black" }} />
//             </div>

//             <Slider ref={mySlider} {...settings}  >
//                 {showSlider()}
//             </Slider>
//         </div>

//     </div>)
// }

"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../fetchserver/FetchServer";
import { useRef, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CategoryScroll({ data }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const mySlider = useRef();

    const slidesToShow = 3;

    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        // Update state whenever the slider moves
        afterChange: (current) => setCurrentSlide(current),
    };

    // Jump to the very end
    const handleForward = () => {
        const lastIndex = data.length - slidesToShow;
        mySlider.current.slickGoTo(lastIndex);
    };

    // Jump back to the very beginning
    const handleBack = () => {
        mySlider.current.slickGoTo(0);
    };

    const showSlider = () => {
        return data.map((item, index) => (
            <div key={index} style={{margin:'2px',display:'flex',width:'100%' }}>
                <div style={{
                    width: "95%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: '10px',
                    border: '1px solid #eee',
                    display:'flex',
                    gap:'10px'
                }}>
                    <img
                        src={`${serverURL}/images/${item.image}`}
                        alt="category"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: 'block',
                            cursor:'pointer',
                            borderRadius:"10px",
                            transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.02)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}

                    />
                </div>
            </div>
        ));
    };

    return (
        <div style={{ width: '98%', padding: '0px',height:'110%' }}>
            <div style={{ width: '100%',  position: "relative" }}>
                
                {/* BACKWARD ICON: Only shows if we are NOT at the start (index 0) */}
                {currentSlide > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            top: "50%",
                            transform: 'translateY(-50%)',
                            left: '-30px',
                            cursor: "pointer",
                            width: 50,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            background: "white",
                             boxShadow: '0px 8px 15px rgba(28, 42, 197, 0.1)',
                            borderRadius: 15,
                             boxSizing: 'border-box',
                        }}
                        onClick={handleBack}
                    >
                        <ArrowBackIcon style={{ color: "black" }} />
                    </div>
                )}

                {/* FORWARD ICON: Only shows if we are at the start (index 0) */}
                {currentSlide === 0 && (
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            top: "50%",
                            transform: 'translateY(-50%)',
                            right: '5px',
                            cursor: "pointer",
                            width: 45,
                            height: 45,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                            background: "white",
                        }}
                        onClick={handleForward}
                    >
                        <ArrowForwardIcon style={{ color: "black" }} />
                    </div>
                )}

                <Slider ref={mySlider} {...settings}>
                    {showSlider()}
                </Slider>
            </div>
        </div>
    );
}