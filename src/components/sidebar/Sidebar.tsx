import { useState, type FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { ChevronDown, X, Home } from 'lucide-react'
import { useSidebar } from './SidebarProvider'
import { type MenuItem } from './types'

const isPathActiveInSubtree = (item: MenuItem, activePath: string): boolean => {
  if (item.path === activePath) return true
  if (item.children) {
    return item.children.some(child => isPathActiveInSubtree(child, activePath))
  }
  return false
}

interface SidebarItemProps {
  item: MenuItem
  level: number
  activePath: string
  onItemClick: (path: string) => void
}

const SidebarItem: FC<SidebarItemProps> = ({
  item,
  level,
  activePath,
  onItemClick,
}) => {
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.path === activePath
  const isAncestorActive = hasChildren
    ? isPathActiveInSubtree(item, activePath)
    : isActive

  const [isOpen, setIsOpen] = useState(isAncestorActive)
  const Icon = item.icon || Home

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(prev => !prev)
    } else if (item.path) {
      onItemClick(item.path)
    }
  }

  const isHighlighted = isActive || (hasChildren && isAncestorActive)

  const linkClasses = clsx(
    'flex items-center w-full p-3 my-1 rounded-lg transition duration-150 cursor-pointer text-sm font-medium',
    isHighlighted
      ? 'text-white border-l-4 border-indigo-500 bg-gray-700/50'
      : 'text-gray-300 hover:bg-gray-700',
  )

  const paddingLeft = 16 + level * 15

  return (
    <div>
      <div
        className={linkClasses}
        onClick={handleToggle}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="ml-3 flex-1">{item.label}</span>
        {hasChildren && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children!.map(child => (
              <SidebarItem
                key={child.id}
                item={child}
                level={level + 1}
                activePath={activePath}
                onItemClick={onItemClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SidebarContentProps {
  items: MenuItem[]
  isOpen: boolean
  activePath: string
  onClose: () => void
  onItemClick: (path: string) => void
  headerTitle: string
}

export const SidebarContent: FC<SidebarContentProps> = ({
  isOpen,
  items,
  activePath,
  onClose,
  onItemClick,
  headerTitle,
}) => {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-screen w-64 sm:w-80 bg-gray-800 text-white shadow-2xl z-50 flex flex-col"
      >
        <div className="flex justify-between items-center h-16 px-4 border-b border-gray-700">
          <span className="text-xl font-extrabold text-indigo-400">
            {headerTitle}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              level={0}
              activePath={activePath}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
      </motion.div>
    </>
  )
}

interface SidebarProps {
  items: MenuItem[]
  initialPath?: string
  headerTitle?: string
}

export const Sidebar: FC<SidebarProps> = ({
  items,
  initialPath = '/',
  headerTitle = 'Menu',
}) => {
  const { isOpen, closeSidebar } = useSidebar()
  const [activePath, setActivePath] = useState(initialPath)

  const handleItemClick = (path: string) => {
    setActivePath(path)
  }

  return (
    <SidebarContent
      isOpen={isOpen}
      items={items}
      activePath={activePath}
      onClose={closeSidebar}
      onItemClick={handleItemClick}
      headerTitle={headerTitle}
    />
  )
}
