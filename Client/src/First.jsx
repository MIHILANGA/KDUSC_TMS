import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Login() {
  return (
    <div className="login-frame" style={{ backgroundImage: `url('kdu-entrance 1.png')` }}>
      <div className="overlay"></div> {/* Overlay element */}
      <div className="overlap">
        <div className="hedder">
          <div className="rectangle" />
          <img className="kotelawala-defence" alt="Kotelawala defence" src="p1.png" />
          <img className="southen" alt="Southen" src="southen1 1.png" />
        </div>
        

        <div className="d-flex justify-content-center align-items-center vh-100">
          
      
          <div className="bg-white p-3 rounded w-25 login-content"> {/* Apply login-content class */}
            <h2>KDU Vehicle Management System</h2>
            <p>Log in Your Interface</p>
            <div className="form-control-curly rounded-5">
  <Link to="/Alogin" className="btn btn-curly gap-5 w-100">
    Login Admin
  </Link>
  <br />
  <div className="my-2"></div> {/* Add a small space */}
  <Link to="/login" className="btn btn2-curly w-100">
    Login FOC 
  </Link>

<div className="my-2"></div> {/* Add a small space */}
  <Link to="/login1" className="btn btn2-curly w-100">
    Login FDSS 
  </Link>
  <div className="my-2"></div> {/* Add a small space */}
  <Link to="/login2" className="btn btn2-curly w-100">
    Login FOT 
  </Link>
</div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

