'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Search, Filter, Star, Briefcase, X, Plus, Save } from 'lucide-react'

// Simulated API call (replace with actual API call in production)
const fetchEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Alice Johnson',
          avatar: '/placeholder.svg?height=128&width=128',
          skills: ['React', 'Node.js', 'Python'],
          currentWorkload: 75,
          performance: 92,
          taskHistory: [
            { id: 1, name: 'Implement user authentication', status: 'completed' },
            { id: 2, name: 'Design dashboard layout', status: 'in-progress' },
            { id: 3, name: 'Optimize database queries', status: 'pending' },
          ],
          performanceHistory: [
            { month: 'Jan', performance: 85 },
            { month: 'Feb', performance: 88 },
            { month: 'Mar', performance: 92 },
            { month: 'Apr', performance: 90 },
            { month: 'May', performance: 95 },
            { month: 'Jun', performance: 92 },
          ],
        },
        {
          id: 2,
          name: 'Bob Smith',
          avatar: '/placeholder.svg?height=128&width=128',
          skills: ['Java', 'Spring Boot', 'MySQL'],
          currentWorkload: 60,
          performance: 88,
          taskHistory: [
            { id: 4, name: 'Develop RESTful API', status: 'completed' },
            { id: 5, name: 'Implement caching mechanism', status: 'in-progress' },
            { id: 6, name: 'Write unit tests', status: 'pending' },
          ],
          performanceHistory: [
            { month: 'Jan', performance: 82 },
            { month: 'Feb', performance: 85 },
            { month: 'Mar', performance: 88 },
            { month: 'Apr', performance: 87 },
            { month: 'May', performance: 90 },
            { month: 'Jun', performance: 88 },
          ],
        },
        {
          id: 3,
          name: 'Charlie Davis',
          avatar: '/placeholder.svg?height=128&width=128',
          skills: ['Angular', 'TypeScript', 'MongoDB'],
          currentWorkload: 85,
          performance: 95,
          taskHistory: [
            { id: 7, name: 'Create responsive UI components', status: 'completed' },
            { id: 8, name: 'Integrate third-party API', status: 'in-progress' },
            { id: 9, name: 'Perform security audit', status: 'pending' },
          ],
          performanceHistory: [
            { month: 'Jan', performance: 90 },
            { month: 'Feb', performance: 92 },
            { month: 'Mar', performance: 93 },
            { month: 'Apr', performance: 94 },
            { month: 'May', performance: 96 },
            { month: 'Jun', performance: 95 },
          ],
        },
      ])
    }, 1000) // Simulating network delay
  })
}

