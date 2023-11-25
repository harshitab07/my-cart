import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <h6 className='text-center'>All Rights Reserved &copy; My-Cart</h6>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        |
        <Link to='/contact'>Contact</Link>
        |
        <Link to='/privacy-policy'>Privacy</Link>
      </p>
    </div>
  )
}

export default Footer;
