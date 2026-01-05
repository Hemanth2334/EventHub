import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Card({ organizer }) {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleContactClick = () => {
        if (auth.isAuthenticated) {
            window.location.href = `mailto:${organizer.email}?subject=Inquiry about ${organizer.name}`;
        } else {
            toast.error('Please log in to contact an organizer.');
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
    };

    return (
        <div className="card m-3 d-flex flex-column h-100">
            <img src={organizer.img} className="card-img-top" alt={organizer.name} style={{ height: "180px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{organizer.name}</h5>
                <p className="card-text flex-grow-1">{organizer.description}</p>
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={handleContactClick}
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
}