import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import useTaskSubscription from '../hooks/useTaskSubscription';
import { GET_TASKS } from '../graphql/queries';
import { Button, Row, Col, Spinner, Alert } from 'react-bootstrap';

const TaskGrid = ({ projectId }) => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  const updateTasks = (newTask) => {
    if (!data) return;
    client.writeQuery({
      query: GET_TASKS,
      variables: { projectId },
      data: {
        tasks: [...data.tasks, newTask],
      },
    });
  };

  useTaskSubscription(projectId, updateTasks);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <div style={{ marginBottom: '20px' }}>
      <Row>
        {data.tasks.map((task) => (
          <Col xs={12} sm={6} md={4} key={task.id} style={{ marginBottom: '15px' }}>
            <Button variant="primary" style={{ width: '100%' }}>
              {task.name}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskGrid;
