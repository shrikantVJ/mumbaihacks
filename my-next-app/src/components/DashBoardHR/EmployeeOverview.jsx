"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
  Customized,
  Rectangle,
} from "recharts";
import {
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const performanceData = [
  {
    subject: "Progress",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Done",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Pending",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Collab",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "WorkLoad",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Skill",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const productiveData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const employeeData = [
  { name: "Alice", tasks: 15, completed: 12 },
  { name: "Bob", tasks: 12, completed: 10 },
  { name: "Charlie", tasks: 18, completed: 15 },
  { name: "David", tasks: 10, completed: 8 },
  { name: "Eve", tasks: 14, completed: 13 },
];

const departmentData = [
  { name: "IT", value: 30 },
  { name: "HR", value: 20 },
  { name: "Sales", value: 25 },
  { name: "Marketing", value: 15 },
  { name: "Finance", value: 10 },
];

const productivityData = [
  { name: "Week 1", productivity: 75 },
  { name: "Week 2", productivity: 82 },
  { name: "Week 3", productivity: 78 },
  { name: "Week 4", productivity: 85 },
];

const COLORS = ["#4DB6AC", "#81C784", "#AED581", "#DCE775", "#FFD54F"];

const quickActions = [
  { name: "Assign New Task", icon: Briefcase },
  { name: "Schedule Meeting", icon: Users },
  { name: "Generate Report", icon: CheckCircle },
];

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Productive Chart
const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((firstSeriesPoint, index) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        key={`${firstSeriesPoint.payload.name}-${index}`}
        width={10}
        height={yDifference}
        x={secondSeriesPoint.x - 5}
        y={secondSeriesPoint.y}
        fill={yDifference > 0 ? "red" : yDifference < 0 ? "green" : "none"}
      />
    );
  });
};

export default function EmployeeOverview() {
  const [activeTab, setActiveTab] = useState("performance");
  const [isMobile, setIsMobile] = useState(550);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768 ? 350 : 550);
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <MotionCard
        variants={cardVariants}
        className="col-span-full lg:col-span-2"
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Employee Performance
          </CardTitle>
          <CardDescription>Task completion rates by employee</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer
                  // width="100%"
                  // height="100%"
                  width={"100%"}
                  height={300}
                  className={
                    "border border-zinc-600 flex items-center justify-center rounded-sm"
                  }
                >
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={performanceData}
                    width={350}
                    height={300}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="productivity" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer
                  width={"100%"}
                  height={300}
                  className={
                    "border border-zinc-600 flex items-center justify-center rounded-sm"
                  }
                >
                  <LineChart
                    width={isMobile}
                    height={300}
                    data={productiveData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Customized component={CustomizedRectangle} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Department Distribution
          </CardTitle>
          <CardDescription>Employee distribution by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--primary)"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </MotionCard>
      <MotionCard
        variants={cardVariants}
        className="col-span-full md:col-span-2 lg:col-span-3"
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          <CardDescription>Frequently used managerial actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-6 group"
                >
                  <action.icon className="mr-2 h-5 w-5 text-primary group-hover:text-zinc-600" />
                  <span className="group-hover:text-zinc-600">
                    {action.name}
                  </span>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-zinc-600 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>
      <MotionCard
        variants={cardVariants}
        className="col-span-full md:col-span-2 lg:col-span-3"
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Key Metrics</CardTitle>
          <CardDescription>Important numbers at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tasks Completed
                </p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Productivity
                </p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
}
