import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import TaskList from './TaskList';
import TaskGrid from './TaskGrid';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
    }
  }
`;

const TaskSwitcher = () => {
  const [view, setView] = useState('list');
  const [projectId, setProjectId] = useState(null);
  const { loading, error, data } = useQuery(GET_PROJECTS);

  useEffect(() => {
    const savedProjectId = localStorage.getItem('selectedProjectId');
    const savedView = localStorage.getItem('selectedView');

    if (savedProjectId) {
      setProjectId(savedProjectId);
    }
    if (savedView) {
      setView(savedView);
    }
  }, []);

  const handleProjectChange = (e) => {
    const newProjectId = e.target.value;
    setProjectId(newProjectId);
    localStorage.setItem('selectedProjectId', newProjectId);
  };

  const handleViewChange = () => {
    const newView = view === 'list' ? 'grid' : 'list';
    setView(newView);
    localStorage.setItem('selectedView', newView);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', maxWidth: '600px' }}>
        <Form.Group controlId="selectProject">
          <Form.Label style={{ fontWeight: 'bold' }}>Select Project</Form.Label>
        </Form.Group>
        <Form.Group controlId="projectSelect">
          <Form.Control as="select" value={projectId} onChange={handleProjectChange} disabled={!data} style={{ width: 'auto', display: 'inline-block' }}>
            {data.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </Form.Control>
          <Button variant="secondary" onClick={handleViewChange} style={{ marginLeft: '10px' }}>
            {view === 'list' ? 'Switch to Grid View' : 'Switch to List View'}
          </Button>
        </Form.Group>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px' }}>
        {view === 'list' ? (
          <TaskList projectId={projectId} />
        ) : (
          <TaskGrid projectId={projectId} />
        )}
      </div>
    </div>
  );
};

export default TaskSwitcher;
