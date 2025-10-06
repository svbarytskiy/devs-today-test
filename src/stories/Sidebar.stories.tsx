import { useEffect, type ComponentProps, type FC } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '../components/sidebar/Sidebar'
import {
  SidebarProvider,
  useSidebar,
} from '../components/sidebar/SidebarProvider'
import {
  Home,
  Users,
  BarChart,
  Settings,
  ShoppingCart,
  Folder,
  FileText,
  Globe,
  Monitor,
} from 'lucide-react'
import type { MenuItem } from '../components/sidebar/types'

const simpleItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', path: '/dashboard', icon: Home },
  { id: '2', label: 'Customers', path: '/users', icon: Users },
  { id: '3', label: 'E-commerce', path: '/products', icon: ShoppingCart },
  { id: '4', label: 'Global View', path: '/settings', icon: Globe },
]

const nestedItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', path: '/dashboard', icon: Monitor },
  {
    id: '2',
    label: 'Reports',
    icon: BarChart,
    children: [
      {
        id: '2.1',
        label: 'Sales Report',
        path: '/reports/sales',
        icon: FileText,
      },
      {
        id: '2.2',
        label: 'Activity Log',
        path: '/reports/log',
        icon: FileText,
      },
    ],
  },
  {
    id: '3',
    label: 'Resources',
    icon: Folder,
    children: [
      {
        id: '3.1',
        label: 'Documents',
        path: '/resources/docs',
        icon: FileText,
      },
      {
        id: '3.2',
        label: 'Administration',
        children: [
          {
            id: '3.2.1',
            label: 'User Roles',
            path: '/resources/admin/roles',
            icon: Users,
          },
          {
            id: '3.2.2',
            label: 'System Config',
            path: '/resources/admin/config',
            icon: Settings,
          },
        ],
      },
    ],
  },
  { id: '4', label: 'Account Settings', path: '/account', icon: Settings },
]

interface SidebarStoryArgs extends ComponentProps<typeof Sidebar> {
  initialOpen: boolean
  headerTitle?: string
}

type SidebarStory = StoryObj<SidebarStoryArgs>

const StorybookContent: FC<SidebarStoryArgs> = ({
  items,
  initialPath,
  initialOpen,
  headerTitle,
}) => {
  const { toggleSidebar, isOpen, openSidebar, closeSidebar } = useSidebar()

  useEffect(() => {
    if (initialOpen && !isOpen) {
      openSidebar()
    } else if (!initialOpen && isOpen) {
      closeSidebar()
    }
  }, [initialOpen])

  return (
    <div className="relative h-screen bg-gray-100 p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Sidebar Menu Component Demo
      </h1>

      <button
        onClick={toggleSidebar}
        className="self-start px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-[1.02]"
      >
        {isOpen ? 'Close Menu (X)' : 'Open Menu (Button Click)'}
      </button>
      <Sidebar
        items={items}
        initialPath={initialPath}
        headerTitle={headerTitle}
      />
    </div>
  )
}

const meta: Meta<SidebarStoryArgs> = {
  title: 'Navigation/SidebarMenu',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Structure of the nested menu items (MenuItem[]).',
    },
    initialPath: {
      control: 'text',
      description: 'The path that should be active on initial render.',
    },
    headerTitle: {
      control: 'text',
      description: 'The title displayed in the sidebar header.',
      defaultValue: 'DASHBOARD',
    },
    initialOpen: {
      control: 'boolean',
      description:
        'Control the open state for Storybook demonstration only (uses Context).',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
}

export default meta

const Template: SidebarStory = {
  render: args => <StorybookContent {...args} />,
  args: {
    items: nestedItems,
    initialPath: '/',
    initialOpen: false,
    headerTitle: 'MAIN PANEL',
  },
}

export const NestedMenuOpen: SidebarStory = {
  ...Template,
  name: 'Nested Menu',
  args: {
    ...Template.args,
    items: nestedItems,
    initialPath: '/resources/admin/roles',
    initialOpen: true,
  },
}

export const OneLevelMenuOpen: SidebarStory = {
  ...Template,
  name: 'One Level Menu',
  args: {
    ...Template.args,
    items: simpleItems,
    initialPath: '/products',
    initialOpen: true,
  },
}

export const InitialClosedState: SidebarStory = {
  ...Template,
  name: 'Initial Closed State',
  args: {
    ...Template.args,
    initialPath: '/dashboard',
    initialOpen: false,
  },
}

export const DeeplyNestedMenu: SidebarStory = {
  ...Template,
  name: 'Deeply Nested',
  args: {
    ...Template.args,
    items: nestedItems,
    initialPath: '/resources/admin/config',
    initialOpen: true,
  },
}
