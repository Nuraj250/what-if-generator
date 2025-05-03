import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { generateWhatIf } from '../services/api';

function InputForm({ setTimelineData, setLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);
      const data = await generateWhatIf(text);
      setTimelineData(data.alternateHistory);
    } catch (error) {
      console.error('Error generating what-if:', error);
      setTimelineData('Error generating timeline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="eventText">
        <Form.Label>Enter an event or news article:</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., What if the Titanic never sank?"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Generate What-If Timeline
      </Button>
    </Form>
  );
}

export default InputForm;
