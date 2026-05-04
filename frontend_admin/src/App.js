// import City from "./components/cityComponent/City";
// import Place from "./components/placeComponent/Place";
// import { BrowserRouter as Router, Routes, Route } from "react-router";
// import DisplayAll from "./components/cityComponent/DisplayAll";
// import DisplayAllCity from "./components/cityComponent/DisplayAllCity";
// import DisplayAllPlace from "./components/placeComponent/DisplayAllPlace";
// import PlaceEdit from "./components/placeComponent/PlaceEdit";
// import Category from "./components/categoryComponent/Category";
// import DisplayAllCategory from "./components/categoryComponent/DisplayAllCategory";
// import CategoryEdit from "./components/categoryComponent/CategoryEdit";
// import Subcategory from "./components/SubCategoryComponent/Subcategory";
// import DisplayAllSubcategory from "./components/SubCategoryComponent/DisplayAllSubcategory";
// import Experts from "./components/Experts/Experts";
// import DisplayExpert from "./components/Experts/DisplayExperts";
// import Includes from "./components/includesComponent/Includes";
// import All from "./components/Experts/All";
// import DocumentEdit from "./components/Experts/DocumentEdit";
// import PanExperts from "./components/Experts/PanExperts";
// import ExpertIconEdit from "./components/Experts/ExpertsIconEdit";
// import SignUpCard from "./components/loginComponent/SignUpCard";
// import SignInCard from "./components/loginComponent/SignInCard";
// import LoginPage from "./components/loginComponent/LoginPage";
// import DisplayAllIncludes from "./components/includesComponent/DisplayAllIncludes";
// import Dashboard from "./deshboardComponent/Dashboard";
// import Overview from "./deshboardComponent/Overview"; // Correct
// import Menubar from "./deshboardComponent/Menubar";
// import FirstComponent from "./deshboardComponent/FirstComponent";
// import SecondComponent from "./deshboardComponent/SecondComponent";

// // Change 'signin' to 'Signin'
// function App() {
//   return (
//     <div >
//       <Router>
//         <Routes>
//           <Route element={<City />} path="/city"></Route>
//           <Route element={<DisplayAll />} path="/displayall"></Route>
//           <Route element={<DisplayAllCity />} path="/displayallcity"></Route>



//           <Route element={<Place />} path="/place"></Route>
//           <Route element={<DisplayAllPlace />} path="/displayallplace"></Route>
//           <Route element={<PlaceEdit />} path="/placeedit"></Route>


//           <Route element={<Category />} path="/category"></Route>
//           <Route element={<DisplayAllCategory />} path="/displayallcategory"></Route>
//           <Route element={<CategoryEdit />} path="/categoryedit"></Route>

//           <Route element={<Subcategory />} path="/subcategory"></Route>
//           <Route element={<DisplayAllSubcategory />} path="/displaysubcategory"></Route>

//           <Route element={<Experts />} path="/experts"></Route>
//           <Route element={<DisplayExpert />} path="/displayexperts"></Route>

//           <Route element={<Includes />} path="/include"></Route>
//           <Route element={<All />} path="/all"></Route>
//           <Route element={<DocumentEdit />} path="/document"></Route>
//           <Route element={<PanExperts />} path="/pan"></Route>
//           <Route element={<ExpertIconEdit />} path="/aaa"></Route>
// <Route element={<SignUpCard/>}path="signupcard"></Route>
// <Route element={<SignInCard/>}path="signincard"></Route>
// <Route element={<LoginPage/>}path="loginpage"></Route>
// <Route element={<Overview/>}path="overview"></Route>
// <Route element={<DisplayAllIncludes/>}path="displayallincludes"></Route>
// <Route element={<Dashboard/>}path="dashboard"></Route>
// <Route element={<Menubar/>}path="menubar"></Route>
// <Route element={<FirstComponent/>}path="first"></Route>
// <Route element={<SecondComponent/>} path="second"></Route>




//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import City from "./components/cityComponent/City";
import { BrowserRouter as Router,Routes,Route } from "react-router";
import Login from "./components/LoginComponent/Login"
import Dashboard from "./components/LoginComponent/Dashboard";
import AppDashboard from "./components/LoginComponent/AppDashBoard";
// import DisplayAllIncludes from "./components/includesComponent/DisplayAllIncludes";
// import Includes from "./components/includesComponent/Includes";
function App() {
  return (
<div> 
  <Router>
    <Routes>
      <Route element={<Dashboard/>} path="/dashboard/*"/>
      <Route element={<Login/>} path="/adminlogin"/>
      <Route element={<AppDashboard/>} path="/app"/>

    
      
      
      </Routes>
  </Router>

     </div>
  );
}

export default App;
