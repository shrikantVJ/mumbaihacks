"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import CreateTaskForm from "./CreateTaskForm";

// Dummy data for initial tasks
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
  },
  {
    id: 2,
    name: "Bug fixing",
    priority: "medium",
    skillMatch: 92,
    deadline: "2024-03-10",
    status: "pending",
    description: "Fix reported issues in the dashboard",
    employeeId: "EMP002",
  },
  {
    id: 3,
    name: "Documentation update",
    priority: "low",
    skillMatch: 78,
    deadline: "2024-03-20",
    status: "completed",
    description: "Update user manual with new features",
    employeeId: "EMP003",
  },
];

export default function TaskDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // This effect would typically fetch tasks from an API
    // For now, we're using the initialTasks as dummy data
    setTasks(initialTasks);
  }, []);

  const addTask = (newTask) => {
    // In a real app, this would send a POST request to the API
    const taskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks([...tasks, taskWithId]);
    setIsFormOpen(false);
  };

  const deleteTask = (taskId) => {
    // In a real app, this would send a DELETE request to the API
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 p-2 hover:bg-red-400";
      case "medium":
        return "bg-orange-500 p-2 hover:bg-orange-400";
      case "low":
        return "bg-green-500 p-2 hover:bg-green-400";
      default:
        return "bg-blue-500 p-2 hover:bg-blue-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800 p-2 hover:bg-yellow-400";
      case "in progress":
        return "bg-blue-200 text-blue-800 p-2 hover:bg-blue-400";
      case "completed":
        return "bg-green-200 text-green-800 p-2 hover:bg-green-400";
      default:
        return "bg-gray-200 text-gray-800 p-2 hover:bg-gray-400";
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterStatus === "" || task.status === filterStatus) &&
      (!selectedDate || task.deadline === format(selectedDate, "yyyy-MM-dd"))
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-blue-800">
          Task Dashboard
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-auto"
        >
          <Button
            onClick={() => setIsFormOpen(true)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Task
          </Button>
        </motion.div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[180px] justify-start text-left font-normal"
              >
                <Filter className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <CreateTaskForm
              onSubmit={addTask}
              onClose={() => setIsFormOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-lg  overflow-hidden px-4 py-2 mt-8 border border-zinc-300"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Task Name
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("priority")}
              >
                Priority
                {sortConfig.key === "priority" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("skillMatch")}
              >
                Skill Match
                {sortConfig.key === "skillMatch" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("deadline")}
              >
                Deadline
                {sortConfig.key === "deadline" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("status")}
              >
                Status
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getPriorityColor(task.priority)} text-white`}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.skillMatch}%</TableCell>
                <TableCell>
                  {new Date(task.deadline).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.employeeId}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
