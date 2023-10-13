import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Vehicledetails.css';
import AddVehiclePopup from './AddVehiclePopup'; // Import the AddVehiclePopup component
import Switch from 'react-switch'; // Import the react-switch library

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control popup visibility
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // time and date showing
  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch form data from the server
    axios
      .get('http://localhost:3001/getAllVehicle')
      .then((response) => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map((form) => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  // Function to fetch data from the database and populate the table
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/getAllVehicle');
    const data = response.data.data;
    setFormData(data);
  };

  // Function to handle the change in vehicle availability
  const handleAvailabilityChange = (index, checked) => {
    // Clone the formData array to avoid mutating state directly
    const updatedFormData = [...formData];
    // Update the availability for the item at the specified index
    updatedFormData[index].vehicleAvailability = checked;

    // Prepare the data to send to the server
    const dataToUpdate = {
      id: updatedFormData[index]._id, // Assuming you have an _id property
      updatedData: { vehicleAvailability: checked },
    };

    // Send a request to update the availability on the server
    axios
      .post('http://localhost:3001/updateVehicleDatas', dataToUpdate)
      .then((response) => {
        console.log('Vehicle availability updated:', response.data);

        // Update the local state with the updated data
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating vehicle availability:', error);
      });
  };

  // Render the table with the fetched data
  const renderTable = () => {
    return (
      <div className='notification-panelV'>
        <table className='Vehicledata-table'>
          <div className='table-container'>
            <thead className='fixed-header'>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle type</th>
                <th>Vehicle Model</th>
                <th>Vehicle A.P</th>
                <th>Register Date</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <tr key={index}>
                  <td>{form.vehiclenumber}</td>
                  <td>{form.vehicletype}</td>
                  <td>{form.vehiclemodel}</td>
                  <td>{form.vehicleowner}</td>
                  <td>{form.registerdate}</td>
                  <td>
                    {/* Use the Switch component here */}
                    <Switch
                      onChange={(checked) => handleAvailabilityChange(index, checked)}
                      checked={form.vehicleAvailability} // Assuming form.vehicleAvailability is a boolean
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    );
  };

  // Function to show the popup form
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to hide the popup form
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>
        Back
      </button>

      {/* Left side with buttons */}
      <div style={{ flex: 1, padding: '10px' }}>
        <div className='Buttons'>

          {/* Show the popup form when the "Add" button is clicked */}
          <div>{currentDateTime.toLocaleString()}</div>
          
          <button className='Addvehiclebtn' onClick={showPopup}>
            Add
          </button>
          <Link to='/vehicleedit' className='Editvehiclebtn'>
            Edit
          </Link>
          <Link to='/Locatin' className='Editvehiclebtn'>
            Locate<br></br> Vehicles 
          </Link>
          <Link to='/Maintains' className='Editvehiclebtn'>
            Maintenance<br></br> Insurance
          </Link>
          {/* Display the current date and time */}
         
        </div>
      </div>

      {/* Render the table */}
      {renderTable()}

      {/* Render the popup form if isPopupVisible is true */}
      {isPopupVisible && <AddVehiclePopup onClose={hidePopup} onAdd={fetchData} />}
      
    </>
  );
}

export default FormD;
