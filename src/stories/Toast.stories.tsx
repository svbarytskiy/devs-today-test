import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toast, type ToastType, ToastContainer, type ToastData } from '../components/toast/Toast'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    id: { control: false },
    message: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: 'number',
      description:
        'Auto-dismiss duration in ms (2000ms is default). Set to 0 to disable auto-dismissal.',
    },
    manualClose: {
      control: 'boolean',
      description: 'If true, shows the close button.',
    },
    onClose: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
}

export default meta

interface ToastStoryArgs extends Omit<ToastData, 'id'> {
  position: 'top-right' | 'bottom-right'
}

const ToastStackTemplate: StoryObj<ToastStoryArgs> = {
  render: ({ position, ...toastArgs }) => {
    const [toasts, setToasts] = useState<ToastData[]>([])

    const addToast = (type: ToastType) => {
      const newToast: ToastData = {
        id: Date.now().toString(),
        type: type,
        message: `${type.toUpperCase()}: ${toastArgs.message}`,
        duration: toastArgs.duration,
        manualClose: toastArgs.manualClose,
      }
      setToasts(prev => [newToast, ...prev])
    }

    const removeToast = useCallback((id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const durationInSeconds =
      toastArgs.duration && toastArgs.duration > 0
        ? toastArgs.duration / 1000
        : 'Manual'

    return (
      <div className="h-125 w-full p-8 border border-gray-200 rounded-lg flex flex-col justify-end items-start relative overflow-hidden">
        <p className="text-gray-500 mb-4 text-sm">
          Click the buttons to create Toast messages. Position:
          <span className="font-semibold text-gray-700">{position}</span>.
          Duration:
          <span className="font-semibold text-gray-700">
            {durationInSeconds}s
          </span>
          .
        </p>

        <div className="space-x-3">
          <button
            onClick={() => addToast('success')}
            className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition shadow-md text-sm"
          >
            Show Success
          </button>
          <button
            onClick={() => addToast('error')}
            className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-md text-sm"
          >
            Show Error
          </button>
          <button
            onClick={() => addToast('warning')}
            className="px-3 py-1.5 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition shadow-md text-sm"
          >
            Show Warning
          </button>
          <button
            onClick={() => addToast('info')}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition shadow-md text-sm"
          >
            Show Info
          </button>
        </div>

        <ToastContainer
          toasts={toasts}
          removeToast={removeToast}
          position={position}
        />
      </div>
    )
  },
  args: {
    message: 'Your action was successfully completed.',
    duration: 2000,
    manualClose: false,
    position: 'bottom-right',
  },
  argTypes: {
    position: { control: 'select', options: ['top-right', 'bottom-right'] },
  },
}

export const DefaultToastStack = {
  ...ToastStackTemplate,
  name: 'Auto-Dismiss Stack',
}

export const ManualCloseToast = {
  ...ToastStackTemplate,
  name: 'Persistent Toast',
  args: {
    ...ToastStackTemplate.args,
    duration: 0,
    manualClose: true,
    message: 'This message will stay until you click X.',
  },
}

export const TopRightPosition = {
  ...ToastStackTemplate,
  name: 'Top Right Position Stack',
  args: {
    ...ToastStackTemplate.args,
    position: 'top-right',
    message: 'Checking top right placement.',
    duration: 3000,
  },
}
