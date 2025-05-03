import React from 'react';
import { Card } from 'react-bootstrap';

function Timeline({ timelineData }) {
  if (!timelineData) {
    return (
      <Card body>
        <p>No timeline generated yet. Submit an event to see the results!</p>
      </Card>
    );
  }

  const lines = timelineData.split('\n').filter((line) => line.trim() !== '');

  return (
    <Card body>
      <h5>Alternate Timeline</h5>
      <ul>
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </Card>
  );
}

export default Timeline;
