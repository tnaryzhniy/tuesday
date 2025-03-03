import { useSubscription, gql } from '@apollo/client';

const TASK_CREATED = gql`
  subscription OnTaskCreated($projectId: ID!) {
    taskCreated(projectId: $projectId) {
      id
      name
    }
  }
`;

const useTaskSubscription = (projectId, updateTasks) => {
  console.log("Подписка инициализирована для projectId:", projectId);
  useSubscription(TASK_CREATED, {
    variables: { projectId },
    onData: ({ data }) => {
      console.log("Получены данные подписки:", data);
      updateTasks(data.data.taskCreated);
    },
    onError: (error) => {
      console.error("Ошибка подписки:", error);
    },
  });
};

export default useTaskSubscription;
