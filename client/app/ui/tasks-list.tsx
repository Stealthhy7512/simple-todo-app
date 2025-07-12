'use client'

import React, { useState } from 'react'
import { Task } from '@/app/lib/definitions'
import TaskDetails from '@/app/ui/task-details'
import { FcHighPriority, FcInfo } from 'react-icons/fc'

const initialTasks: Task[] = [
  {
    title: 'Prepare for concert',
    description: 'Take a shower, brush teeth, get dressed.',
    date: new Date(2025, 6, 6),
    priority: true,
  },
  {
    title: 'Task two',
    description: 'Task two description',
    date: null,
    priority: false,
  },
  {
    title: '',
    description: '',
    date: null,
    priority: false,
  }
]

export default function TasksList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const openSheet = (task: Task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  const handleSave = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(t =>
        t === selectedTask ? updatedTask : t
      )
    )
    setOpen(false)
  }

  return (
    <div className="flex-1 overflow-hidden py-4 flex justify-center">
      <div className="bg-stone-100 rounded-xl p-3 flex-grow overflow-hidden mx-auto flex flex-col items-center">
        {tasks.map((task, i) => (
          <button
            key={i}
            className="m-2 my-3 bg-stone-200 p-3 rounded-xl w-1/2 flex items-center justify-between gap-4 break-all whitespace-pre-wrap text-left"
            onClick={() => openSheet(task)}
          >
            <div className="flex items-center gap-2">
              {task.priority && <FcHighPriority className="w-5 h-5" />}
              <span>{task.title || ''}</span>
            </div>
            <span className="hover:scale-110 hover:text-blue-500 transition">
              <FcInfo className="w-5 h-5 shrink-0" />
            </span>
          </button>
        ))}
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
