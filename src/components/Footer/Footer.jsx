import React from 'react'

function Footer() {
  return (
    <div className="container-fluid m-0 p-0 ">
    <footer className="bg-secondary text-white py-3">
      <div className="d-flex container-md justify-content-lg-between justify-content-center gap-5 flex-wrap">
        <div className="contact-us me-lg-5">
          <h5>Contact Us</h5>
          <p><span className="bi bi-telephone"></span> (02)756-4234</p>
          <p><span className="bi bi-envelope-open"></span> sales@kgcomputers.com.ph</p>
        </div>
        <div className="visit-us me-lg-5">
          <h5>Visit Us</h5>
          <p><span className="bi bi-geo-alt"></span> 2F KG Commercial Bldg.</p>
          <p> Centennial Rd. Kawit Cavite</p>
        </div>
        <div className="social d-flex  flex-wrap ">
          <h5 className="">Follow Us</h5>
          <div className="w-100 ">
            <span className="bi bi-facebook"></span>
            <span className="bi bi-twitter"></span>
            <span className="bi bi-instagram"></span>
          </div>
        </div>
      </div>
      <p className="mb-0 text-center pt-4">&copy; 2023 KodeGo Computers. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default Footer