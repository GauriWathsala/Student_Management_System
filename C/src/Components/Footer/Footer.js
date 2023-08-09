import React from "react"
//import { blog } from "../../../dummydata"
import "./Footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>GIFTED EDUCATION</h1>
            <span>INSTITUTE OF IELTS & CAE</span>
            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
            <i className='fab fa-facebook-f icon'></i>
           </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Commercial centre, Bandarawela, Sri Lanka
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +94 76 435 0491
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                giftededucationieltscam@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          All rights reserved by Gifted Education (Pvt) Ltd
        </p>
      </div>
    </>
  )
}

export default Footer