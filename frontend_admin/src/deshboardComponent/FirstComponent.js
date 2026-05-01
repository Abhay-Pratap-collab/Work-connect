import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useRef, useState } from "react";
import { serverURL } from "../services/FetchNodeServices";
export default function FirstComponent() {
  const [mouseState, setMouseState] = useState(false)
  const [mouseStateFor, setMouseStateFor] = useState(false)
  //  const pic=[{"one.png","two.png","three.png"}]
  const pic = [
    {
      id: 1,
      heading: "Easy Service Booking",
      description:
        "Users can quickly book home services like electricians, plumbers, cleaners, and more in just a few taps. The interface is simple and user-friendly, making booking hassle-free.",
      image: "1.webp",
    },
    {
      id: 2,
      heading: "Verified Professionals",
      description:
        "All service providers are verified with proper background checks, ensuring safety, trust, and quality service for customers.",
      image: "2.webp",
    },
    {
      id: 2,
      heading: "Real-Time Availability",
      description:
        "Customers can check real-time availability of professionals and schedule services at their convenience.",
      image: "3.webp",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  const mySlider = useRef();
  const showSlide = () => {
    return pic.map((item) => {
      return (
        <div
          key={item.id}
          style={{
            width: "100%",
            // height: "100%",
            height: 400,
            borderRadius: 20,
            position: 'relative',
            overflow: "hidden",
            background: "linear-gradient(to top, black, transparent)",
          }}
        >
          {/* The Image */}
          <img
            src={`${serverURL}/images/${item.image}`}
            style={{
              width: '100%',
              height: 400,
              objectFit: "cover",
              borderRadius: 20,
              display: 'block'


            }}
          />
          {/* The Dark Overlay Gradient */}


          <div
            style={{
              position: "absolute",
              color: "#5be49b",
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: 1.5,
              textTransform: "uppercase",
              zIndex: 10,

              left: '5%',
              top: '50%'

            }}
          >
            FEATURED APP

          </div>
          <div
            style={{
              position: "absolute",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.5,
              textTransform: "uppercase",
              zIndex: 10,

              left: '5%',
              top: '58%'

            }}
          >
            {item.heading}
          </div>

          <div
            style={{
              position: "absolute",
              color: "#fff",
              fontWeight: 350,
              fontSize: "1rem",
              lineHeight: 1.5,

              zIndex: 10,

              left: '5%',
              top: '66%'

            }}
          >
            {item.description}
          </div>



        </div>
      );
    });
  };
  const handleBack = () => {
    mySlider.current.slickPrev();
  };
  const handleForward = () => {
    mySlider.current.slickNext();
  };

  return (
    <div style={{ display: "flex" ,}}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          position: "relative",
          // background:'red'
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: 30,
            right: 80,
            cursor: "pointer",
            width: 30,
            height: 30,
            borderRadius: 15,
            display: 'flex',
            background: mouseState ? 'rgba(255,255,255, 0.2)' : '',
            justifyContent: 'center',
            alignItems: 'center',

          }}
          onMouseDown={() => setMouseState(true)}
          onMouseUp={() => setMouseState(false)}
        >
          <MdArrowBackIos onClick={handleBack} style={{ color: "#fff" }} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: 30,
            right: 40,
            cursor: "pointer",
            display: 'flex',
            width: 30,
            height: 30,
            borderRadius: 15,
            background: mouseStateFor ? 'rgba(255,255,255, 0.3)' : '',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMouseDown={() => setMouseStateFor(true)}
          onMouseUp={() => setMouseStateFor(false)}
        >
          <MdArrowForwardIos
            onClick={handleForward}
            style={{ color: "#fff" }}
          />
        </div>

        <Slider ref={mySlider} {...settings}  >
          {showSlide()}
        </Slider>
      </div>

    </div>
  );
}