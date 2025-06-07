import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  UserPlus,
  Briefcase,
  Calendar as CalendarIcon,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

// Simulated data (in a real app, this would come from an API)
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
    name: "Fix critical bug",
    priority: "high",
    skillMatch: 90,
    deadline: "2024-02-28",
    status: "todo",
    description: "Address security vulnerability in payment gateway",
    employeeId: null,
  },
  {
    id: 3,
    name: "Update documentation",
    priority: "low",
    skillMatch: 70,
    deadline: "2024-04-30",
    status: "todo",
    description: "Review and update API documentation",
    employeeId: null,
  },
];

const employees = [
  {
    id: "EMP001",
    name: "Alice Johnson",
    skills: ["React", "Node.js", "Python"],
    workload: 3,
    availability: 0.7,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "EMP002",
    name: "Bob Smith",
    skills: ["Java", "C++", "DevOps"],
    workload: 2,
    availability: 0.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "EMP003",
    name: "Charlie Brown",
    skills: ["UI/UX", "Figma", "JavaScript"],
    workload: 1,
    availability: 0.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "EMP004",
    name: "Diana Prince",
    skills: ["Data Science", "Machine Learning", "Python"],
    workload: 4,
    availability: 0.5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

const statusColors = {
  todo: "bg-slate-100 text-slate-800 border-slate-200",
  "in progress": "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

function SortableTask({
  task,
  employees,
  onAssign,
  onStatusChange,
  onPriorityChange,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-4 cursor-move hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-blue-700">{task.name}</CardTitle>
            <div className="flex space-x-2">
              <Badge
                className={`${
                  priorityColors[task.priority]
                } transition-colors duration-300`}
              >
                {task.priority}
              </Badge>
              <Badge
                className={`${
                  statusColors[task.status]
                } transition-colors duration-300`}
              >
                {task.status}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-gray-600">
            {task.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Skill Match:</span>
              <Progress
                value={task.skillMatch}
                className="w-2/3"
                indicatorcolor="bg-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Deadline:</span>
              <span className="text-sm text-blue-600 font-semibold">
                {task.deadline}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Assigned to:</span>
              {task.employeeId ? (
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={
                        employees.find((e) => e.id === task.employeeId).avatar
                      }
                    />
                    <AvatarFallback>
                      {employees
                        .find((e) => e.id === task.employeeId)
                        .name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-blue-700">
                    {employees.find((e) => e.id === task.employeeId).name}
                  </span>
                </div>
              ) : (
                <Select onValueChange={(value) => onAssign(task.id, value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Assign..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Status:</span>
              <Select
                defaultValue={task.status}
                onValueChange={(value) => onStatusChange(task.id, value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Priority:</span>
              <Select
                defaultValue={task.priority}
                onValueChange={(value) => onPriorityChange(task.id, value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export default function SkillBasedAssignment() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: "medium",
    skillMatch: 50,
    deadline: "",
    status: "todo",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Simulated API call to fetch tasks
    const fetchTasks = async () => {
      try {
        // const response = await fetch('/api/tasks');
        // const data = await response.json();
        // setTasks(data);
        setTasks(initialTasks); // Using initialTasks as placeholder
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((t) => t.id === active.id);
        const newIndex = tasks.findIndex((t) => t.id === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });

      // Simulated API call to update task order
      // updateTaskOrder(arrayMove(tasks, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const handleCreateTask = useCallback(() => {
    if (newTask.name && newTask.description && newTask.deadline) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        employeeId: null,
      };
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask({
        name: "",
        description: "",
        priority: "medium",
        skillMatch: 50,
        deadline: "",
        status: "todo",
      });

      // Generate AI-powered suggestions
      const aiSuggestions = generateAISuggestions(task, employees);
      setSuggestions(aiSuggestions);

      // Simulated API call to create a new task
      // createTask(task);
    }
  }, [newTask, tasks]);

  const assignTask = useCallback((taskId, employeeId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, employeeId } : t))
    );
    setSuggestions([]);

    // Simulated API call to update task assignment
    // updateTaskAssignment(taskId, employeeId);
  }, []);

  const changeTaskStatus = useCallback((taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status } : t))
    );

    // Simulated API call to update task status
    // updateTaskStatus(taskId, status);
  }, []);

  const changeTaskPriority = useCallback((taskId, priority) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, priority } : t))
    );

    // Simulated API call to update task priority
    // updateTaskPriority(taskId, priority);
  }, []);

  const generateAISuggestions = (task, employees) => {
    // Enhanced AI suggestion algorithm
    const taskKeywords = task.description.toLowerCase().split(" ");
    return employees
      .map((employee) => {
        const skillMatch = employee.skills.filter((skill) =>
          taskKeywords.some((keyword) => skill.toLowerCase().includes(keyword))
        ).length;
        const workloadFactor = 1 - employee.workload / 5;
        const deadlineFactor = calculateDeadlineFactor(task.deadline);
        const score =
          (skillMatch / employee.skills.length) * 0.4 +
          workloadFactor * 0.3 +
          employee.availability * 0.2 +
          deadlineFactor * 0.1;
        return { employee, score, skillMatch, workloadFactor };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ employee, score, skillMatch, workloadFactor }) => ({
        employeeId: employee.id,
        name: employee.name,
        reason: `${employee.name} has a ${(score * 100).toFixed(0)}% match:
          • Skills: ${((skillMatch / employee.skills.length) * 100).toFixed(
            0
          )}% relevant
          • Workload: ${(workloadFactor * 100).toFixed(0)}% capacity
          • Availability: ${(employee.availability * 100).toFixed(0)}%
          • Deadline suitability: ${(
            calculateDeadlineFactor(task.deadline) * 100
          ).toFixed(0)}%`,
      }));
  };

  const calculateDeadlineFactor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = (deadlineDate - today) / (1000 * 60 * 60 * 24);
    return Math.min(Math.max(daysUntilDeadline / 30, 0), 1); // Normalize to 0-1 range, max 30 days
  };

  const filteredTasks = tasks.filter(
    (task) => activeTab === "all" || task.status === activeTab
  );

  return (
    <div className="container mx-auto p-4  min-h-screen">
      <h1 className="text-4xl  font-bold mb-8 text-center text-blue-800">
        Enhanced Task Management
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-t-4 border-t-blue-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">
              Create New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-blue-600">
                  Task Name
                </Label>
                <Input
                  id="name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  placeholder="Enter task name"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="text-blue-600">
                  Task Description
                </Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Enter task description"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="priority" className="text-blue-600">
                    Priority
                  </Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, priority: value })
                    }
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deadline" className="text-blue-600">
                    Deadline
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal border-blue-200 focus:border-blue-500 ${
                          !newTask.deadline && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.deadline ? (
                          format(new Date(newTask.deadline), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          newTask.deadline
                            ? new Date(newTask.deadline)
                            : undefined
                        }
                        onSelect={(date) =>
                          setNewTask({
                            ...newTask,
                            deadline: date ? format(date, "yyyy-MM-dd") : "",
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="skillMatch" className="text-blue-600">
                  Skill Match Required
                </Label>
                <Slider
                  id="skillMatch"
                  min={0}
                  max={100}
                  step={1}
                  value={[newTask.skillMatch]}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, skillMatch: value[0] })
                  }
                  className="text-blue-500"
                />
                <div className="text-center mt-2 text-blue-700">
                  {newTask.skillMatch}%
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleCreateTask}
              className="w-full bg-blue-600 hover:bg-blue-700 h-[6dvh]"
            >
              Create Task
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-t-4 border-t-green-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">
              AI-Powered Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {suggestions.length > 0 ? (
                <ul className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.employeeId}
                      className="bg-white p-4 rounded-lg shadow-md border border-green-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage
                              src={
                                employees.find(
                                  (e) => e.id === suggestion.employeeId
                                ).avatar
                              }
                            />
                            <AvatarFallback>
                              {suggestion.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-green-700">
                            {suggestion.name}
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            assignTask(
                              tasks[tasks.length - 1].id,
                              suggestion.employeeId
                            )
                          }
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Assign
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {suggestion.reason}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mb-2 text-yellow-500" />
                  <p>
                    No suggestions available. Create a new task to see
                    AI-powered suggestions.
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-blue-100 h-[7dvh]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full"
            >
              All Tasks
            </TabsTrigger>
            <TabsTrigger
              value="todo"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full"
            >
              To Do
            </TabsTrigger>
            <TabsTrigger
              value="in progress"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              {activeTab === "all"
                ? "All Tasks"
                : `${
                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                  } Tasks`}
            </h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredTasks}
                strategy={verticalListSortingStrategy}
              >
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <SortableTask
                      key={task.id}
                      task={task}
                      employees={employees}
                      onAssign={assignTask}
                      onStatusChange={changeTaskStatus}
                      onPriorityChange={changeTaskPriority}
                    />
                  ))}
                </AnimatePresence>
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <SortableTask
                    task={tasks.find((task) => task.id === activeId)}
                    employees={employees}
                    onAssign={assignTask}
                    onStatusChange={changeTaskStatus}
                    onPriorityChange={changeTaskPriority}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          </TabsContent>
        </Tabs>
      </div>

      <Card className="mt-12 border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700">
            Employee Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <Card
                  key={employee.id}
                  className="bg-white border border-purple-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg text-purple-700">
                        {employee.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {employee.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-purple-100 text-purple-800"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          Workload: {employee.workload}/5
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          Availability:{" "}
                          {(employee.availability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
