package handler

import (
	"net/http"

	"github.com/Stealthhy7512/simple-todo-app/model"
	"github.com/Stealthhy7512/simple-todo-app/service"
	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	TaskService *service.TaskService
}

func (h *TaskHandler) Seed(c *gin.Context) {
	task, err := h.TaskService.Seed(c.Request.Context())
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

func (h *TaskHandler) Create(c *gin.Context) {
	var t model.Task
	if err := c.Bind(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newTask, err := h.TaskService.Create(c.Request.Context(), &t)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newTask)
}

func (h *TaskHandler) Update(c *gin.Context) {
	var t model.Task
	if err := c.Bind(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updatedTask, err := h.TaskService.Update(c.Request.Context(), &t)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedTask)
}
