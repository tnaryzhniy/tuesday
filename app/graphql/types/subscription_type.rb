module Types
  class SubscriptionType < BaseObject
    field :task_created, subscription: Subscriptions::TaskCreated
  end
end
