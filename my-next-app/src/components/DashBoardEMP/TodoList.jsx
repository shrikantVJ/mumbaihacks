"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Plus, X, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-green-100 text-green-800 border-green-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  "in progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
}

// Sample task breakdown function (to be replaced with AI later)
const breakDownTask = (taskDescription) => {
  const subtasks = [
    "Research the topic",
    "Create an outline",
    "Write the introduction",
    "Develop the main content",
    "Write the conclusion",
    "Proofread and edit",
    "Format the document",
    "Submit the final version"
  ]
  return subtasks.map((title, index) => ({
    id: index,
    title,
    completed: false
  }))
}

const TaskItem = ({ task, onToggleSubtask, onDeleteTask, onUpdateTaskStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [subtasks, setSubtasks] = useState([])

  useEffect(() => {
    if (isExpanded && subtasks.length === 0) {
      setSubtasks(breakDownTask(task.description))
    }
  }, [isExpanded, task.description, subtasks.length])

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const handleToggleSubtask = (subtaskId) => {
    setSubtasks(subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    ))
    onToggleSubtask(task.id, subtaskId)
  }

  const completedSubtasks = subtasks.filter(st => st.completed).length
  const progress = subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.name}</CardTitle>
            <Badge className={`${priorityColors[task.priority]} capitalize px-2 py-1 text-xs font-semibold rounded-sm border`}>
              {task.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full h-2 bg-gray-200 dark:bg-gray-700" indicatorclassname="bg-blue-500" />
          <div className="mt-4 flex items-center justify-between">
            <Badge className={`${statusColors[task.status]} capitalize px-2 py-1 text-xs font-semibold rounded-sm border`}>
              {task.status}
            </Badge>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onUpdateTaskStatus(task.id, "completed")}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as Completed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onDeleteTask(task.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="outline" size="sm" onClick={toggleExpand}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4 space-y-2">
                  {subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`subtask-${task.id}-${subtask.id}`}
                        checked={subtask.completed}
                        onCheckedChange={() => handleToggleSubtask(subtask.id)}
                      />
                      <Label
                        htmlFor={`subtask-${task.id}-${subtask.id}`}
                        className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}
                      >
                        {subtask.title}
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Develop new feature",
      priority: "high",
      status: "in progress",
      description: "Implement user authentication system",
    },
    {
      id: 2,
      name: "Fix critical bug",
      priority: "urgent",
      status: "todo",
      description: "Address security vulnerability in payment gateway",
    },
    {
      id: 3,
      name: "Update documentation",
      priority: "low",
      status: "in progress",
      description: "Review and update API documentation for v2.0",
    },
  ])

  const handleToggleSubtask = (taskId, subtaskId) => {
    // In a real application, you would update the subtask status via an API call
    console.log(`Toggled subtask ${subtaskId} for task ${taskId}`)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    // In a real application, you would delete the task via an API call
  }

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
    // In a real application, you would update the task status via an API call
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Task Breakdown</h1>
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleSubtask={handleToggleSubtask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TodoList