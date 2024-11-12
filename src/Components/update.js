import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";

const UpdateStudent = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
  });
  const history = useHistory(); // Updated to useHistory

  console.log(id);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);

    axios
      .get(`http://localhost:4000/getallstudentById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData({
          _id: res.data._id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          gender: res.data.gender,
        });
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("accessToken");
    axios
      .patch(`http://localhost:4000/updatestudent/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Student updated successfully");
        history.push("/");  // Updated to use history.push
      })
      .catch((err) => {
        toast.error("An error occurred while updating the record.");
      });
  };

  return (
    <div className="form-container">
      <h4 className="edit">Edit student</h4>

      <Form onSubmit={saveStudent}>
        <Form.Group className="mb-3" controlId="formGroupfirstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="input"
            required
            onChange={handleChange}
            name="firstname"
            value={data.firstname}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGrouplastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="input"
            onChange={handleChange}
            name="lastname"
            value={data.lastname}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupgender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="input"
            onChange={handleChange}
            name="gender"
            value={data.gender}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default UpdateStudent;
