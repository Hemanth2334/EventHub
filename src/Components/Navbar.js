import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ title, setSearch, setSelectedCategory, categories, selectedCategory }) {
  const navigate = useNavigate();
  const auth = useAuth(); 

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/">{title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            {setSearch && (
              <form className="d-flex w-50 mx-auto" role="search">
                <input 
                  className="form-control" 
                  type="search" 
                  placeholder="Search for events..." 
                  aria-label="Search" 
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </form>
            )}

            <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              
              {categories && setSelectedCategory && (
                <li className="nav-item dropdown mx-2">
                  <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li><button className={`dropdown-item ${selectedCategory === "" ? "active" : ""}`} onClick={() => setSelectedCategory("")}>All Categories</button></li>
                    {categories.map((category) => (
                      <li key={category._id}><button className={`dropdown-item ${selectedCategory === category.CategoryName ? "active" : ""}`} onClick={() => setSelectedCategory(category.CategoryName)}>{category.CategoryName}</button></li>
                    ))}
                  </ul>
                </li>
              )}
              {auth.isAuthenticated ? (
                <>
                  <li className="nav-item mx-2"><Link className="nav-link" to="/my-listings">My Listings</Link></li>
                  <li className="nav-item mx-2"><Link className="nav-link" to="/list-company">List Company</Link></li>
                  <li className="nav-item ms-3"><button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2"><Link className="btn btn-outline-primary" to="/login">Login</Link></li>
                  <li className="nav-item ms-2"><Link className="btn btn-primary" to="/createuser">SignUp</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
