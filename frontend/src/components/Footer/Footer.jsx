import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                   <div className="footer-logo"><img src={assets.logo} alt=''/></div> 
                    <p>Serving smiles, spoonfuls of joy, and the occasional food coma — every single day. Thanks for being a part of the KhanaKart family. Remember, calories don’t count when the food is this good!</p>
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