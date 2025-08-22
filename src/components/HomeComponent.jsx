import React from 'react'
import '../Home.css'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const HomeComponent = () => {
  return (
    <div className="home">
      <NavBar />

      {/* Carousel to display images of charity work */}
      <div id="charityCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="static/images/charity.jpg" className="d-block w-100" alt="Charity Work" height={350} width={250} />
          </div>
          <div className="carousel-item">
            <img src="static/images/a2.jpeg" className="d-block w-100" alt="Helping Community" height={250} width={250} />
          </div>
          <div className="carousel-item">
            <img src="static/images/a3.jpeg" className="d-block w-100" alt="Volunteering Aid" height={250} width={250}/>
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

      {/* Hero Section */}
      <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Make a Difference Today</h1>
          <p className="lead mb-4">
            Your generous donation helps transform lives and communities.
            Join us in creating lasting impact by supporting causes that matter.
          </p>
       <Link className="nav-link btn btn-primary text-white ms-3 px-3 py-1 rounded" to="/login"> Donate Now</Link>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container my-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="info-card p-4 shadow rounded bg-white h-100">
              <i className="bi bi-heart-fill text-danger fs-1 mb-3"></i>
              <h3>Why Donate?</h3>
              <p>
                Donations empower us to provide food, shelter, education, and medical aid to those in need.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card p-4 shadow rounded bg-white h-100">
              <i className="bi bi-people-fill text-primary fs-1 mb-3"></i>
              <h3>Our Community</h3>
              <p>
                Thousands of donors and volunteers come together to support meaningful change worldwide.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card p-4 shadow rounded bg-white h-100">
              <i className="bi bi-check2-circle text-success fs-1 mb-3"></i>
              <h3>Trusted & Transparent</h3>
              <p>
                We prioritize transparency, ensuring your donations directly reach those who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          We are dedicated to making the world a better place through kindness, generosity, and community support.
          Every donation goes directly to causes that matter most to you, whether it's providing food for the hungry, shelter for the homeless, or education for children in need.
          <p className="text-center mt-4">
            Join us in our mission to create a brighter future for all. Together, we can make a difference that lasts a lifetime.
            <br />
          </p>
          <p>© 2025 Burnix Donations. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="text-white me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white">Terms of Service</Link>
          </p>
        </div>
      </footer> 
    </div>
  )
}

export default HomeComponent