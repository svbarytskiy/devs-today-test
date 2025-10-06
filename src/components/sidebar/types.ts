import type { FC } from 'react'

export interface MenuItem {
  id: string
  label: string
  path?: string
  icon?: FC<any>
  children?: MenuItem[]
}
