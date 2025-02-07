'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import Sidebar from '@/components/DashBoardEMP/Sidebar'
import Home from '@/components/DashBoardEMP/Home'
import Messaging from '@/components/DashBoardEMP/Messaging'
import Meditation from '@/components/DashBoardEMP/Meditation'
import FocusMode from '@/components/DashBoardEMP/FocusMode'
import Chatbot from '@/components/DashBoardEMP/Chatbot'
import TodoList from '@/components/DashBoardEMP/TodoList'
import Tasks from '@/components/DashBoardEMP/Tasks'
import VideoCall from '@/components/DashBoardEMP/VideoCall'

const searchData = [
    { title: 'Dashboard', component: 'Home' },
    { title: 'Task List', component: 'Tasks' },
    { title: 'To-Do Items', component: 'To-Do List' },
    { title: 'AI Assistant', component: 'Chatbot' },
    { title: 'Concentration Mode', component: 'Focus Mode' },
    { title: 'Relaxation', component: 'Meditation' },
    { title: 'Team Chat', component: 'Messaging' },
    { title: 'Video Call', component: 'Videocall' },
  ]
  
  export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [selectedComponent, setSelectedComponent] = useState('Home')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [notifications, setNotifications] = useState(3)
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
        case 'Home':
          return <Home />
        case 'Tasks':
          return <Tasks />
        case 'To-Do List':
          return <TodoList />
        case 'Chatbot':
          return <Chatbot />
        case 'Focus Mode':
          return <FocusMode />
        case 'Meditation':
          return <Meditation />
        case 'Messaging':
          return <Messaging />
        case 'Videocall':
          return <VideoCall />
        default:
          return <Home />
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
              <h1 className="text-2xl font-bold text-foreground">{selectedComponent}</h1>
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