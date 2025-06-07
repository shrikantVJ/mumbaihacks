"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Clock,
  Calendar as CalendarIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, differenceInDays } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  DefaultLegendContent,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Simulated API functions (to be replaced with actual API calls)
const fetchEmployeeData = async () => {
  // Simulated API call
  return [
    {
      id: "EMP001",
      name: "Alice Johnson",
      skills: ["React", "Node.js", "Python"],
      completedTasks: 45,
      ongoingTasks: 3,
      delayedTasks: 1,
      performanceScore: 92,
      productivityTrend: [88, 90, 92, 91, 93, 92],
    },
    {
      id: "EMP002",
      name: "Bob Smith",
      skills: ["Java", "C++", "DevOps"],
      completedTasks: 38,
      ongoingTasks: 2,
      delayedTasks: 0,
      performanceScore: 88,
      productivityTrend: [85, 87, 86, 88, 89, 88],
    },
    {
      id: "EMP003",
      name: "Charlie Brown",
      skills: ["UI/UX", "Figma", "JavaScript"],
      completedTasks: 42,
      ongoingTasks: 4,
      delayedTasks: 2,
      performanceScore: 85,
      productivityTrend: [82, 84, 83, 85, 86, 85],
    },
    {
      id: "EMP004",
      name: "Diana Prince",
      skills: ["Data Science", "Machine Learning", "Python"],
      completedTasks: 50,
      ongoingTasks: 5,
      delayedTasks: 1,
      performanceScore: 94,
      productivityTrend: [90, 92, 93, 94, 95, 94],
    },
  ];
};

const fetchProjectData = async () => {
  // Simulated API call
  return [
    {
      id: "PROJ001",
      name: "Project A",
      completed: 75,
      remaining: 25,
      startDate: "2023-01-01",
      endDate: "2023-06-30",
      team: ["EMP001", "EMP002"],
    },
    {
      id: "PROJ002",
      name: "Project B",
      completed: 60,
      remaining: 40,
      startDate: "2023-03-15",
      endDate: "2023-09-30",
      team: ["EMP003", "EMP004"],
    },
    {
      id: "PROJ003",
      name: "Project C",
      completed: 90,
      remaining: 10,
      startDate: "2023-02-01",
      endDate: "2023-05-31",
      team: ["EMP001", "EMP003"],
    },
    {
      id: "PROJ004",
      name: "Project D",
      completed: 30,
      remaining: 70,
      startDate: "2023-04-01",
      endDate: "2023-12-31",
      team: ["EMP002", "EMP004"],
    },
  ];
};

const fetchTaskCompletionData = async () => {
  // Simulated API call
  return [
    { name: "On Time", value: 85 },
    { name: "Delayed", value: 15 },
  ];
};

const fetchAIInsights = async () => {
  // Simulated API call
  return [
    {
      type: "workload",
      message:
        "Team workload is unevenly distributed. Consider reassigning tasks from Diana Prince to Bob Smith.",
      severity: "high",
    },
    {
      type: "delay",
      message:
        "Project B has a 30% chance of delay based on current progress and historical data.",
      severity: "medium",
    },
    {
      type: "collaboration",
      message:
        "Increased collaboration between Alice Johnson and Charlie Brown could improve UI/UX implementation efficiency.",
      severity: "low",
    },
    {
      type: "performance",
      message:
        "Diana Prince has shown a 15% increase in performance over the last month. Consider recognizing her achievements.",
      severity: "medium",
    },
    {
      type: "skill",
      message:
        "The team could benefit from additional DevOps training to improve deployment efficiency.",
      severity: "medium",
    },
  ];
};

const fetchPerformanceTrends = async () => {
  // Simulated API call
  return [
    { month: "Jan", teamAverage: 82, topPerformer: 88 },
    { month: "Feb", teamAverage: 85, topPerformer: 90 },
    { month: "Mar", teamAverage: 83, topPerformer: 92 },
    { month: "Apr", teamAverage: 87, topPerformer: 95 },
    { month: "May", teamAverage: 89, topPerformer: 97 },
    { month: "Jun", teamAverage: 91, topPerformer: 98 },
  ];
};

