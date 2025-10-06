import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface SidebarContextType {
  isOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openSidebar = useCallback(() => setIsOpen(true), [])
  const closeSidebar = useCallback(() => setIsOpen(false), [])
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), [])

  const contextValue = {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
