import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      name
    }
  }
`;