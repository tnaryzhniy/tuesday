import React from 'react';
import TaskSwitcher from './components/TaskSwitcher.jsx';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container style={{ marginTop: '20px' }}>
      <h1 style={{ marginBottom: '10px' }}>Tuesday</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#555' }}>Task Manager</h2>
      <TaskSwitcher />
    </Container>
  );
};

export default App;