const AdvancedPerformanceAnalytics = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [projects, setProjects] = useState([]);
  const [taskCompletionData, setTaskCompletionData] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [performanceTrends, setPerformanceTrends] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeData, projectData, taskData, insights, trends] =
          await Promise.all([
            fetchEmployeeData(),
            fetchProjectData(),
            fetchTaskCompletionData(),
            fetchAIInsights(),
            fetchPerformanceTrends(),
          ]);

        setEmployees(employeeData);
        setSelectedEmployee(employeeData[0].id);
        setProjects(projectData);
        setTaskCompletionData(taskData);
        setAiInsights(insights);
        setPerformanceTrends(trends);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state here
      }
    };

    fetchData();
  }, []);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // Here you would typically fetch new data based on the selected date range
    // For demonstration, we're just updating the state
  };

  const selectedEmployeeData = useMemo(
    () => employees.find((emp) => emp.id === selectedEmployee),
    [employees, selectedEmployee]
  );

  const generateEmployeeReport = useCallback(() => {
    if (!selectedEmployeeData) return;

    const calculateProductivityTrend = (trend) => {
      const average = trend.reduce((a, b) => a + b, 0) / trend.length;
      const lastValue = trend[trend.length - 1];
      return lastValue > average
        ? "Increasing"
        : lastValue < average
        ? "Decreasing"
        : "Stable";
    };

    const calculateEfficiencyRate = (completed, total) => {
      return ((completed / total) * 100).toFixed(2);
    };

    const reportData = {
      employeeName: selectedEmployeeData.name,
      reportGeneratedAt: new Date().toISOString(),
      dateRange: {
        from: format(dateRange.from, "yyyy-MM-dd"),
        to: format(dateRange.to, "yyyy-MM-dd"),
        totalDays: differenceInDays(dateRange.to, dateRange.from) + 1,
      },
      performanceSummary: {
        score: selectedEmployeeData.performanceScore,
        completedTasks: selectedEmployeeData.completedTasks,
        ongoingTasks: selectedEmployeeData.ongoingTasks,
        delayedTasks: selectedEmployeeData.delayedTasks,
        efficiencyRate: calculateEfficiencyRate(
          selectedEmployeeData.completedTasks,
          selectedEmployeeData.completedTasks +
            selectedEmployeeData.ongoingTasks +
            selectedEmployeeData.delayedTasks
        ),
      },
      skillsUtilization: selectedEmployeeData.skills,
      productivityTrend: {
        data: selectedEmployeeData.productivityTrend,
        trend: calculateProductivityTrend(
          selectedEmployeeData.productivityTrend
        ),
      },
      projectContributions: projects
        .filter((project) => project.team.includes(selectedEmployeeData.id))
        .map((project) => ({
          name: project.name,
          completion: project.completed,
          role: "Team Member", // This would ideally come from more detailed project data
        })),
      recommendations: [
        "Focus on reducing the number of delayed tasks",
        "Improve time management skills",
        "Consider additional training in project management",
        "Explore opportunities for cross-team collaboration",
      ],
    };

    // Convert report data to JSON string
    const jsonString = JSON.stringify(reportData, null, 2);

    // Create a Blob with the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedEmployeeData.name.replace(
      " ",
      "_"
    )}_Performance_Report.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [selectedEmployeeData, dateRange, projects]);

  const chartColors = {
    completedTasks: "#22c55e",
    ongoingTasks: "#3b82f6",
    delayedTasks: "#ef4444",
    teamAverage: "#8b5cf6",
    topPerformer: "#f59e0b",
  };

  // ChartData
  const data = [
    {
      name: "Page A",
      a: [0, 0],
      b: 0,
    },
    {
      name: "Page B",
      a: [50, 300],
      b: 106,
    },
    {
      name: "Page C",
      a: [150, 423],
    },
    {
      name: "Page D",
      b: 312,
    },
    {
      name: "Page E",
      a: [367, 678],
      b: 451,
    },
    {
      name: "Page F",
      a: [305, 821],
      b: 623,
    },
  ];

  const [isMobile, setIsMobile] = useState(550);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768 ? 550 : 550);
  });

  const renderTooltipWithoutRange = ({ payload, content, ...rest }) => {
    const newPayload = payload.filter((x) => x.dataKey !== "a");
    return <Tooltip payload={newPayload} {...rest} />;
  };

  const renderLegendWithoutRange = ({ payload, content, ...rest }) => {
    const newPayload = payload.filter((x) => x.dataKey !== "a");
    return <DefaultLegendContent payload={newPayload} {...rest} />;
  };

  return (
    <div className="container mx-auto p-4  min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Advanced Performance Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 border-t-4 border-t-blue-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700">
              Employee Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between items-center">
              <Select
                value={selectedEmployee}
                onValueChange={setSelectedEmployee}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {selectedEmployeeData && (
              <ResponsiveContainer
                height={300}
                width="100%"
                className={
                  "border border-zinc-600 flex items-center justify-center "
                }
              >
                <ComposedChart
                  height={300}
                  width={isMobile}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={renderTooltipWithoutRange} />
                  <Area
                    type="monotone"
                    dataKey="a"
                    stroke="none"
                    fill="#cccccc"
                    connectNulls
                    dot={false}
                    activeDot={false}
                  />
                  <Line
                    type="natural"
                    dataKey="b"
                    stroke="#ff00ff"
                    connectNulls
                  />
                  <Legend content={renderLegendWithoutRange} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-700">
                Performance Score: {selectedEmployeeData?.performanceScore}%
              </div>
              <Button
                onClick={generateEmployeeReport}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700">
              Task Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                onTime: {
                  label: "On Time",
                  color: "#22c55e",
                },
                delayed: {
                  label: "Delayed",
                  color: "#ef4444",
                },
              }}
              className="h-[300px]"
            >
              <PieChart data={taskCompletionData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-700">
            Project Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                color: "#22c55e",
              },
              remaining: {
                label: "Remaining",
                color: "#3b82f6",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={projects} accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completed" stackId="a" fill="#22c55e" />
              <Bar dataKey="remaining" stackId="a" fill="#3b82f6" />
            </BarChart>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">{project.name}</h3>
                <p className="text-sm text-gray-600">
                  Start: {project.startDate}
                </p>
                <p className="text-sm text-gray-600">End: {project.endDate}</p>
                <Progress value={project.completed} className="mt-2" />
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.team.map((memberId) => {
                    const member = employees.find((emp) => emp.id === memberId);
                    return member ? (
                      <Badge
                        key={memberId}
                        variant="secondary"
                        className="bg-gray-100 text-gray-800"
                      >
                        {member.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-t-4 border-t-yellow-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700">
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <AnimatePresence>
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 p-4 bg-white rounded-lg shadow border-l-4 ${
                      insight.severity === "high"
                        ? "border-red-500"
                        : insight.severity === "medium"
                        ? "border-yellow-500"
                        : "border-green-500"
                    }`}
                  >
                    <div className="flex items-start">
                      {insight.type === "workload" && (
                        <Activity className="w-6 h-6 mr-2 text-blue-500" />
                      )}
                      {insight.type === "delay" && (
                        <Clock className="w-6 h-6 mr-2 text-red-500" />
                      )}
                      {insight.type === "collaboration" && (
                        <Users className="w-6 h-6 mr-2 text-green-500" />
                      )}
                      {insight.type === "performance" && (
                        <TrendingUp className="w-6 h-6 mr-2 text-purple-500" />
                      )}
                      {insight.type === "skill" && (
                        <AlertCircle className="w-6 h-6 mr-2 text-orange-500" />
                      )}
                      <p className="text-gray-700">{insight.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-indigo-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-700">
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                teamAverage: {
                  label: "Team Average",
                  color: chartColors.teamAverage,
                },
                topPerformer: {
                  label: "Top Performer",
                  color: chartColors.topPerformer,
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={performanceTrends}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="teamAverage"
                  stroke={chartColors.teamAverage}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="topPerformer"
                  stroke={chartColors.topPerformer}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-t-4 border-t-indigo-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-700">
            Team Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <Card
                key={employee.id}
                className="bg-white border border-gray-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40`}
                      />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg text-gray-700">
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
                          className="bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Completed Tasks:
                      </span>
                      <span className="font-semibold text-green-600">
                        {employee.completedTasks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Ongoing Tasks:
                      </span>
                      <span className="font-semibold text-blue-600">
                        {employee.ongoingTasks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Delayed Tasks:
                      </span>
                      <span className="font-semibold text-red-600">
                        {employee.delayedTasks}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Performance Score:
                      </span>
                      <Progress
                        value={employee.performanceScore}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Productivity Trend:
                      </span>
                      <ChartContainer
                        config={{
                          productivity: {
                            label: "Productivity",
                            color: "#22c55e",
                          },
                        }}
                        className="h-[50px]"
                      >
                        <LineChart
                          data={employee.productivityTrend.map(
                            (value, index) => ({ day: index + 1, value })
                          )}
                        >
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedPerformanceAnalytics;
