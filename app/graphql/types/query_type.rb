# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :projects, [Types::ProjectType], null: false do
      argument :id, ID, required: false
      argument :name, String, required: false
    end

    field :tasks, [Types::TaskType], null: false do
      argument :id, ID, required: false
      argument :name, String, required: false
      argument :projectId, ID, required: true
    end

    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    def projects
      Project.all
    end

    def tasks(projectId:)
      Task.where(project_id: projectId)
    end
  end
end
