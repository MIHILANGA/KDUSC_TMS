import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Login() {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Define translations for Sinhala
  const translations = {
    en: {
      title: 'KDU Vehicle Management System',
      loginText: 'Log in Your Interface',
      loginAdmin: 'Login Admin',
      loginFOC: 'Login FOC',
      loginFDSS: 'Login FDSS',
      loginFOT: 'Login FOT',
    },
    si: {
      title: 'KDU වාහන කළමනාකාර කළමනාකාරකරණය පද්ධතිය',
      loginText: 'ඔබගේ අතුරු සබැඳිය සොයන්න',
      loginAdmin: 'පරිපාලක ලොගින්',
      loginFOC: 'FOC ලොගින්',
      loginFDSS: 'FDSS ලොගින්',
      loginFOT: 'FOT ලොගින්',
    },
  };

  // Function to handle language change
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="login-frame" style={{ backgroundImage: `url('kdu-entrance 1.png')` }}>
      {/* ... Your existing code ... */}
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
          {translations[language].loginAdmin}
        </Link>
        <br />
        <div className="my-2"></div> {/* Add a small space */}
        <Link to="/login" className="btn btn2-curly w-100">
          {translations[language].loginFOC}
        </Link>
        <div className="my-2"></div> {/* Add a small space */}
        <Link to="/login1" className="btn btn2-curly w-100">
          {translations[language].loginFDSS}
        </Link>
        <div className="my-2"></div> {/* Add a small space */}
        <Link to="/login2" className="btn btn2-curly w-100">
          {translations[language].loginFOT}
        </Link>
      </div>

      {/* Language Change Buttons */}
      <div className="language-buttons">
        <button className="btn" onClick={() => handleLanguageChange('en')}>English</button>
        <button className="btn" onClick={() => handleLanguageChange('si')}>සිංහල</button>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
