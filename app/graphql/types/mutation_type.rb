# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_task, Types::TaskType, null: false do
      argument :name, String, required: true
      argument :project_id, ID, required: true
    end

    def create_task(name:, project_id:)
      Task.create(name: name, project_id: project_id)
    end
  end
end
