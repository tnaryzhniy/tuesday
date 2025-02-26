module Types
  class TaskType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :project_id, ID, null: false
  end
end