import StatCard from "./StatCard";
import WelcomeCard from "../WelcomeCard/WelcomeCard";
import CardSlider from "../WelcomeCard/CardSlider";
export default function AppDashboard()
{   var data=[{
  heading:"Total active users",number:18765,graph:'/upgraph.png',updown:'/increase.png',percent:'+2.6% last 7 days'},
{
  heading:"Total installed",number:4876,graph:'/midgraph.png',updown:'/increase.png',percent:'+2.6% last 7 days'},
{
  heading:"Total downloads",number:678,graph:'/downgraph.png',updown:'/decrease.png',percent:'+2.6% last 7 days'}]

const sliderData = [
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

    return(<div>
      <div style={{margin:7,width:'100%',display:'flex', justifyContent:'space-between'}}>
      <div style={{width:'58%'}}>
        <WelcomeCard />
      </div>
      <div style={{width:'40%'}} >
        <CardSlider data={sliderData} />
        </div>  
      
      </div>
      <StatCard data={data}/>

    </div>)
}