"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart, MessageCircle, Focus, LifeBuoy } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    name: "Smart Task Management",
    description:
      "AI-powered task prioritization and scheduling for optimal productivity.",
    icon: BarChart,
    details:
      "Our AI algorithms analyze your work patterns and project requirements to automatically prioritize tasks and create optimal schedules. This ensures youre always working on the most important tasks at the right time.",
  },
  {
    name: "Seamless Communication",
    description:
      "Integrated chat and video conferencing tools for effortless team collaboration.",
    icon: MessageCircle,
    details:
      "Stay connected with your team through our built-in chat and video conferencing tools. No need to switch between multiple apps - everything you need for communication is right here in SakriyaBoss.",
  },
  {
    name: "Focus Enhancement",
    description:
      "Customizable work environments and distraction-blocking features.",
    icon: Focus,
    details:
      'Create the perfect work environment with customizable focus modes. Block distracting websites and apps, set up automated "Do Not Disturb" periods, and track your focus time to boost productivity.',
  },
  {
    name: "Work-Life Balance",
    description:
      "Intelligent reminders and analytics to maintain a healthy work-life balance.",
    icon: LifeBuoy,
    details:
      "SakriyaBoss helps you maintain a healthy work-life balance by providing intelligent reminders for breaks, tracking your work hours, and offering insights into your productivity patterns. Achieve more without burning out.",
  },
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      id="features"
      ref={targetRef}
      style={{ opacity }}
      className=" py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Productivity Boosters
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Powerful Features for Remote Teams
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            SakriyaBoss provides a comprehensive suite of tools designed to
            enhance productivity and collaboration for remote teams.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                <Card className="w-full h-full">
                  <CardHeader>
                    <div className="rounded-md bg-blue-500 p-2 w-fit">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="mt-4">{feature.name}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFeature(feature)}
                      className="mt-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
      {selectedFeature && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedFeature.name}</h3>
            <p className="mb-6">{selectedFeature.details}</p>
            <Button onClick={() => setSelectedFeature(null)}>Close</Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
