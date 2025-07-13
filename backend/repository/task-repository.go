package repository

import (
	"context"
	"time"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type TodoRepository interface {
	// FindById(c context.Context, id bson.ObjectID) (*model.Task, error)
	// Create(c context.Context, task *model.Task) (*model.Task, error)
	// FindAll(c context.Context) ([]*model.Task, error)
	Seed(c context.Context) (*model.Task, error)
}

type todoRepository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) TodoRepository {
	return &todoRepository{
		collection: db.Collection("tasks"),
	}
}

func (r *todoRepository) Seed(c context.Context) (*model.Task, error) {
	t := &model.Task{
		ID:          bson.NewObjectID(),
		Title:       "Test task",
		Description: "Example description",
		Date:        time.Now(),
		Priority:    true,
	}

	_, err := r.collection.InsertOne(c, t)
	if err != nil {
		return nil, err
	}
	return t, nil
}
