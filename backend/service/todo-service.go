package service

import (
	"context"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"github.com/Stealthhy7512/simple-todo-app/repository"
)

type TodoService struct {
	TodoRepo repository.TodoRepository
}

// func (s *TodoService) GetTodoById(c context.Context, id bson.ObjectID) (*model.Task, error) {
// 	return s.TodoRepo.FindById(c, id)
// }

// func (s *TodoService) CreateTodo(c context.Context, todo *model.Task)

func (s *TodoService) SeedTask(c context.Context) (*model.Task, error) {
	return s.TodoRepo.Seed(c)
}
