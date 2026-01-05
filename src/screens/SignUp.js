import React, { useState } from 'react';
import 'mdb-ui-kit/css/mdb.min.css';
import { Link, useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast'; 

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); 
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const onCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.name.length < 5) {
      return toast.error("Name should be at least 5 characters long!");
    }
    if (credentials.password.length < 7) {
      return toast.error("Password should be at least 7 characters long!");
    }
    if (credentials.password !== repeatPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!isChecked) {
      return toast.error("You must agree to the Terms of Service.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User registered successfully! Redirecting to login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div>
      <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                      <p className="text-center h2 fw-bold mb-4">Sign up</p>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex align-items-center">
                           <i className="fas fa-user fa-lg me-3"></i>
                           <input type="text" name="name" value={credentials.name} onChange={onChange} className="form-control" placeholder="Your Name" required />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                           <i className="fas fa-envelope fa-lg me-3"></i>
                           <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" placeholder="Your Email" required />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                           <i className="fas fa-lock fa-lg me-3"></i>
                           <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" placeholder="Password" required />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                           <i className="fas fa-key fa-lg me-3"></i>
                           <input type="password" name="repeatPassword" value={repeatPassword} onChange={onRepeatPasswordChange} className="form-control" placeholder="Repeat Password" required />
                        </div>
                        <div className="form-check mb-3">
                           <input className="form-check-input" type="checkbox" id="terms" checked={isChecked} onChange={onCheckboxChange} />
                           <label className="form-check-label" htmlFor="terms">
                             I agree to the <Link to="/terms">Terms of Service</Link>
                           </label>
                        </div>
                        <div className="d-grid">
                           <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                        <div className="text-center mb-4 my-3">
                           <p>Already a user? <Link to="/login">Log in here</Link></p>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Signup Illustration" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}