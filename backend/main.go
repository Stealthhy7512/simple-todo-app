package main

import (
	"context"
	"log"

	"github.com/Stealthhy7512/simple-todo-app/config"
	"github.com/Stealthhy7512/simple-todo-app/router"
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
	r := router.SetupRouter()
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

	r.Run(":" + cfg.ServerPort)
}
