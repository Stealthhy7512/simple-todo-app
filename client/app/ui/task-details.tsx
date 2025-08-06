'use client'

import React, { useState, useEffect } from 'react'
import { Task } from '@/app/lib/definitions'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Switch } from '@/components/ui/switch'
import { FcCalendar, FcHighPriority } from 'react-icons/fc'
import axios from 'axios';

export default function TaskDetails({
                                      open,
                                      setOpenAction,
                                      task,
                                      onSaveAction,
                                    }: {
  open: boolean
  setOpenAction: (open: boolean) => void
  task: Task | null
  onSaveAction: (updatedTask: Task) => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dateEnable, setDateEnable] = useState(false)
  const [priority, setPriority] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)

      // handle undefined, null, or string/Date
      const rawDate = task.date
      const hasValidDate =
        rawDate !== undefined &&
        rawDate !== null &&
        !Number.isNaN(new Date(rawDate).getTime())

      setDateEnable(hasValidDate)
      setDate(hasValidDate ? new Date(rawDate as string | Date) : undefined)

      setPriority(task.priority)
    }
  }, [task])


  const handleSave = async () => {
    if (!task) return

    const updatedTask: Task = {
      ...task,
      title,
      description,
      date: dateEnable ? (date ?? null) : null,
      priority,
    }

    try {
      const res = await axios.put(`/api/update/${task.id}`, updatedTask)

      // Optional: Use server response if it returns full updated task
      const saved = res.data ?? updatedTask
      onSaveAction(saved)
      setOpenAction(false)
    } catch (err) {
      console.error("Failed to update task:", err)
      // Optional: show toast or error
    }
  }


  return (
    <Sheet open={open} onOpenChange={setOpenAction}>
      <SheetContent side="right" className="md:w-full w-1/3 p-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-bold text-2xl">Details</SheetTitle>
        </SheetHeader>

        {task && (
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            {/* Date */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FcCalendar className="w-5 h-5" />
                  <Label htmlFor="date">End Date</Label>
                </div>
                <Switch
                  id="date"
                  checked={dateEnable}
                  onCheckedChange={setDateEnable}
                />
              </div>
              <div className="flex justify-center">
                <Calendar
                  data-enabled={ dateEnable }
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={setDate}
                  className={
                  "data-[enabled=false]:slide-out-to-top data-[enabled=true]:slide-in-from-top data-[enabled=true]:block animate hidden"
                  }
                />
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <FcHighPriority className="w-5 h-5" />
                <Label htmlFor="priority">Priority</Label>
              </div>
              <Switch
                id="priority"
                checked={priority}
                onCheckedChange={setPriority}
              />
            </div>
          </div>
        )}

        <SheetFooter>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
