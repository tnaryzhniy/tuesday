module Types
  class SubscriptionType < BaseObject
    field :task_created, Types::TaskType, null: false do
      argument :project_id, ID, required: true
    end
  end
end
