import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import BackToTopButton from './BackToTopButton';
import './stylle.css'; // Make sure to fix typo in file name

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // For showing success/error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3033/api/send', formData); // Adjust URL if needed
      setStatus('Email sent successfully');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Error sending email');
    }
  };

  return (
    <section id="contact">
      <h1 className="heading">Contact Me</h1>
      <div className="contact-wrapper">
        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <FontAwesomeIcon icon={faPhone} />
              <span className="contact-text phone">
                <a href="tel:7418168105" title="Give me a call">
                  +91-7418168105
                </a>
              </span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="contact-text gmail">
                <a href="mailto:sanmathisedhupathi2004@gmail.com" title="Send me an email">
                  sanmathisedhupathi2004@gmail.com
                </a>
              </span>
            </li>
          </ul>
          <hr />
          <ul className="social-media-list">
            <li>
              <a href="https://www.facebook.com/your-profile" target="_blank" className="contact-icon" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/your-profile" target="_blank" className="contact-icon" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/your-profile" target="_blank" className="contact-icon" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} aria-hidden="true" />
              </a>
            </li>
          </ul>
          <hr />
        </div>
        <form id="contact-form" className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E-Mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <textarea
            className="form-control"
            rows="10"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
            <div className="alt-send-button">
              <FontAwesomeIcon icon={faPaperPlane} className="fa" />
              <span className="send-text">SEND</span>
            </div>
          </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
      <BackToTopButton />
    </section>
  );
};

export default ContactForm;
