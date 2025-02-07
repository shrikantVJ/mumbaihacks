'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Toaster, toast } from 'sonner'
import { FiMusic, FiVolume2, FiCheck, FiClock, FiList, FiSettings, FiCalendar, FiBarChart2, FiBell } from 'react-icons/fi'

const soundOptions = [
  { value: 'rain', label: 'Rain' },
  { value: 'forest', label: 'Forest' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'ocean', label: 'Ocean' },
]

const musicOptions = [
  { value: 'lofi', label: 'Lo-Fi' },
  { value: 'classical', label: 'Classical' },
  { value: 'ambient', label: 'Ambient' },
  { value: 'nature', label: 'Nature Sounds' },
]

const themeOptions = [
  { value: 'default', label: 'Default' },
  { value: 'dark', label: 'Dark' },
  { value: 'nature', label: 'Nature' },
  { value: 'space', label: 'Space' },
]

export default function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [ambientSound, setAmbientSound] = useState(soundOptions[0].value)
  const [ambientVolume, setAmbientVolume] = useState(50)
  const [focusMusic, setFocusMusic] = useState(musicOptions[0].value)
  const [musicVolume, setMusicVolume] = useState(50)
  const [timer, setTimer] = useState(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [isBreak, setIsBreak] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [theme, setTheme] = useState(themeOptions[0].value)
  const [focusSessions, setFocusSessions] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const audioRef = useRef(null)
  const notificationRef = useRef(null)

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        setNotificationsEnabled(permission === 'granted')
      })
    }
  }, [])

  useEffect(() => {
    let interval
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      handleTimerComplete()
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  useEffect(() => {
    if (isActive) {
      audioRef.current = new Audio(`/sounds/${ambientSound}.mp3`)
      audioRef.current.loop = true
      audioRef.current.volume = ambientVolume / 100
      audioRef.current.play()
    } else {
      audioRef.current?.pause()
    }
    return () => {
      audioRef.current?.pause()
    }
  }, [isActive, ambientSound, ambientVolume])

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  const handleTimerComplete = useCallback(() => {
    setIsTimerRunning(false)
    if (!isBreak) {
      setCompletedPomodoros((prev) => prev + 1)
      setFocusSessions((prev) => [...prev, { date: new Date(), duration: 25 }])
      setIsBreak(true)
      setTimer(breakTime)
      if (notificationsEnabled) {
        new Notification('Focus session complete!', { body: 'Time for a break.' })
      }
    } else {
      setIsBreak(false)
      setTimer(25 * 60)
      if (notificationsEnabled) {
        new Notification('Break time over!', { body: 'Ready to focus again?' })
      }
    }
  }, [isBreak, breakTime, notificationsEnabled])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 's':
          event.preventDefault()
          setIsTimerRunning((prev) => !prev)
          break
        case 'b':
          event.preventDefault()
          setIsBreak((prev) => !prev)
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const dailyProgress = (completedPomodoros / dailyGoal) * 100

  const getProductivityStats = () => {
    const totalFocusTime = focusSessions.reduce((acc, session) => acc + session.duration, 0)
    const averageSessionLength = totalFocusTime / focusSessions.length || 0
    return {
      totalSessions: focusSessions.length,
      totalFocusTime,
      averageSessionLength,
    }
  }

  const stats = getProductivityStats()

  return (
    <div className={`min-h-screen  flex items-center justify-center p-4 theme-${theme}`}>
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            <span>Advanced Focus Mode</span>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px] bg-white/20 border-none text-white">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-blue-800">Activate Focus Mode</span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tabs defaultValue="focus" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-4">
                      <TabsTrigger value="focus">Focus</TabsTrigger>
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="focus" className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex items-center space-x-2 flex-grow">
                          <FiClock className="text-blue-600 text-2xl" />
                          <span className="text-3xl font-bold text-blue-800">{formatTime(timer)}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className={`flex-grow ${isTimerRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                          >
                            {isTimerRunning ? 'Pause' : 'Start'}
                          </Button>
                          <Button
                            onClick={() => {
                              setTimer(25 * 60)
                              setIsTimerRunning(false)
                              setIsBreak(false)
                            }}
                            variant="outline"
                            className="flex-grow border-blue-600 text-blue-600 hover:bg-blue-100"
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="text-center text-sm text-blue-600">
                        {isBreak ? 'Break Time!' : 'Focus Time'} | Completed Pomodoros: {completedPomodoros}
                      </div>
                      <Progress value={dailyProgress} className="w-full" />
                      <div className="text-center text-sm text-blue-600">
                        Daily Goal Progress: {completedPomodoros} / {dailyGoal} Pomodoros
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <FiVolume2 className="text-blue-600 flex-shrink-0" />
                          <div className="flex-grow">
                            <Select value={ambientSound} onValueChange={setAmbientSound}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select ambient sound" />
                              </SelectTrigger>
                              <SelectContent>
                                {soundOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Slider
                            value={[ambientVolume]}
                            onValueChange={(value) => setAmbientVolume(value[0])}
                            max={100}
                            step={1}
                            className="w-1/3"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <FiMusic className="text-blue-600 flex-shrink-0" />
                          <div className="flex-grow">
                            <Select value={focusMusic} onValueChange={setFocusMusic}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select focus music" />
                              </SelectTrigger>
                              <SelectContent>
                                {musicOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Slider
                            value={[musicVolume]}
                            onValueChange={(value) => setMusicVolume(value[0])}
                            max={100}
                            step={1}
                            className="w-1/3"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="tasks" className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          placeholder="Add a new task"
                          className="flex-grow"
                        />
                        <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">Add</Button>
                      </div>
                      <ul className="space-y-2 max-h-64 overflow-y-auto">
                        <AnimatePresence>
                          {tasks.map((task) => (
                            <motion.li
                              key={task.id}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center  justify-between bg-blue-100 p-2 rounded"
                            >
                              <span className={`text-blue-800 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => handleToggleTask(task.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <FiCheck />
                                </Button>
                                <Button
                                  onClick={() => handleRemoveTask(task.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  &times;
                                </Button>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Total Sessions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">{stats.totalSessions}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Total Focus Time</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">{Math.round(stats.totalFocusTime / 60)} minutes</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Avg. Session Length</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">{Math.round(stats.averageSessionLength)} minutes</p>
                          </CardContent>
                        </Card>
                      </div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Focus Session History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline"><FiCalendar className="mr-2" /> Select Date</Button>
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
                          <div className="mt-4">
                            {focusSessions
                              .filter(session => session.date.toDateString() === selectedDate.toDateString())
                              .map((session, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b">
                                  <span>{session.date.toLocaleTimeString()}</span>
                                  <span>{session.duration} minutes</span>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="settings" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-800">Focus Duration (minutes)</label>
                        <Input
                          type="number"
                          value={timer / 60}
                          onChange={(e) => setTimer(parseInt(e.target.value) * 60)}
                          min={1}
                          max={60}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-800">Break Duration (minutes)</label>
                        <Input
                          type="number"
                          value={breakTime / 60}
                          onChange={(e) => setBreakTime(parseInt(e.target.value) * 60)}
                          min={1}
                          max={30}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-800">Daily Pomodoro Goal</label>
                        <Input
                          type="number"
                          value={dailyGoal}
                          onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                          min={1}
                          max={20}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">Enable Notifications</span>
                        <Switch
                          checked={notificationsEnabled}
                          onCheckedChange={setNotificationsEnabled}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}