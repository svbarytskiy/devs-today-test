import { type FC } from 'react'
import Header from './components/header'
import { Sidebar } from './components/sidebar/Sidebar'
import type { MenuItem } from './components/sidebar/types'

const appMenuItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', path: '/dashboard' },
  {
    id: '2',
    label: 'Reports',
    children: [{ id: '2.1', label: 'Sales', path: '/reports/sales' }],
  },
]

export const App: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header title="My Dashboard App" />

      <main className="p-4 md:p-8"></main>

      <Sidebar items={appMenuItems} initialPath="/" />
    </div>
  )
}
