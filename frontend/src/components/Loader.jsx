import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className="text-center my-4">
      <Spinner animation="border" role="status" />
      <div>Generating alternate reality...</div>
    </div>
  );
}

export default Loader;
