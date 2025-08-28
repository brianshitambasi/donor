import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../Home.css';

const HomeComponent = () => {
  return (
    <div className="home">
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section bg-primary text-white text-center d-flex flex-column justify-content-center align-items-center py-5">
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-4">Make a Difference Today</h1>
          <p className="lead mb-4 fs-5">
            Your generosity transforms lives and strengthens communities.  
            Together, we can create meaningful change that lasts a lifetime.
          </p>
          <Link className="btn btn-lg btn-light px-5 py-3 fw-semibold shadow" to="/login">
            Donate Now
          </Link>
        </div>
      </section>

      {/* Impact Carousel */}
      <div 
  id="charityCarousel" 
  className="carousel slide" 
  data-bs-ride="carousel" 
  data-bs-interval="2000"   // <-- Add this line
>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="static/images/charity.jpg" className="d-block w-100" alt="Charity Work" height={500} />
    </div>
    <div className="carousel-item">
      <img src="static/images/a2.jpeg" className="d-block w-100" alt="Helping Community" height={500} />
    </div>
    <div className="carousel-item">
      <img src="static/images/a3.jpeg" className="d-block w-100" alt="Volunteering Aid" height={500}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#charityCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#charityCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


      {/* Info Cards */}
      <section className="container my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Why Choose Us?</h2>
          <p className="text-muted fs-5">
            Together, we can build a future filled with hope and compassion.
          </p>
        </div>
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="info-card p-4 shadow-sm rounded bg-light h-100">
              <i className="bi bi-heart-fill text-danger fs-1 mb-3"></i>
              <h3 className="fw-semibold">Why Donate?</h3>
              <p>
                Your donations empower us to provide food, shelter, education, and medical aid to those in need.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card p-4 shadow-sm rounded bg-light h-100">
              <i className="bi bi-people-fill text-primary fs-1 mb-3"></i>
              <h3 className="fw-semibold">Our Community</h3>
              <p>
                Thousands of donors and volunteers come together to support meaningful change worldwide.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card p-4 shadow-sm rounded bg-light h-100">
              <i className="bi bi-check2-circle text-success fs-1 mb-3"></i>
              <h3 className="fw-semibold">Trusted & Transparent</h3>
              <p>
                We maintain full transparency, ensuring your donations directly reach those who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">Ready to Create Change?</h2>
          <p className="lead mb-5">
            Join our mission and be part of something greater. Every act of kindness counts.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-lg btn-danger px-5 py-3" to="/login">
              Donate Now
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-3">
            We are dedicated to making the world a better place through kindness, generosity, and community support.  
            Every donation makes a difference in someone’s life.
          </p>
          <p className="mb-1">© 2025 Burnix Donations. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="text-white me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white">Terms of Service</Link>
          </p>
        </div>
      </footer> 
    </div>
  );
};

export default HomeComponent;
