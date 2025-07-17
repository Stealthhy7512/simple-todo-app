package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Task struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string        `bson:"title" json:"title"`
	Description string        `bson:"description" json:"description"`
	Date        time.Time     `bson:"date" json:"date"`
	Priority    bool          `bson:"priority" json:"priority"`
}
