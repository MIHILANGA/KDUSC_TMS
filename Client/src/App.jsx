import React from 'react'; // Make sure you import React
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Login1 from './Login1';
import Login2 from './Login2';
import Home from './home';
import Home1 from './home1';
import Home2 from './home2';
import First from './First';
import LoginA from './LoginA';
import HomeA from './HomeA';
import FormD from './FormD';
import Conformation from './conformation';
import Conformation1 from './conformation1';
import Conformation2 from './conformation2';
import Cancel from './cancel';
import Cancel1 from './cancel1';
import Cancel2 from './cancel2';
import Specialrequest from './Specialrequest';
import Map from './Map';
import Vehicledetails from './Vehicledetails';



function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<First />} ></Route>
        <Route path="/register" element={<Signup />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/login1" element={<Login1 />} ></Route>
        <Route path="/login2" element={<Login2 />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/home1" element={<Home1 />} ></Route>
        <Route path="/home2" element={<Home2 />} ></Route>
        <Route path="/Alogin" element={<LoginA />} ></Route>
        <Route path="/Ahome" element={<HomeA />} ></Route>
        <Route path="/FormD" element={<FormD />} ></Route>
        <Route path="/conformation" element={<Conformation />} ></Route>
        <Route path="/conformation1" element={<Conformation1 />} ></Route>
        <Route path="/conformation2" element={<Conformation2 />} ></Route>
        <Route path="/cancel" element={<Cancel />} ></Route>
        <Route path="/cancel1" element={<Cancel1 />} ></Route>
        <Route path="/cancel2" element={<Cancel2 />} ></Route>
        <Route path="/SpecialRequest" element={<Specialrequest />} ></Route>
        <Route path="/Map" element={<Map />} ></Route>
        <Route path="/Vehicledetails" element={<Vehicledetails />} ></Route>
        
        
      </Routes>
      
    </BrowserRouter>
    
    
  );
}

export default App;
