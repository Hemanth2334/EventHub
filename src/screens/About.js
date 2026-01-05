import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
  return (
    <div>
      <Navbar title="MME" />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-4">About Make My Events</h2>
            <p className="lead">
              Make My Events is a premier platform designed to connect users with the best event management companies for any occasion.
            </p>
            <p>
              Our mission is to simplify the process of finding and hiring professional event organizers. Whether you're planning a wedding, a corporate gathering, or a birthday party, our platform provides a curated directory of trusted vendors. We also empower event management companies by giving them a space to showcase their services and connect with new clients.
            </p>
            <p>
              Founded in 2025, we are committed to making every event a memorable success.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}