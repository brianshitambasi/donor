import React from 'react';
import { Link } from 'react-router-dom';
// import '../About.css'; // This file must now exist in src/

const AboutComponent = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Our Story of Compassion</h1>
              <p className="lead mb-4">
                Empowering communities through generosity and sustainable change since 2020.
              </p>
              <Link to="/donate" className="btn btn-light btn-lg px-4 py-2">
                Join Our Mission
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="static/images/a6.jpeg" 
                alt="Our team helping community" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 p-lg-5 bg-light rounded-3 h-100">
                <h2 className="mb-4">Our Mission</h2>
                <p className="fs-5">
                  To create lasting positive change by connecting donors with vetted causes that transform lives, 
                  empower communities, and build sustainable solutions to pressing social challenges.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 p-lg-5 bg-light rounded-3 h-100">
                <h2 className="mb-4">Our Vision</h2>
                <p className="fs-5">
                  A world where every act of generosity, no matter how small, contributes to a ripple effect 
                  of meaningful change and collective wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5">Our Impact in Numbers</h2>
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="p-3">
                <h3 className="display-4 fw-bold text-primary">5M+</h3>
                <p className="mb-0">Lives Impacted</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h3 className="display-4 fw-bold text-primary">250+</h3>
                <p className="mb-0">Projects Funded</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h3 className="display-4 fw-bold text-primary">98%</h3>
                <p className="mb-0">Donations to Causes</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3">
                <h3 className="display-4 fw-bold text-primary">45</h3>
                <p className="mb-0">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Leadership</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="team-card text-center p-4">
                <img 
                  src="static/images/a6.jpeg" 
                  alt="Founder" 
                  className="img-fluid rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h4>Sarah Johnson</h4>
                <p className="text-muted">Founder & CEO</p>
                <p>Former humanitarian worker with 15 years experience in international development.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card text-center p-4">
                <img 
                  src="static/images/a5.jpeg" 
                  alt="Operations Director" 
                  className="img-fluid rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h4>Michael Chen</h4>
                <p className="text-muted">Operations Director</p>
                <p>Expert in nonprofit management and impact measurement.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card text-center p-4">
                <img 
                  src="static/images/a4.jpeg" 
                  alt="Partnership Lead" 
                  className="img-fluid rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h4>Priya Patel</h4>
                <p className="text-muted">Partnership Lead</p>
                <p>Connects donors with impactful projects worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="value-card p-4 h-100">
                <div className="value-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="bi bi-heart-fill fs-3"></i>
                </div>
                <h4>Compassion</h4>
                <p>We approach every challenge with empathy and understanding, putting people at the center of our work.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card p-4 h-100">
                <div className="value-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="bi bi-shield-check fs-3"></i>
                </div>
                <h4>Transparency</h4>
                <p>We maintain open books and clear reporting so you know exactly how your donation is used.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card p-4 h-100">
                <div className="value-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="bi bi-lightbulb fs-3"></i>
                </div>
                <h4>Innovation</h4>
                <p>We constantly seek better ways to maximize impact and solve social challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center py-4">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-5">Join thousands of donors who are creating meaningful change through our platform.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/donate" className="btn btn-light btn-lg px-4">Donate Now</Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-4">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;
