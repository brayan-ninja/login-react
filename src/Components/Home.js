import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllStudents = () => {
  const [records, setRecords] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useHistory();

  const loadEdit = (id) => {
    navigate.push("/UpdateVendor/" + id);
  };

  const loadStudent = (id) => {
    navigate.push("/VendorDetails/" + id);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get('http://localhost:4000/getallStudent', {
        headers: {
          Authorization: `Bearer ${token}`,
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
              {records.map((r, index) => (
                <tr key={r.vendor_id || index}>
                  <td>{r.firstname}</td>
                  <td>{r.lastname}</td>
                  <td>{r.gender}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">
                        Perform Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Link to="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); loadStudent(r.vendor_id) }}>
                          Details
                        </Link>
                        <Link to="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); loadEdit(r.vendor_id) }}>
                          Edit Student
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
