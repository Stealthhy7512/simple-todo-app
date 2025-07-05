'use client'

import React, { useState } from 'react';
// import { showProperties } from '@/app/lib/actions';
import { Task } from '@/app/lib/definitions'
import { useSidebar } from '@/hooks/use-sidebar';
import { HiChevronLeft } from "react-icons/hi";
import {cn} from '@/lib/utils';
import {Sheet, SheetContent, SheetClose, SheetHeader, SheetTitle, SheetFooter} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const tasks: Task[] = [
  {
    title: 'task one',
    description: 'Task one description',
    date: '30/12/2002'
  },
  {
    title: 'task two',
    description: 'Task two description',
    date: '02/2/1998'
  }
]

export default function TasksList() {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [dateOpen, setDateOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const showProperties = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  }

  const openSheet = (task: Task) => {
    setSelectedTask(task)
    setOpen(true)
  }
  return (
    <div className="flex-1 overflow-hidden py-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex h-full w-full">
          <div className="bg-stone-100 rounded-xl p-4 flex-grow overflow-hidden">
            {
              tasks.map((task: Task, i: number) => {
                return (
                  <button
                    key={i}
                    className="m-2 my-4 bg-stone-200 p-3 rounded-xl w-full break-all whitespace-pre-wrap text-left"
                    // onClick={showProperties}
                    onClick={() => openSheet(task)}
                  >
                    {task.title}
                  </button>
                )})
            }
          </div>
          <SheetContent side="right" className="md:w-full w-1/3 p-4">
            <div className="flex justify-between items-center mb-0">
              <SheetHeader>
                <SheetTitle className="font-bold text-2xl">Details</SheetTitle>
              </SheetHeader>
            </div>

            {selectedTask && (
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={selectedTask.title} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="descripton">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={selectedTask.description}
                    className="resize-none h-36"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="date">End Date</Label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {selectedTask.date ? selectedTask.date : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date)
                          setOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            <SheetFooter>
              <Button type="submit">Save Changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </div>
      </Sheet>
    </div>
  )
}