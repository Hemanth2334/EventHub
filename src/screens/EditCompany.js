import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import { useAuth } from '../context/AuthContext';

export default function EditCompany() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken, isAuthenticated } = useAuth();
    
    const [listing, setListing] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(true);


    const fetchListingData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/manage/organisations/${id}`, {
                headers: { 'auth-token': authToken }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch listing data. You may not be the owner.');
            }
            const data = await response.json();
            setListing(data); 
        } catch (error) {
            toast.error(error.message);
            navigate('/my-listings'); 
        }
    }, [id, authToken, navigate]);

    const fetchAllCategories = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/DisplayData", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
            if (!response.ok) throw new Error('Could not load categories.');
            const data = await response.json();
            if (Array.isArray(data) && data[1]) {
                setCategories(data[1]);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            Promise.all([fetchListingData(), fetchAllCategories()]).then(() => {
                setLoading(false);
            });
        }
    }, [isAuthenticated, navigate, fetchListingData, fetchAllCategories]);

    const handleChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating listing...");
        try {
            const response = await fetch(`http://localhost:5000/api/manage/organisations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(listing)
            });
            toast.dismiss(loadingToast);
            if (!response.ok) {
                throw new Error('Failed to update listing.');
            }
            toast.success("Listing updated successfully!");
            navigate('/my-listings');
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.message);
        }
    };

    if (loading || !listing) {
        return <Spinner />;
    }

    return (
        <div>
            <Navbar title="MME" />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2>Edit Company Listing</h2>
                        <hr className="mb-4" />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Company Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={listing.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Public Contact Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={listing.email} onChange={handleChange} required />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="CategoryName" className="form-label">Category</label>
                                <select className="form-select" id="CategoryName" name="CategoryName" value={listing.CategoryName} onChange={handleChange} required>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat.CategoryName}>{cat.CategoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Company Description</label>
                                <textarea className="form-control" id="description" name="description" value={listing.description} onChange={handleChange} rows="4" required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label">Company Image URL</label>
                                <input type="text" className="form-control" id="img" name="img" value={listing.img} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Update Listing</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}