// LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
      {/* Using React Bootstrap's Spinner */}
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      
      {/* Alternative: Using Font Awesome's Spinner */}
      {/* <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
      <span className="sr-only">Loading...</span> */}
    </div>
  );
};

export default LoadingSpinner;