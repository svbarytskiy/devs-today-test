import React from 'react'
import { Menu } from 'lucide-react'
import { useSidebar } from './sidebar/SidebarProvider'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg">
      <h1 className="text-xl font-bold">{title}</h1>
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

export default Header
