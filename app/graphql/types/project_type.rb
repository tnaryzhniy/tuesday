module Types
  class ProjectType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :tasks, [Types::TaskType], null: true
  end
end