import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import { useAuth } from '../context/AuthContext';

export default function MyListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();

    const fetchListings = useCallback(async () => {
        if (!auth.authToken) return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/manage/my-listings", {
                method: 'GET',
                headers: { 'auth-token': auth.authToken }
            });
            const data = await response.json();
            if (response.ok && Array.isArray(data)) {
                setListings(data);
            } else {
                toast.error(data.error || "Failed to fetch your listings.");
                setListings([]);
            }
        } catch (error) {
            toast.error("An error occurred while fetching your listings.");
        } finally {
            setLoading(false);
        }
    }, [auth.authToken]);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/login");
        } else {
            fetchListings();
        }
    }, [auth.isAuthenticated, navigate, fetchListings]);

    const handleDeleteClick = (id) => {
        toast((t) => (
            <span className="d-flex flex-column align-items-center">
                <p className="fw-bold">Are you sure you want to delete this?</p>
                <div className="mt-2">
                    <button 
                        className="btn btn-danger btn-sm mx-1" 
                        onClick={() => {
                            handleConfirmDelete(id);
                            toast.dismiss(t.id);
                        }}
                    >
                        Confirm
                    </button>
                    <button 
                        className="btn btn-secondary btn-sm mx-1" 
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </span>
        ), {
            duration: 6000, 
        });
    };

    const handleConfirmDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/manage/organisations/${id}`, {
            method: 'DELETE',
            headers: { 'auth-token': auth.authToken }
        });
        if (response.ok) {
            toast.success("Listing deleted successfully.");
            fetchListings(); 
        } else {
            toast.error("Failed to delete listing.");
        }
    };

    const navbarProps = { title: "MME" };

    if (!auth.isAuthenticated) {
        return null;
    }

    return (
        <div>
            <Navbar {...navbarProps} />
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>My Company Listings</h2>
                    <Link to="/list-company" className="btn btn-primary">Add New Listing</Link>
                </div>
                <hr />
                {loading ? <Spinner /> : (
                    listings.length > 0 ? (
                        <div className="row">
                            {listings.map(listing => (
                                <div key={listing._id} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100">
                                        <img src={listing.img} className="card-img-top" alt={listing.name} style={{ height: '200px', objectFit: 'cover' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{listing.name}</h5>
                                            <p className="card-text text-muted">{listing.CategoryName}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <Link to={`/edit-listing/${listing._id}`} className="btn btn-secondary btn-sm">Edit</Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(listing._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <h4>You haven't listed any companies yet.</h4>
                            <p className="text-muted">Click the button above to add your first one!</p>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
}