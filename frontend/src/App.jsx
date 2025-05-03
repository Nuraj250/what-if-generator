import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import InputForm from './components/InputForm';
import Timeline from './components/Timeline';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [impactFilter, setImpactFilter] = useState(0); // 0 = show all

  const addNewTimeline = (newTimeline) => {
    setTimelineData((prev) => [...prev, newTimeline]);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">🧠 What-If Generator</h1>
      <Row>
        <Col md={6}>
          <InputForm addNewTimeline={addNewTimeline} setLoading={setLoading} />
          <Form.Group className="mt-4">
            <Form.Label>Impact Strength Filter:</Form.Label>
            <Form.Range
              value={impactFilter}
              min={0}
              max={2}
              onChange={(e) => setImpactFilter(Number(e.target.value))}
            />
            <div className="d-flex justify-content-between">
              <small>All</small>
              <small>Medium+</small>
              <small>High Only</small>
            </div>
          </Form.Group>
        </Col>

        <Col md={6}>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              {timelineData.length === 0 ? (
                <p>No timeline generated yet.</p>
              ) : (
                timelineData.map((data, idx) => (
                  <Col key={idx} md={12}>
                    <Timeline timelineData={data} version={idx + 1} impactFilter={impactFilter} />
                  </Col>
                ))
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