const EmployeeCard = ({ employee, onViewProfile }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={employee.avatar} alt={employee.name} />
        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle>{employee.name}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {employee.skills.map(skill => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Workload</Label>
          <div className="flex items-center mt-1">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{employee.currentWorkload}%</span>
          </div>
        </div>
        <div>
          <Label>Performance</Label>
          <div className="flex items-center mt-1">
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            <span>{employee.performance}%</span>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4" onClick={() => onViewProfile(employee)}>View Profile</Button>
    </CardContent>
  </Card>
)

const EmployeeProfile = ({ employee, onClose }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <div className="flex flex-wrap gap-1 mt-2">
            {employee.skills.map(skill => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>

    <Tabs defaultValue="performance">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="tasks">Task History</TabsTrigger>
      </TabsList>
      <TabsContent value="performance" className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Current Performance</h3>
            <div className="flex items-center mt-1">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{employee.performance}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Current Workload</h3>
            <div className="flex items-center mt-1">
              <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{employee.currentWorkload}%</span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employee.performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="performance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="tasks">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employee.taskHistory.map(task => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <Badge variant={task.status === 'completed' ? 'success' : (task.status === 'in-progress' ? 'warning' : 'destructive')}>
                      {task.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  </div>
)

const AddEmployeeForm = ({ onClose, onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    skills: [],
    currentWorkload: 0,
    performance: 0,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEmployee(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (value) => {
    setNewEmployee(prev => ({ ...prev, skills: value.split(',').map(skill => skill.trim()) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement API call to add new employee
    // const response = await fetch('/api/employees', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newEmployee)
    // })
    // const data = await response.json()
    // onAddEmployee(data)
    onAddEmployee({
      ...newEmployee,
      id: Date.now(),
      avatar: '/placeholder.svg?height=128&width=128',
      taskHistory: [],
      performanceHistory: []
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={newEmployee.name} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input id="skills" name="skills" value={newEmployee.skills.join(', ')} onChange={(e) => handleSkillsChange(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="currentWorkload">Current Workload (%)</Label>
        <Input id="currentWorkload" name="currentWorkload" type="number" min="0" max="100" value={newEmployee.currentWorkload} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="performance">Performance (%)</Label>
        <Input id="performance" name="performance" type="number" min="0" max="100" value={newEmployee.performance} onChange={handleInputChange} required />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Employee</Button>
      </div>
    </form>
  )
}

export default function EmployeeDatabase() {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [workloadFilter, setWorkloadFilter] = useState('')
  const [performanceFilter, setPerformanceFilter] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)

  useEffect(() => {
    fetchEmployees().then(data => {
      setEmployees(data)
      setIsLoading(false)
    })
  }, [])

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSkill = skillFilter === '' || employee.skills.includes(skillFilter)
      const matchesWorkload = workloadFilter === '' || 
        (workloadFilter === 'low' && employee.currentWorkload < 50) ||
        (workloadFilter === 'medium' && employee.currentWorkload >= 50 && employee.currentWorkload < 80) ||
        (workloadFilter === 'high' && employee.currentWorkload >= 80)
      const matchesPerformance = performanceFilter === '' ||
        (performanceFilter === 'low' && employee.performance < 70) ||
        (performanceFilter === 'medium' && employee.performance >= 70 && employee.performance < 90) ||
        (performanceFilter === 'high' && employee.performance >= 90)

      return matchesSearch && matchesSkill && matchesWorkload && matchesPerformance
    })
  }, [employees, searchTerm, skillFilter, workloadFilter, performanceFilter])

  const allSkills = useMemo(() => {
    const skillSet = new Set()
    employees.forEach(employee => employee.skills.forEach(skill => skillSet.add(skill)))
    return Array.from(skillSet)
  }, [employees])

  const handleAddEmployee = (newEmployee) => {
    // TODO: Implement API call to add new employee
    // In  a real application, this would be handled by the backend
    setEmployees(prev => [...prev, newEmployee])
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Employee Database</h1>
        <p className="text-gray-600">Search and filter employees based on skills, workload, and performance.</p>
      </motion.div>

      <div className="flex flex-col  gap-4 items-center">
        <div className="flex-1 w-full">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem >All Skills</SelectItem>
              {allSkills.map(skill => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={workloadFilter} onValueChange={setWorkloadFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by workload" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem >All Workloads</SelectItem>
              <SelectItem value="low">Low (&lt;50%)</SelectItem>
              <SelectItem value="medium">Medium (50-80%)</SelectItem>
              <SelectItem value="high">High (&gt;80%)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by performance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem >All Performances</SelectItem>
              <SelectItem value="low">Low (&lt;70%)</SelectItem>
              <SelectItem value="medium">Medium (70-90%)</SelectItem>
              <SelectItem value="high">High (&gt;90%)</SelectItem>
            </SelectContent>
          </Select>
        <Button onClick={() => setIsAddEmployeeOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEmployees.map((employee) => (
            <motion.div
              key={employee.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <EmployeeCard employee={employee} onViewProfile={setSelectedEmployee} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Dialog open={selectedEmployee !== null} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
            <DialogDescription>Detailed information about the selected employee.</DialogDescription>
          </DialogHeader>
          {selectedEmployee && <EmployeeProfile employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>Enter the details of the new employee.</DialogDescription>
          </DialogHeader>
          <AddEmployeeForm onClose={() => setIsAddEmployeeOpen(false)} onAddEmployee={handleAddEmployee} />
        </DialogContent>
      </Dialog>
    </div>
  )
}