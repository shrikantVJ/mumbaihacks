'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import EmployeeOverview from '@/components/DashBoardHR/EmployeeOverview'
import PerformanceAnalytics from '@/components/DashBoardHR/PerformanceAnalytics'
import Sidebar from '@/components/DashBoardHR/Sidebar'
import TaskDashboard from '@/components/DashBoardHR/TaskDashboard'
import SkillBasedAssignment from '@/components/DashBoardHR/SkillBasedAssignment'
import RealTimeTracking from '@/components/DashBoardHR/RealTimeTracking'
import EmployeeDatabase from '@/components/DashBoardHR/EmployeeDatabase'
import VideoCall from '@/components/DashBoardEMP/VideoCall'


const searchData = [
  { title: 'Employee Overview', component: 'EmployeeOverview' },
  { title: 'Task Dashboard', component: 'TaskDashboard' },
  { title: 'Skill-Based Assignment', component: 'SkillBasedAssignment' },
  { title: 'Real-time Tracking', component: 'RealTimeTracking' },
  { title: 'Employee Database', component: 'EmployeeDatabase' },
  { title: 'Performance Analytics', component: 'PerformanceAnalytics' },
  { title: 'Video Call', component: 'VideoCall' },
]

export default function ManagerDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('EmployeeOverview')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notifications, setNotifications] = useState(5)
  const { theme, setTheme } = useTheme()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearchSelect = (component) => {
    setSelectedComponent(component)
    setSearchQuery('')
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'EmployeeOverview':
        return <EmployeeOverview />
      case 'TaskDashboard':
        return <TaskDashboard />
      case 'SkillBasedAssignment':
        return <SkillBasedAssignment />
      case 'RealTimeTracking':
        return <RealTimeTracking />
      case 'EmployeeDatabase':
        return <EmployeeDatabase />
      case 'PerformanceAnalytics':
        return <PerformanceAnalytics />
      case 'VideoCall':
        return <VideoCall />
      default:
        return <EmployeeOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg md:relative"
          >
            <Sidebar onSelectComponent={setSelectedComponent} closeSidebar={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-card shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-foreground hover:text-primary mr-4">
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>
            <h1 className="text-2xl font-bold text-foreground">{searchData.find(item => item.component === selectedComponent)?.title || 'Dashboard'}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-5 w-5" />
              </Button>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg"
                >
                  {searchResults.map((result, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSearchSelect(result.component)}
                    >
                      {result.title}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <motion.div
            key={selectedComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderComponent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}