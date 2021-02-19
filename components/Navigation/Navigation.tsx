import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NavigationList from './NavigationList'
import { NavItem } from './types'

interface Props {
  className?: string
  items: NavItem[]
  title?: string
}

const Navigation: React.FC<Props> = ({ className, items, title }) => {
  const router = useRouter()
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList currentPath={router.pathname} depth={0} items={items} />
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    }
  })
)

export default Navigation
