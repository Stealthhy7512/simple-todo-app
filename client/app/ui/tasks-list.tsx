'use client'

import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import { Task } from '@/app/lib/definitions'
import {FcHighPriority, FcInfo} from 'react-icons/fc';
import TaskDetails from '@/app/ui/task-details';
import axios from 'axios';

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const openSheet = (task: Task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>('/api/find/all')
        setTasks(res.data)
      } catch (err) {
        console.error('Failed to fetch tasks: ', err)
      }
    }

    fetchTasks()
  }, [])

  const handleSave = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(t => (t === selectedTask ? updatedTask : t))
    )
    setOpen(false)
  }

  const handleNewTask = async () => {
    const title = newTaskTitle.trim()
    if (!title) return

    const newTask: Task = {
      title,
      description: '',
      date: null,
      priority: false,
    }

    try {
      const res = await axios.post<Task>('/api/create', newTask)
      setTasks(prev => [...prev, res.data])
      setNewTaskTitle('')
      inputRef.current?.focus()
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNewTask()
    }
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-4 max-w-3xl mx-auto w-full">
        {tasks.map((task, i) => (
          <button
            key={i}
            className="w-full rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition p-4 flex justify-between items-center text-left"
            onClick={() => openSheet(task)}
          >
            <div className="flex items-center gap-2 text-base font-medium">
              {task.priority && <FcHighPriority className="w-5 h-5" />}
              <span>{task.title || "Untitled Task"}</span>
            </div>
            <FcInfo className="w-5 h-5 shrink-0" />
          </button>
        ))}

        {/* ✅ New Task Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleNewTask()
          }}
        >
          <Input
            ref={inputRef}
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-base mt-2 bg-background border-muted focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </form>
      </div>

      <TaskDetails
        open={open}
        setOpenAction={setOpen}
        task={selectedTask}
        onSaveAction={handleSave}
      />
    </div>
  )
}
