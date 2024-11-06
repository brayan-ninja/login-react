import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const AddStudent = () => {
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

    axios
      .post('http://localhost:4000/addstudent', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Corrected syntax
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        toast.success("Student added successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add student. Please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={saveStudent}>
        <div>
          <label>Firstname:</label>
          <input
            type="text"
            name="firstname"
            placeholder="Enter first name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter last name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter gender"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddStudent;


