import React from 'react'; // Make sure you import React
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Home1 from './home1';
import Home2 from './home2';
import First from './First';
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
import Insurancedetails from './Insurancedetails';
import Driverdetails from './Driverdetails';
import Vehicleadd from './Vehicleadd';
import Vehicleedit from './Vehicleedit';


function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<First />} ></Route>
        <Route path="/register" element={<Signup />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/home1" element={<Home1 />} ></Route>
        <Route path="/home2" element={<Home2 />} ></Route>
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
        <Route path="/InsuranceDetails" element={<Insurancedetails />} ></Route>
        <Route path="/DriversDetails" element={<Driverdetails />} ></Route>
        <Route path='/vehicleadd' element={<Vehicleadd />} ></Route>
        <Route path='/vehicleedit' element={<Vehicleedit />} ></Route>
        
      </Routes>
      
    </BrowserRouter>
    
    
  );
}

export default App;
