import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllStudents = () => {
  const [records, setRecords] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useHistory();
  const [loadStudent] = useState([]);


  const loadEdit = (id) => {
    navigate.push(`/updatestudent/${id}`);
  };

  // const loadStudent = (id) => {
  //   navigate.push(``);
  // };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get("http://localhost:4000/getallstudent/" ,{
        headers: {
          Authorization: `Bearer ${token}`, // Corrected syntax for Authorization header
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setUnauthorized(true);
        }
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mx-auto col-md-12">
      <div className="mt-3">
        <h5>All Students Details</h5>
        {unauthorized ? (
          <p className="text-danger">You are not authorized to view this content.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-md">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{r.firstname}</td>
                    <td>{r.lastname}</td>
                    <td>{r.gender}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">
                          Perform Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Link
                            to="#"
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              loadStudent(r._id);
                            }}
                          >
                            Details
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              loadEdit(r._id);
                            }}
                          >
                            Edit Student
                          </Link>
                          {/* Uncomment below for delete action */}
                          {/* <Link to="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); LoadDelete(r.vendor_id)}}>
                              Delete
                          </Link> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
