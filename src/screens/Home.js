import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Carousel from '../Components/Carousel';
import Spinner from '../Components/Spinner';

export default function Home() {
    const [orgs, setOrgs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/DisplayData", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    searchTerm: search, 
                    category: selectedCategory 
                })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const json = await response.json();
            setOrgs(json[0]);
            setCategories(json[1]);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [search, selectedCategory]); 

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            loadData();
        }, 500);
        return () => clearTimeout(debounceTimeout);
    }, [loadData]); 

    return (
        <div>
            <Navbar 
                title="MME" 
                setSearch={setSearch} 
                setSelectedCategory={setSelectedCategory} 
                categories={categories} 
                selectedCategory={selectedCategory} 
            />
            
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Carousel items={orgs} />
                    <div className='container'>
                        <div className='fs-3 m-3'>{selectedCategory || "All Events"}</div>
                        <hr />
                        <div className="row">
                            {orgs.length > 0
                                ? orgs.map((organizer) => (
                                    <div key={organizer._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                                        <Card organizer={organizer} />
                                    </div>
                                ))
                                : (
                                    <div className='col-12 text-center mt-5'>
                                        <h4>No Events Found</h4>
                                        <p className="text-muted">Try adjusting your search or category filters.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
} 