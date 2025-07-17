package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type TaskRepository interface {
	// FindById(c context.Context, id bson.ObjectID) (*model.Task, error)
	// Create(c context.Context, task *model.Task) (*model.Task, error)
	FindAll(c context.Context) ([]*model.Task, error)
	Seed(c context.Context) (*model.Task, error)
}

type taskRepository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) TaskRepository {
	return &taskRepository{
		collection: db.Collection("tasks"),
	}
}

func (r *taskRepository) FindAll(c context.Context) ([]*model.Task, error) {
	cursor, err := r.collection.Find(c, bson.D{})
	if err != nil {
		return nil, fmt.Errorf("failed to find tasks: %w", err)
	}

	defer cursor.Close(c)

	var tasks []*model.Task
	if err := cursor.All(c, &tasks); err != nil {
		return nil, fmt.Errorf("failed to decode tasks: %w", err)
	}

	return tasks, nil
}

func (r *taskRepository) Seed(c context.Context) (*model.Task, error) {
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
