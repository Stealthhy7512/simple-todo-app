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
      setDate(task.date ?? undefined)
      setDateEnable(task.date !== null)
      setPriority(task.priority)
    }
  }, [task])

  const handleSave = () => {
    if (!task) return

    const updatedTask: Task = {
      ...task,
      title,
      description,
      date: dateEnable ? date ?? null : null,
      priority,
    }

    onSaveAction(updatedTask)
  }

  return (
    <Sheet open={open} onOpenChange={setOpenAction}>
      <SheetContent side="right" className="md:w-full w-1/3 p-4">
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
              {dateEnable && (
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={setDate}
                  />
                </div>
              )}
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
