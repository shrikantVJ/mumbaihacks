"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Volume2,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MeditationApp = () => {
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [volume, setVolume] = useState(50);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, duration]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const progressPercentage = (seconds / duration) * 100;

  return (
    <div className={`min-h-screen p-4 sm:p-8`}>
      <Card className="w-full max-w-4xl mx-auto my-8 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/30 dark:bg-gray-800/30">
        <CardHeader className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle
              className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "light"
                  ? "from-purple-600 to-pink-600"
                  : "from-purple-400 to-pink-400"
              }`}
            >
              Meditation Oasis
            </CardTitle>
            <CardDescription
              className={`text-xl ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              Find your inner peace and tranquility
            </CardDescription>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-video rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src="data:image/png;base64,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"
              alt="Serene meditation scene"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="timer"
                className={`text-xl ${
                  theme === "light"
                    ? "data-[state=active]:bg-violet-200"
                    : "data-[state=active]:bg-violet-800"
                }`}
              >
                Timer
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className={`text-xl ${
                  theme === "light"
                    ? "data-[state=active]:bg-violet-200"
                    : "data-[state=active]:bg-violet-800"
                }`}
              >
                Media
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="pop">
              <TabsContent key="timer" value="timer" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`${
                      theme === "light"
                        ? "bg-gradient-to-br from-violet-100 to-indigo-100"
                        : "bg-gradient-to-br from-violet-900 to-indigo-900"
                    } overflow-hidden shadow-lg`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative w-64 h-64">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200 stroke-current"
                              strokeWidth="5"
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                            ></circle>
                            <circle
                              className="text-indigo-500 progress-ring__circle stroke-current"
                              strokeWidth="5"
                              strokeLinecap="round"
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              strokeDasharray="251.2"
                              strokeDashoffset={
                                251.2 * (1 - progressPercentage / 100)
                              }
                              transform="rotate(-90 50 50)"
                            ></circle>
                            <text
                              x="50"
                              y="50"
                              fontFamily="Verdana"
                              fontSize="20"
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              fill={theme === "light" ? "#4F46E5" : "#818CF8"}
                            >
                              {formatTime(seconds)}
                            </text>
                          </svg>
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            onClick={isRunning ? handleStop : handleStart}
                            size="lg"
                            className={`text-xl px-8 py-6 ${
                              isRunning
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-white transition-colors duration-300`}
                          >
                            {isRunning ? (
                              <PauseCircle className="mr-2 h-6 w-6" />
                            ) : (
                              <PlayCircle className="mr-2 h-6 w-6" />
                            )}
                            {isRunning ? "Pause" : "Start"}
                          </Button>
                          <Button
                            onClick={handleReset}
                            variant="outline"
                            size="lg"
                            className="text-xl px-8 py-6"
                          >
                            <RotateCcw className="mr-2 h-6 w-6" />
                            Reset
                          </Button>
                        </div>
                        <Select
                          onValueChange={(value) =>
                            setDuration(parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-[250px] text-lg">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">5 minutes</SelectItem>
                            <SelectItem value="600">10 minutes</SelectItem>
                            <SelectItem value="900">15 minutes</SelectItem>
                            <SelectItem value="1200">20 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </ Card>
                </motion.div>
              </TabsContent>

              <TabsContent key="media" value="media" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`${
                      theme === "light"
                        ? "bg-gradient-to-br from-pink-100 to-purple-100"
                        : "bg-gradient-to-br from-pink-900 to-purple-900"
                    } overflow-hidden shadow-lg`}
                  >
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <label
                            className={`text-xl font-medium ${
                              theme === "light"
                                ? "text-gray-800"
                                : "text-gray-200"
                            }`}
                          >
                            Select Guided Meditation Audio:
                          </label>
                          <Select onValueChange={setSelectedAudio}>
                            <SelectTrigger className="w-full mt-2 text-lg">
                              <SelectValue placeholder="Select Audio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://www.bensound.com/bensound-music/bensound-meditation.mp3">
                                Calm Ocean Waves
                              </SelectItem>
                              <SelectItem value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3">
                                Forest Ambience
                              </SelectItem>
                              <SelectItem value="https://www.sample-videos.com/audio/mp3/wave.mp3">
                                Zen Garden
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedAudio && (
                          <div className="space-y-4">
                            <audio controls className="w-full">
                              <source src={selectedAudio} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                            <div className="flex items-center space-x-2">
                              <Volume2 className="h-6 w-6" />
                              <Slider
                                value={[volume]}
                                onValueChange={(values) => setVolume(values[0])}
                                max={100}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <label
                            className={`text-xl font-medium ${
                              theme === "light"
                                ? "text-gray-800"
                                : "text-gray-200"
                            }`}
                          >
                            Select Meditation Video:
                          </label>
                          <Select onValueChange={setSelectedVideo}>
                            <SelectTrigger className="w-full mt-2 text-lg">
                              <SelectValue placeholder="Select Video" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://www.youtube.com/embed/ZToicYcHIOU?si=PqFl_8qASviS8ixC">
                                Guided Meditation for Beginners
                              </SelectItem>
                              <SelectItem value="https://www.youtube.com/embed/syx3a1_LeFo?si=iM5TLfUNkUY0Fa_m">
                                Mindfulness Meditation
                              </SelectItem>
                              <SelectItem value="https://www.youtube.com/embed/uumInvT4t9Y?si=noX4fEHYpZOn9SPS">
                                Deep Relaxation Journey
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedVideo && (
                          <div className="aspect-video mt-4 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              width="100%"
                              height="100%"
                              src={selectedVideo}
                              title="Meditation Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              className={`${
                theme === "light"
                  ? "bg-gradient-to-br from-green-100 to-emerald-100"
                  : "bg-gradient-to-br from-green-900 to-emerald-900"
              } overflow-hidden shadow-lg`}
            >
              <CardContent className="pt-6">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    theme === " light" ? "text-green-800" : "text-green-200"
                  }`}
                >
                  Benefits of Meditation:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  {[
                    "Reduces stress and anxiety",
                    "Enhances self-awareness",
                    "Improves attention span",
                    "Promotes emotional health",
                    "May reduce age-related memory loss",
                    "Generates kindness",
                  ].map((benefit) => (
                    <li key={benefit} className={`${
                      theme === "light" ? "text-green-700" : "text-green-300"
                    }`}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card
              className={`${
                theme === "light"
                  ? "bg-gradient-to-br from-blue-100 to-cyan-100"
                  : "bg-gradient-to-br from-blue-900 to-cyan-900"
              } overflow-hidden shadow-lg`}
            >
              <CardContent className="pt-6">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    theme === "light" ? "text-blue-800" : "text-blue-200"
                  }`}
                >
                  Getting Started:
                </h2>
                <p
                  className={`text-lg ${
                    theme === "light" ? "text-blue-700" : "text-blue-300"
                  }`}
                >
                  Find a quiet space, sit comfortably, and focus on your breath.
                  If your mind wanders, gently bring your focus back to your
                  breath. Start with just a few minutes each day and gradually
                  increase the duration as you become more comfortable with the
                  practice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeditationApp;