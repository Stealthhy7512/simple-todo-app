package handler

import (
	"net/http"

	"github.com/Stealthhy7512/simple-todo-app/service"
	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	TaskService *service.TaskService
}

func (h *TaskHandler) SeedTask(c *gin.Context) {
	task, err := h.TaskService.SeedTask(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) FindAll(c *gin.Context) {
	tasks, err := h.TaskService.FindAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(tasks) == 0 {
		c.Status(http.StatusNoContent)
		return
	}

	c.JSON(http.StatusOK, tasks)
}
