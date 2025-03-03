import { ApolloLink, Observable } from '@apollo/client';

class ActionCableLink extends ApolloLink {
  constructor({ cable, channelName = 'GraphqlChannel' }) {
    super();
    this.cable = cable;
    this.channelName = channelName;
  }

  request(operation) {
    return new Observable((observer) => {
      const query = operation.query.loc && operation.query.loc.source.body;
      const variables = operation.variables;

      const subscription = this.cable.subscriptions.create(
        { channel: this.channelName },
        {
          received: (data) => {
            observer.next(data);
          },
          disconnected: () => observer.complete(),
          rejected: () =>
            observer.error(new Error('Subscription rejected by the server')),
        }
      );

      subscription.perform('execute', { query, variables });

      return () => {
        this.cable.subscriptions.remove(subscription);
      };
    });
  }
}

export default ActionCableLink;
