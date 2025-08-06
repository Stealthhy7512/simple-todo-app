package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Task struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title       string        `bson:"title" json:"title"`
	Description string        `bson:"description" json:"description"`
	Date        *time.Time    `bson:"date,omitempty" json:"date,omitempty"`
	Priority    bool          `bson:"priority" json:"priority"`
}
