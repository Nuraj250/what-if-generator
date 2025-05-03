import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InputForm from './components/InputForm';
import Timeline from './components/Timeline';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [timelineData, setTimelineData] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">🧠 What-If Generator</h1>
      <Row>
        <Col md={6}>
          <InputForm setTimelineData={setTimelineData} setLoading={setLoading} />
        </Col>
        <Col md={6}>
          {loading ? <Loader /> : <Timeline timelineData={timelineData} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
