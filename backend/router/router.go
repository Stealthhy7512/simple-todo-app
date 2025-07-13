package router

import (
	"net/http"

	"github.com/Stealthhy7512/simple-todo-app/handler"
	"github.com/gin-gonic/gin"
)

func SetupRouter(h *handler.TaskHandler) *gin.Engine {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.POST("/seed", h.SeedTask)

	return r
}
