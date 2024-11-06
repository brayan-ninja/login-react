import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";



const Addstudent = () => {

  
  return (
    <div className="form-container">
     
      <form>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>
        
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>
        
        <p>Don't have an account <Link to="/register" className="register-link">Register?</Link></p>


        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Addstudent;
