import {
  type ToastType,
  type ToastData,
  ToastContainer,
} from '@/components/toast'
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface ToastContextType {
  showToast: (
    message: string,
    type: ToastType,
    duration?: number,
    manualClose?: boolean,
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = (
    message: string,
    type: ToastType,
    duration?: number,
    manualClose?: boolean,
  ) => {
    const id = Date.now().toString()
    const newToast: ToastData = {
      id,
      message,
      type,
      duration,
      manualClose,
    }
    setToasts(prev => [newToast, ...prev])
  }

  const contextValue = { showToast }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
        position="bottom-right"
      />
    </ToastContext.Provider>
  )
}
