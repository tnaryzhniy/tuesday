project1 = Project.create(name: "Project 1")
project2 = Project.create(name: "Project 2")

Task.create(name: "Task 1", project: project1)
Task.create(name: "Task 2", project: project1)
Task.create(name: "Task 3", project: project2)
Task.create(name: "Task 4", project: project2)