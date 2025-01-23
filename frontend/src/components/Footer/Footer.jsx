import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=''/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos deleniti tenetur quaerat earum, illum ipsum a rerum delectus nam modi amet praesentium, impedit maxime voluptatibus cupiditate velit enim eaque. Inventore.</p>
                    <div className="footer-social-icons">
                        
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                
                <div className="footer-content-center">
                        <h1>COMPANY</h1>
                        <ul>
                            <li>Home</li>
                            <li>Delivery</li>
                            <li>About us</li>
                            <li>Privacy Policy</li>
                        </ul>
                </div>
                <div className="footer-content-right">
                        <h1>GET IN TOUCH</h1>
                        <ul>
                            <li>+91 112122323</li>
                            <li>contact@gmail.com</li>
                        </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2025 @KhanaKart.com All Right Reserved</p>
    </div>
  )
}

export default Footer