import React from 'react';
import { useQuery } from '@apollo/client';
import useTaskSubscription from '../hooks/useTaskSubscription';
import { GET_TASKS } from '../graphql/queries';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useApolloClient } from '@apollo/client';

const TaskList = ({ projectId }) => {
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
    <ListGroup>
      {data.tasks.map((task) => (
        <ListGroup.Item key={task.id}>{task.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
