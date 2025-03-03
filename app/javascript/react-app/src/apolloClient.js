import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { Consumer } from 'actioncable';
import ActionCableLink from './actionCableLink';

// HTTP-ссылка для обычных запросов
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

// Создаем экземпляр Consumer для ActionCable напрямую
const cable = new Consumer('ws://localhost:3000/cable');

// Создаем ссылку для подписок через наш кастомный ActionCableLink
const actionCableLink = new ActionCableLink({ cable, channelName: 'GraphqlChannel' });

// Разделяем линки: подписки через ActionCableLink, остальные запросы через HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  actionCableLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

