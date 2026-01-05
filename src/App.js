import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ListCompany from './screens/ListCompany';
import MyListings from './screens/MyListings';
import EditCompany from './screens/EditCompany';
import Features from './screens/Features';
import Contact from './screens/Contact';
import About from './screens/About';
import Terms from './screens/Terms'; 

import 'mdb-ui-kit/css/mdb.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <div>
          <Routes>
            
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            
            <Route exact path="/list-company" element={<ListCompany />} />
            <Route exact path="/my-listings" element={<MyListings />} />
            <Route exact path="/edit-listing/:id" element={<EditCompany />} />

            <Route exact path="/features" element={<Features />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/terms" element={<Terms />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;