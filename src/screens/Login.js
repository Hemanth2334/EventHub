import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; 

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const auth = useAuth(); 

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");

        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            toast.dismiss(loadingToast);

            if (response.ok && data.success) {
                toast.success("Login successful! Redirecting...");
                
                auth.login(data.authToken);

                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.error(data.error || "Invalid email or password!");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
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
                                            <p className="text-center h2 fw-bold mb-4">Log In</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <i className="fas fa-envelope fa-lg me-3"></i>
                                                    <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" placeholder="Your Email" required />
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <i className="fas fa-lock fa-lg me-3"></i>
                                                    <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" placeholder="Password" required />
                                                </div>
                                                <div className="d-grid my-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Log In</button>
                                                </div>
                                                <div className="text-center">
                                                    <p>Not a User? <Link to="/createuser">Sign up</Link></p>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-lg-6 order-1 order-lg-2 text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Login Illustration" />
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

export default Login;