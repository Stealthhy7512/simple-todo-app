package router

import (
	"net/http"

	"github.com/Stealthhy7512/simple-todo-app/handler"
	"github.com/gin-gonic/gin"
)

func SetupRouter(h *handler.TaskHandler) *gin.Engine {
	r := gin.Default()

	test := r.Group("/test")
	{
		test.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		test.POST("/seed", h.SeedTask)

		test.GET("/find", h.FindAll)
	}

	// api := r.Group("/api")
	// {

	// }

	return r
}
