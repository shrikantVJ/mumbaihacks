"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { ChevronDown, ChevronUp, Check, AlertCircle, Edit, Trash2, Search, Filter, SortAsc, SortDesc } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const initialTasks = [
  {
    id: 1,
    name: "Develop new feature",
    priority: "high",
    skillMatch: 85,
    deadline: "2024-03-15",
    status: "in progress",
    description: "Implement user authentication system",
    employeeId: "EMP001",
    employeeName: "John Doe",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Fix critical bug",
    priority: "urgent",
    skillMatch: 95,
    deadline: "2024-02-28",
    status: "todo",
    description: "Address security vulnerability in payment gateway",
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Update documentation",
    priority: "low",
    skillMatch: 70,
    deadline: "2024-04-30",
    status: "in progress",
    description: "Review and update API documentation for v2.0",
    employeeId: "EMP003",
    employeeName: "Bob Johnson",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
  },
]

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

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const cardVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" },
  }

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: "auto" },
  }

  const isOverdue = isBefore(new Date(task.deadline), new Date()) && task.status !== "completed"
  const isDueToday = isToday(new Date(task.deadline)) && task.status !== "completed"

  return (
    <motion.div
      layout
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className={`mb-4 ${task.status === "completed" ? "opacity-50" : ""}`}
    >
      <Card className={`w-full bg-white dark:bg-gray-800 border-l-4 ${
        isOverdue ? "border-l-red-500" : isDueToday ? "border-l-yellow-500" : "border-l-blue-500"
      } shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.name}</CardTitle>
            <Badge className={`${priorityColors[task.priority]} capitalize px-2 py-1 text-xs font-semibold rounded-full border`}>
              {task.priority}
            </Badge>
          </div>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Due: {format(new Date(task.deadline), "MMM d, yyyy")}
            {isOverdue && <span className="ml-2 text-red-500 font-semibold">Overdue!</span>}
            {isDueToday && <span className="ml-2 text-yellow-500 font-semibold">Due today!</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Skill Match</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{task.skillMatch}%</span>
          </div>
          <Progress value={task.skillMatch} className="w-full h-2 bg-gray-200 dark:bg-gray-700"  />
          <div className="mt-4 flex items-center justify-between">
            <Badge className={`${statusColors[task.status]} capitalize px-2 py-1 text-xs font-semibold rounded-full border`}>
              {task.status}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-gray-800">
                    <AvatarImage src={task.employeeAvatar} alt={task.employeeName} />
                    <AvatarFallback>{task.employeeName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{task.employeeName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={contentVariants}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{task.description}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Employee ID: {task.employeeId}</p>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "todo")}>
                    To Do
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "in progress")}>
                    In Progress
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "completed")}>
                    Completed
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
        <CardFooter className="pt-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Less Details
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" /> More Details
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const Task = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [sortBy, setSortBy] = useState("deadline")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulated API call to fetch tasks
    // In a real application, you would fetch tasks from an API here
    // Example:
    // const fetchTasks = async () => {
    //   const response = await fetch('/api/tasks');
    //   const data = await response.json();
    //   setTasks(data);
    // };
    // fetchTasks();
  }, [])

  const handleStatusChange = (taskId, newStatus) => {
    // In a real application, you would update the task status via an API call
    // Example:
    // const updateTaskStatus = async (taskId, newStatus) => {
    //   await fetch(`/api/tasks/${taskId}`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ status: newStatus })
    //   });
    // };
    // updateTaskStatus(taskId, newStatus);

    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDeleteTask = (taskId) => {
    // In a real application, you would delete the task via an API call
    // Example:
    // const deleteTask = async (taskId) => {
    //   await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    // };
    // deleteTask(taskId);

    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const toggleFilterPriority = (priority) => {
    setFilterPriority(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    )
  }

  const sortedAndFilteredTasks = tasks
    .filter(task => 
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority.length === 0 || filterPriority.includes(task.priority)) &&
      (task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return sortOrder === "asc" 
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline)
      } else if (sortBy === "priority") {
        const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 }
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Task Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === "deadline" ? "default" : "outline"}
            onClick={() => setSortBy("deadline")}
            className="w-36"
          >
            By Deadline
          </Button>
          <Button
            variant={sortBy === "priority" ? "default" : "outline"}
            onClick={() => setSortBy("priority")}
            className="w-36"
          >
            By Priority
          </Button>
          <Button variant="outline" onClick={toggleSortOrder} className="w-36">
            {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                Filter Priority
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-4 space-y-2">
                {["low", "medium", "high", "urgent"].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={priority}
                      checked={filterPriority.includes(priority)}
                      onCheckedChange={() => toggleFilterPriority(priority)}
                    />
                    <Label  htmlFor={priority} className="capitalize">{priority}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default Task