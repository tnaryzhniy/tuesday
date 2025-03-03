# frozen_string_literal: true

class Subscriptions::TaskCreated < Subscriptions::BaseSubscription
   field :task_created, Types::TaskType, null: false do
     argument :project_id, ID, required: true
   end
end
