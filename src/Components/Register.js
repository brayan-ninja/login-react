import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");
    axios.post('http://localhost:4000/addstudent', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Student saved successfully', response);
    })
    .catch(error => {
      console.error('There was an error saving the student!', error);
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={saveStudent}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="Enter first name"
            value={data.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter last name"
            value={data.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter gender"
            value={data.gender}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
