class CreateRecurringTasksWorker
  include Sidekiq::Worker

  def perform
    Project.find_each do |project|
      Task.create(name: "New Task #{Time.now}", project: project)
    end
  end
end