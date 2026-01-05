import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Contact() {
  return (
    <div>
      <Navbar title="MME" />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-4">Contact Us</h2>
            <p className="text-muted">
              Have questions or feedback? We'd love to hear from you. Reach out to us through any of the methods below.
            </p>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">General Inquiries</h5>
                <p className="card-text">For general questions about our platform or services, please email us at:</p>
                <a href="mailto:support@makemyevents.com" className="btn btn-primary">support@makemyevents.com</a>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Business Partnerships</h5>
                <p className="card-text">Interested in partnering with us? Contact our business development team:</p>
                <a href="mailto:partners@makemyevents.com" className="btn btn-primary">partners@makemyevents.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}