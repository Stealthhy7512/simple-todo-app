package repository

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type TaskRepository interface {
	// FindById(c context.Context, id bson.ObjectID) (*model.Task, error)
	Create(c context.Context, t *model.Task) (*model.Task, error)
	FindAll(c context.Context) ([]*model.Task, error)
	Seed(c context.Context) (*model.Task, error)
	Update(c context.Context, t *model.Task) (*model.Task, error)
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
	now := time.Now()
	t := &model.Task{
		ID:          bson.NewObjectID(),
		Title:       "Test task",
		Description: "Example description",
		Date:        &now,
		Priority:    true,
	}

	_, err := r.collection.InsertOne(c, t)
	if err != nil {
		return nil, err
	}
	return t, nil
}

func (r *taskRepository) Create(c context.Context, t *model.Task) (*model.Task, error) {
	t.ID = bson.NewObjectID()

	result, err := r.collection.InsertOne(c, t)
	if err != nil {
		return nil, err
	}
	log.Printf("task inserted with id: %v", result.InsertedID)

	return t, nil
}

func (r *taskRepository) Update(c context.Context, t *model.Task) (*model.Task, error) {
	f := bson.M{"_id": t.ID}
	u := bson.D{
		{Key: "$set", Value: bson.D{
			{Key: "title", Value: t.Title},
			{Key: "description", Value: t.Description},
			{Key: "date", Value: t.Date},
			{Key: "priority", Value: t.Priority},
		}},
	}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	var updatedTask model.Task
	err := r.collection.FindOneAndUpdate(c, f, u, opts).Decode(&updatedTask)
	if err != nil {
		return nil, err
	}

	return &updatedTask, nil
}
