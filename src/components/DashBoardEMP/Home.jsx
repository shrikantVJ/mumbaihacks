"use client";

import React, { useEffect, useState } from "react";
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
  Sector,
  AreaChart,
  Area,
} from "recharts";
import {
  CalendarDays,
  Clock,
  Zap,
  ArrowRight,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";

const taskData = [
  { name: "Mon", tasks: 12, completed: 10 },
  { name: "Tue", tasks: 15, completed: 13 },
  { name: "Wed", tasks: 18, completed: 15 },
  { name: "Thu", tasks: 14, completed: 12 },
  { name: "Fri", tasks: 16, completed: 14 },
];

// PieChart
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// Weekly
const Wdata = [
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

const projectData = [
  { name: "Project A", value: 400 },
  { name: "Project B", value: 300 },
  { name: "Project C", value: 200 },
  { name: "Project D", value: 100 },
];

const productivityData = [
  { name: "Week 1", productivity: 65 },
  { name: "Week 2", productivity: 75 },
  { name: "Week 3", productivity: 80 },
  { name: "Week 4", productivity: 85 },
];

const COLORS = ["#4DB6AC", "#81C784", "#AED581", "#DCE775"];

const quickLinks = [
  { name: "Start New Task", icon: Zap, href: "#" },
  { name: "Schedule Meeting", icon: CalendarDays, href: "#" },
  { name: "View Reports", icon: Clock, href: "#" },
];

const upcomingEvents = [
  { name: "Team Meeting", time: "10:00 AM", date: "Today" },
  { name: "Project Deadline", time: "5:00 PM", date: "Tomorrow" },
  { name: "Client Call", time: "2:00 PM", date: "Jun 15" },
];

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// PieChart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Value ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("daily");

  //PirChart
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Monthly
  const [opacity, setOpacity] = React.useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  // Resize
  // Step 1: Create state to manage the chart size
  const [chartSize, setChartSize] = useState({
    width: 400,
    height: 300,
  });

  // Step 2: Create a function to toggle resize based on window width
  const toggleResize = () => {
    const windowWidth = window.innerWidth;

    // Adjust chart size based on window width
    if (windowWidth < 768) {
      setChartSize({ width: "100%", height: 200 }); // For small screens (e.g., mobile)
    } else if (windowWidth < 1200) {
      setChartSize({ width: "100%", height: 300 }); // For medium screens (e.g., tablets)
    } else {
      setChartSize({ width: "100%", height: 300 }); // For large screens (e.g., desktop)
    }
  };

  // Step 3: Use useEffect to listen to the window resize event
  useEffect(() => {
    toggleResize(); // Set initial size based on current window size

    window.addEventListener("resize", toggleResize); // Add event listener for resizing

    return () => window.removeEventListener("resize", toggleResize); // Cleanup event listener on component unmount
  }, []);

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
          <CardTitle className="text-xl font-semibold">Task Overview</CardTitle>
          <CardDescription>Your task completion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer
                  width={"100%"}
                  height={300}
                  className={
                    "border border-zinc-600 flex items-center justify-center rounded-sm"
                  }
                >
                  <PieChart width={400} height={400}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {data.map((entry, index) => (
                        <Sector
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  className={
                    "border border-zinc-600 flex items-center justify-center rounded-sm"
                  }
                >
                  <AreaChart
                    width={500}
                    height={300}
                    data={Wdata}
                    syncId="anyId"
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
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  className={
                    "border border-zinc-600 flex items-center justify-center rounded-sm"
                  }
                >
                  <LineChart
                    width={500}
                    height={300}
                    data={Wdata}
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
                    <Legend
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      strokeOpacity={opacity.pv}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      strokeOpacity={opacity.uv}
                      stroke="#82ca9d"
                    />
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
            Upcoming Events
          </CardTitle>
          <CardDescription>Your schedule for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.time} - {event.date}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Overall Progress
          </CardTitle>
          <CardDescription>Your progress across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm font-medium text-primary">
                    {(project.value / 10).toFixed(0)}%
                  </span>
                </div>
                <Progress value={project.value / 10} className="h-2" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants} className="col-span-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-6 group"
                >
                  <link.icon className="mr-2 h-5 w-5 text-primary group-hover:text-zinc-500" />
                  <span className="group-hover:text-zinc-500">{link.name}</span>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-zinc-500 transition-transform group-hover:translate-x-1" />
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
              <TrendingUp className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Productivity
                </p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Team Size
                </p>
                <p className="text-2xl font-bold">12</p>
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
                <p className="text-2xl font-bold">4</p>
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
                  Avg. Task Time
                </p>
                <p className="text-2xl font-bold">2.5h</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
}
