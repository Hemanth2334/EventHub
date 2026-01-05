import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Terms() {
  return (
    <div>
      <Navbar title="MME" />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-4">Terms of Service</h2>
            <p className="text-muted">Last updated: August 07, 2025</p>

            <p>Please read these terms and conditions carefully before using Our Service.</p>

            <h4 className="mt-4">1. Interpretation and Definitions</h4>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h4 className="mt-4">2. Acknowledgment</h4>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. By accessing or using the Service You agree to be bound by these Terms and Conditions.</p>

            <h4 className="mt-4">3. User Accounts</h4>
            <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
            <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password.</p>

            <h4 className="mt-4">4. Content</h4>
            <p>Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness. By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>

            <h4 className="mt-4">5. Termination</h4>
            <p>We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>

            <h4 className="mt-4">6. Contact Us</h4>
            <p>If you have any questions about these Terms and Conditions, You can contact us by email at: <a href="mailto:contact@makemyevents.com">contact@makemyevents.com</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}