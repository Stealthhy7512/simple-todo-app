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

func (s *TaskService) Create(c context.Context, t *model.Task) (*model.Task, error) {
	return s.TaskRepo.Create(c, t)
}

func (s *TaskService) Seed(c context.Context) (*model.Task, error) {
	return s.TaskRepo.Seed(c)
}

func (s *TaskService) FindAll(c context.Context) ([]*model.Task, error) {
	return s.TaskRepo.FindAll(c)
}

func (s *TaskService) Update(c context.Context, t *model.Task) (*model.Task, error) {
	return s.TaskRepo.Update(c, t)
}
