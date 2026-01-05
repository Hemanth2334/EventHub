import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Features() {
  return (
    <div>
      <Navbar title="MME" />
      <div className="container my-5">
        <h2 className="mb-4">Our Features</h2>
        <div className="accordion" id="featuresAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Comprehensive Event Listings
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#featuresAccordion">
              <div className="accordion-body">
                Browse a wide variety of event management companies across different categories like weddings, corporate events, and birthdays. Our platform makes it easy to find the perfect organizer for any occasion.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                User-Managed Listings
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
              <div className="accordion-body">
                Are you an event organizer? Sign up and list your company on our platform to reach a wider audience. You have full control to update, modify, or delete your listings at any time through your personal dashboard.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Secure and Simple Contact
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
              <div className="accordion-body">
                Logged-in users can securely contact event organizers directly through the platform, ensuring your inquiries are handled professionally and efficiently.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}