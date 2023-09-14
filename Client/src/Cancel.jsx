import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedIndex, setEditedIndex] = useState(-1); // Track the index of the edited row
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(-1); // Track the index of the expanded record

  useEffect(() => {
    // Fetch form data from the server when the component mounts
    axios.get('http://localhost:3001/getAllForm')
      .then(response => {
        setFormData(response.data.data);
        setLoading(false); // Data has been loaded
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        setLoading(false); // Error occurred while loading data
      });
  }, [showNotification]);

  // Handle cell click for editing
  const handleCellClick = (rowIndex, columnName) => {
    setEditedIndex(rowIndex); // Set the edited row index
  };

  // Handle cell change for editing
  const handleCellChange = (rowIndex, columnName, newValue) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][columnName] = newValue;
    setFormData(updatedFormData);
  };

  // Handle form submit to save edited data
  const handleFormSubmit = (index) => {
    const updatedForm = formData[index];

    // Update the data in the MongoDB database
    axios.post('http://localhost:3001/updateFormDatas', {
      id: updatedForm._id,
      updatedData: updatedForm,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
      alert('Data Update successfully!');
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
      alert('Data Update error!');
    });

    // Reset the editedIndex after saving
    setEditedIndex(-1);
  };

  // Handle delete
  const handleDelete = (id) => {
    // Delete data from the MongoDB database
    axios.post('http://localhost:3001/deleteFormData', {
      id: id,
    })
    .then(response => {
      console.log('Form data deleted from MongoDB:', response.data);
      // Refresh form data after deletion
      axios.get('http://localhost:3001/getAllForm')
        .then(response => {
          setFormData(response.data.data);
          alert('Request Form Cancel successfully!');
        })
        .catch(error => {
          console.error('Error fetching updated form data:', error);
          alert('Request Form Cancel Error!');
        });
    })
    .catch(error => {
      console.error('Error deleting form data from MongoDB:', error);
    });
  };

  // Function to calculate total passengers
  const calculateTotal = (form) => {
    return (
      form.numofOfficers +
      form.numofLectures +
      form.numofInstructors +
      form.numofCadetOfficers +
      form.numofDayScholars +
      form.numofCivilStaff
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Vehicle Request Forms Edit and Cancel</h1>
      {formData.map((form, index) => (
        <div className="record-box" key={index}>
          <p className="applicant-name">
            Applicant Name: {editedIndex === index ? (
              <input
                type="text"
                value={form.applicantname}
                onChange={(e) => handleCellChange(index, 'applicantname', e.target.value)}
              />
            ) : (
              <span onClick={() => setEditedIndex(index)}>{form.applicantname}</span>
            )}
          </p>
          <p className="requested-date">Requested date: {form.dateofApply}</p>
          <p className="description">
            Description: {editedIndex === index ? (
              <input
                type="text"
                value={form.appiicantAppoinment}
                onChange={(e) => handleCellChange(index, 'appiicantAppoinment', e.target.value)}
              />
            ) : (
              <span onClick={() => setEditedIndex(index)}>{form.appiicantAppoinment}</span>
            )}
          </p>

          {/* Render additional details */}
          {expandedRecordIndex === index && (
            <div className="description">
              <p className="expanded-detail">Vehicle Incharge: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.vehicleIncharge}
                    onChange={(e) => handleCellChange(index, 'vehicleIncharge', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.vehicleIncharge}</span>
                )}
              </p>
              <p className="expanded-detail">Date of Required: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.dateofRequired}
                    onChange={(e) => handleCellChange(index, 'dateofRequired', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.dateofRequired}</span>
                )}
              </p>
              <p className="expanded-detail">Time of Required: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.timeofRequired}
                    onChange={(e) => handleCellChange(index, 'timeofRequired', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.timeofRequired}</span>
                )}
              </p>
              <p className="expanded-detail">Nature of Duty: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.natureofDuty}
                    onChange={(e) => handleCellChange(index, 'natureofDuty', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.natureofDuty}</span>
                )}
              </p> <br/>

              <p className="expanded-detail">Address to Go: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.addresstoGo}
                    onChange={(e) => handleCellChange(index, 'addresstoGo', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.addresstoGo}</span>
                )}
              </p>
              <p className="expanded-detail">Requirement: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.requirement}
                    onChange={(e) => handleCellChange(index, 'requirement', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.requirement}</span>
                )}
              </p>
              <p className="expanded-detail">Time to be Spent: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.timetobeSpent}
                    onChange={(e) => handleCellChange(index, 'timetobeSpent', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.timetobeSpent}</span>
                )}
              </p>
              <p className="expanded-detail">Distance: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.distance}
                    onChange={(e) => handleCellChange(index, 'distance', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.distance}</span>
                )}
              </p> <br/>

              <p className="expanded-detail">Date of Arrival: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.dateofArrival}
                    onChange={(e) => handleCellChange(index, 'dateofArrival', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.dateofArrival}</span>
                )}
              </p>
              <p className="expanded-detail">Time of Arrival: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.timeofArrival}
                    onChange={(e) => handleCellChange(index, 'timeofArrival', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.timeofArrival}</span>
                )}
              </p>

              <p className="expanded-detail">Num of Officers: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofOfficers}
                    onChange={(e) => handleCellChange(index, 'numofOfficers', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofOfficers}</span>
                )}
              </p>
              <p className="expanded-detail">Num of Lectures: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofLectures}
                    onChange={(e) => handleCellChange(index, 'numofLectures', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofLectures}</span>
                )}
              </p>
              <p className="expanded-detail">Num of Instructors: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofInstructors}
                    onChange={(e) => handleCellChange(index, 'numofInstructors', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofInstructors}</span>
                )}
              </p>
              <p className="expanded-detail">Num of Cadet Officers: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofCadetOfficers}
                    onChange={(e) => handleCellChange(index, 'numofCadetOfficers', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofCadetOfficers}</span>
                )}
              </p>
              <p className="expanded-detail">Num of Day Scholars: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofDayScholars}
                    onChange={(e) => handleCellChange(index, 'numofDayScholars', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofDayScholars}</span>
                )}
              </p>
              <p className="expanded-detail">Num of Civil Staff: 
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={form.numofCivilStaff}
                    onChange={(e) => handleCellChange(index, 'numofCivilStaff', e.target.value)}
                  />
                ) : (
                  <span onClick={() => setEditedIndex(index)}>{form.numofCivilStaff}</span>
                )}
              </p>
              <p className="expanded-detail">Total of Passengers: {calculateTotal(form)}</p>
            </div>
          )}

          {/* Save button */}
          {editedIndex === index && (
            <button onClick={() => handleFormSubmit(index)}>Save</button>
          )}

          {/* Hide/Show Details button */}
          <button onClick={() => setExpandedRecordIndex(prevIndex => prevIndex === index ? -1 : index)}>
            {expandedRecordIndex === index ? 'Hide Details' : 'Show Details'}
          </button>

          {/* Delete button */}
          <button onClick={() => handleDelete(form._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FormD;
