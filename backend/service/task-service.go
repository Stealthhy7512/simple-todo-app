package service

import (
	"context"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"github.com/Stealthhy7512/simple-todo-app/repository"
)

type TaskService struct {
	TaskRepo repository.TaskRepository
}

// func (s *TodoService) GetTodoById(c context.Context, id bson.ObjectID) (*model.Task, error) {
// 	return s.TodoRepo.FindById(c, id)
// }

// func (s *TodoService) CreateTodo(c context.Context, todo *model.Task)

func (s *TaskService) SeedTask(c context.Context) (*model.Task, error) {
	return s.TaskRepo.Seed(c)
}

func (s *TaskService) FindAll(c context.Context) ([]*model.Task, error) {
	return s.TaskRepo.FindAll(c)
}
