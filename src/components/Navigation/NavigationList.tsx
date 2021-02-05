import React from 'react'
import List from '@material-ui/core/List'
import NavigationListItem from './NavigationListItem'
import { NavItem } from './types'

interface Props {
  currentPath: string
  depth?: number
  items: NavItem[]
}

const NavigationList: React.FC<Props> = ({ currentPath, depth = 0, items }) => (
  <List>
    {items.map(item => (
      <NavigationListItem
        active={currentPath === item.href}
        children={item.children && (
          <NavigationList
            currentPath={currentPath}
            depth={depth + 1}
            items={item.children}
          />
        )}
        defaultOpen={currentPath.startsWith(item.href)}
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={item.title}
        title={item.title}
      />
    ))}
  </List>
)

export default NavigationList
