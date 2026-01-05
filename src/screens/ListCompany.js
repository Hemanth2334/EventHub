import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import { useAuth } from '../context/AuthContext';

export default function ListCompany() {
    const [credentials, setCredentials] = useState({
        name: "", description: "", email: "", CategoryName: "", img: ""
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();
    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/DisplayData", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (Array.isArray(data) && data[1] && data[1].length > 0) {
                setCategories(data[1]);
                setCredentials(prev => ({ ...prev, CategoryName: data[1][0].CategoryName }));
            } else {
                toast.error("No categories found to display.");
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            toast.error("Could not load categories.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            toast.error("You must be logged in to list a company.");
            navigate("/login");
        } else {
            fetchCategories();
        }
    }, [auth.isAuthenticated, navigate, fetchCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Submitting your listing...");
        try {
            const response = await fetch("http://localhost:5000/api/manage/organisations", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'auth-token': auth.authToken 
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json();
            toast.dismiss(loadingToast);
            if (response.ok && !json.errors) {
                toast.success("Your company has been listed successfully!");
                navigate("/");
            } else {
                const errorMessage = json.errors ? json.errors[0].msg : "An unknown error occurred.";
                toast.error("Error: " + errorMessage);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Submission failed. Please try again.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    if (!auth.isAuthenticated) {
        return <Spinner />; 
    }
    
    const navbarProps = { title: "MME" };

    return (
        <div>
            <Navbar {...navbarProps} />
            {loading ? <Spinner /> : (
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2>List Your Event Management Company</h2>
                            <p className="text-muted">Fill out the form below to get your company listed on our platform.</p>
                            <hr className="mb-4" />
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Company Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Public Contact Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="CategoryName" className="form-label">Category</label>
                                    <select className="form-select" id="CategoryName" name="CategoryName" value={credentials.CategoryName} onChange={onChange} required>
                                        <option value="" disabled>Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat.CategoryName}>{cat.CategoryName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Company Description</label>
                                    <textarea className="form-control" id="description" name="description" value={credentials.description} onChange={onChange} rows="4" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img" className="form-label">Company Image URL</label>
                                    <input type="text" className="form-control" id="img" name="img" value={credentials.img} onChange={onChange} placeholder="https://example.com/your-company-logo.jpg" required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">Submit for Listing</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}