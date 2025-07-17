package main

import (
	"context"
	"log"

	"github.com/Stealthhy7512/simple-todo-app/config"
	"github.com/Stealthhy7512/simple-todo-app/handler"
	"github.com/Stealthhy7512/simple-todo-app/repository"
	"github.com/Stealthhy7512/simple-todo-app/router"
	"github.com/Stealthhy7512/simple-todo-app/service"
	"github.com/gin-gonic/gin"
	// "github.com/gin-gonic/gin"
	// "net/http"
)

func main() {
	gin.ForceConsoleColor()

	cfg := config.LoadEnv()

	client, err := config.ConnectMongo(cfg.MongoURI)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Println("Error disconnecting from MongoDB: ", err)
		} else {
			log.Println("Disconnected from MongoDB.")
		}
	}()

	db := client.Database(cfg.Database)
	taskRepo := repository.NewRepository(db)
	taskService := &service.TaskService{
		TaskRepo: taskRepo,
	}
	taskHandler := &handler.TaskHandler{
		TaskService: taskService,
	}
	r := router.SetupRouter(taskHandler)

	r.Run("localhost:" + cfg.ServerPort)
}
