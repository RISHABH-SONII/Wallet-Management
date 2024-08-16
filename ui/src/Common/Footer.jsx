import { faCopy, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Footer.css';

export default function Footer() {
    return (
        <div className='footerdiv'>
            <div className='copyrightdiv'><FontAwesomeIcon icon={faCopyright} style={{ fontSize: "15px" }} /> Copyright 2024 <span>E-Cash</span> | All Rights Reserved</div>
            <div className='iconsdiv'>
                <p><FontAwesomeIcon icon={faFacebook} /></p><p><FontAwesomeIcon icon={faInstagram} /></p><p><FontAwesomeIcon icon={faLinkedin} /></p><p><FontAwesomeIcon icon={faTwitter} /></p>
            </div>
        </div>
    )
}
