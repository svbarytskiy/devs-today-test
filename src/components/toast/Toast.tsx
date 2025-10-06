import { useEffect, type FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id: string
  message: string
  type: ToastType
  duration?: number
  manualClose?: boolean
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void
}

const typeStyles: Record<
  ToastType,
  { icon: FC<any>; base: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle,
    base: 'bg-white border-l-4 border-green-500',
    iconColor: 'text-green-500',
  },
  error: {
    icon: XCircle,
    base: 'bg-white border-l-4 border-red-500',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    base: 'bg-white border-l-4 border-yellow-500',
    iconColor: 'text-yellow-600',
  },
  info: {
    icon: Info,
    base: 'bg-white border-l-4 border-indigo-500',
    iconColor: 'text-indigo-500',
  },
}

export const Toast: FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 2000,
  manualClose = false,
  onClose,
}) => {
  const { icon: Icon, base, iconColor } = typeStyles[type]
  const autoClose = duration > 0 && !manualClose

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose, autoClose])

  const toastVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  }

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, type: 'tween' }}
      className={clsx(
        'w-full max-w-sm p-3 shadow-md rounded-md pointer-events-auto',
        'flex items-center space-x-3 transition-all cursor-default',
        base,
      )}
    >
      <Icon className={clsx('w-5 h-5 flex-shrink-0', iconColor)} />

      <div className="flex-1 text-sm font-medium text-gray-800 break-words pr-2">
        {message}
      </div>

      {(manualClose || !autoClose) && (
        <button
          onClick={() => onClose(id)}
          className="ml-4 p-0.5 rounded-sm text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0"
          aria-label="Close message"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: ToastData[]
  removeToast: (id: string) => void
  position: 'top-right' | 'bottom-right'
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
  position = 'bottom-right',
}) => {
  const positionClasses = clsx('fixed z-50 p-4 space-y-3 pointer-events-none', {
    'top-0 right-0': position === 'top-right',
    'bottom-0 right-0 flex-col-reverse': position === 'bottom-right',
  })

  return (
    <div className={positionClasses}>
      <AnimatePresence initial={false}>
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
