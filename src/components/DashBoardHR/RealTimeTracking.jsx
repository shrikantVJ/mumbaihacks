"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  BarChart2,
  Users,
} from "lucide-react";

// Simulated API call (replace with actual API call in production)
const fetchEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Sharma Rohit",
          avatar: "/placeholder.svg?height=40&width=40",
          currentTask: "Developing new feature",
          tasksCompleted: 5,
          productivity: 85,
          lastActivity: "2024-03-15T10:30:00",
          tasks: [
            {
              id: 101,
              name: "Implement user authentication",
              status: "completed",
              dueDate: "2024-03-20",
            },
            {
              id: 102,
              name: "Design dashboard layout",
              status: "in-progress",
              dueDate: "2024-03-25",
            },
            {
              id: 103,
              name: "Optimize database queries",
              status: "pending",
              dueDate: "2024-03-30",
            },
          ],
        },
        {
          id: 2,
          name: "Shrikant Jadhav",
          avatar: "/placeholder.svg?height=40&width=40",
          currentTask: "Code review",
          tasksCompleted: 3,
          productivity: 72,
          lastActivity: "2024-03-15T09:45:00",
          tasks: [
            {
              id: 201,
              name: "Review pull requests",
              status: "completed",
              dueDate: "2024-03-18",
            },
            {
              id: 202,
              name: "Update documentation",
              status: "pending",
              dueDate: "2024-03-22",
            },
            {
              id: 203,
              name: "Fix reported bugs",
              status: "in-progress",
              dueDate: "2024-03-24",
            },
          ],
        },
        {
          id: 3,
          name: "Harsiht Nikam",
          avatar: "/placeholder.svg?height=40&width=40",
          currentTask: "Testing new features",
          tasksCompleted: 4,
          productivity: 78,
          lastActivity: "2024-03-15T11:15:00",
          tasks: [
            {
              id: 301,
              name: "Write unit tests",
              status: "completed",
              dueDate: "2024-03-19",
            },
            {
              id: 302,
              name: "Perform integration testing",
              status: "in-progress",
              dueDate: "2024-03-23",
            },
            {
              id: 303,
              name: "Document test results",
              status: "pending",
              dueDate: "2024-03-26",
            },
          ],
        },
        {
          id: 4,
          name: "Ritesh Mane",
          avatar: "/placeholder.svg?height=40&width=40",
          currentTask: "UI/UX improvements",
          tasksCompleted: 6,
          productivity: 90,
          lastActivity: "2024-03-15T10:55:00",
          tasks: [
            {
              id: 401,
              name: "Redesign login page",
              status: "completed",
              dueDate: "2024-03-17",
            },
            {
              id: 402,
              name: "Create new icons",
              status: "in-progress",
              dueDate: "2024-03-21",
            },
            {
              id: 403,
              name: "Conduct user testing",
              status: "pending",
              dueDate: "2024-03-28",
            },
          ],
        },
      ]);
    }, 1000); // Simulating network delay
  });
};

export default function RealTimeTracking() {
  const [employees, setEmployees] = useState([]);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentView, setCurrentView] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployees().then((data) => {
      setEmployees(data);
      setIsLoading(false);
    });
  }, []);

  const filteredAndSortedEmployees = useMemo(() => {
    return employees
      .filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "productivity") return b.productivity - a.productivity;
        return 0;
      });
  }, [employees, searchTerm, sortBy]);

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatLastActivity = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleEmployeeExpansion = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  const EmployeeCard = ({ employee }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{employee.name}</CardTitle>
              <CardDescription className="text-sm">
                {employee.currentTask}
              </CardDescription>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-blue-500 text-white p-2 hover:bg-blue-600">
                  {employee.tasksCompleted} tasks
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks completed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Last active: {formatLastActivity(employee.lastActivity)}
              </span>
            </div>
          </div>
          <Progress value={employee.productivity} className="h-2 mb-2" />
          <div className="text-sm text-gray-600 flex justify-between">
            <span>Productivity</span>
            <span>{employee.productivity}%</span>
          </div>
        </CardContent>
        <CardFooter className="block px-4 py-0">
          <Collapsible
            open={expandedEmployee === employee.id}
            onOpenChange={() => toggleEmployeeExpansion(employee.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center p-2"
              >
                <span>View Tasks</span>
                {expandedEmployee === employee.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-gray-50">
              <ScrollArea className="h-[200px]">
                <ul className="space-y-2">
                  {employee.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        {getTaskStatusIcon(task.status)}
                        <span>{task.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
        </CardFooter>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4  min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-blue-800">
          Employee Tracking Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time monitoring of employee activities and tasks
        </p>
      </motion.div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={currentView === "grid" ? "secondary" : "outline"}
            onClick={() => setCurrentView("grid")}
          >
            <Users className="mr-2 h-4 w-4" /> Grid
          </Button>
          <Button
            variant={currentView === "list" ? "secondary" : "outline"}
            onClick={() => setCurrentView("list")}
          >
            <BarChart2 className="mr-2 h-4 w-4" /> List
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentView === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table className='mt-4'>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Current Task</TableHead>
                  <TableHead>Productivity</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Tasks Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedEmployees.map((employee) => (
                  <TableRow key={employee.id} className='h-[5dvh]'>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.currentTask}</TableCell>
                    <TableCell>
                      <Progress
                        value={employee.productivity}
                        className="h-2 w-[100px]"
                      />
                    </TableCell>
                    <TableCell>
                      {formatLastActivity(employee.lastActivity)}
                    </TableCell>
                    <TableCell>{employee.tasksCompleted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
