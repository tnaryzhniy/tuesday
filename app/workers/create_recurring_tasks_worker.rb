class CreateRecurringTasksWorker
  include Sidekiq::Worker

  def perform
    Project.find_each do |project|
      task = Task.create(name: "New Task #{Time.now}", project: project)
      TuesdaySchema.subscriptions.trigger('taskCreated', { project_id: project.id }, task.as_json)
    end
  end
end
