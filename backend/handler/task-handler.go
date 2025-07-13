package handler

import (
	"net/http"

	"github.com/Stealthhy7512/simple-todo-app/service"
	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	TodoService *service.TodoService
}

func (h *TaskHandler) SeedTask(c *gin.Context) {
	task, err := h.TodoService.SeedTask(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, task)
}
