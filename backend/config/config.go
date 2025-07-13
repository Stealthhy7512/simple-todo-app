package config

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

type Config struct {
	MongoURI   string
	ServerPort string
	Database   string
}

func LoadEnv() Config {
	if err := godotenv.Load(); err != nil {
		log.Fatal(".env file not found.")
	}

	return Config{
		MongoURI:   getEnv("MONGO_URI"),
		ServerPort: getEnv("PORT"),
		Database:   getEnv("DATABASE"),
	}
}

func getEnv(key string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return ""
}

func ConnectMongo(uri string) (*mongo.Client, error) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(opts)
	if err != nil {
		return nil, err
	}

	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return nil, err
	}

	log.Println("\nPinged deployment. Successfully connected to MongoDB.")

	return client, nil
}
