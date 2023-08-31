import React from 'react'; // Make sure you import React
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './home';
import First from './First';
import LoginA from './LoginA';
import HomeA from './HomeA';
import FormD from './FormD';
import Conformation from './conformation';
import Cancel from './cancel';
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
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/Alogin" element={<LoginA />} ></Route>
        <Route path="/Ahome" element={<HomeA />} ></Route>
        <Route path="/FormD" element={<FormD />} ></Route>
        <Route path="/conformation" element={<Conformation />} ></Route>
        <Route path="/cancel" element={<Cancel />} ></Route>
        <Route path="/SpecialRequest" element={<Specialrequest />} ></Route>
        <Route path="/Map" element={<Map />} ></Route>
        <Route path="/Vehicledetails" element={<Vehicledetails />} ></Route>
        
        
      </Routes>
      
    </BrowserRouter>
    
    
  );
}

export default App;
