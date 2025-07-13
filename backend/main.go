package main

import (
	"context"
	"log"

	"github.com/Stealthhy7512/simple-todo-app/config"
	"github.com/Stealthhy7512/simple-todo-app/handler"
	"github.com/Stealthhy7512/simple-todo-app/repository"
	"github.com/Stealthhy7512/simple-todo-app/router"
	"github.com/Stealthhy7512/simple-todo-app/service"
	// "github.com/gin-gonic/gin"
	// "net/http"
)

func main() {
	// router := gin.Default()

	// router.GET("/", func(c *gin.Context) {
	// 	c.String(200, "Hello")
	// })

	// router.GET("/bye", func(c *gin.Context) {
	// 	c.String(200, "Bye")
	// })

	// router.Run(":8080")

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
	todoRepo := repository.NewRepository(db)
	todoService := &service.TodoService{
		TodoRepo: todoRepo,
	}
	todoHandler := &handler.TaskHandler{
		TodoService: todoService,
	}
	r := router.SetupRouter(todoHandler)

	r.Run(":" + cfg.ServerPort)
}
