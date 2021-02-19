import React from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { Logo } from '../../../components'
import AuthHeaderItem from './AuthHeaderItem'

interface Props {
  className?: string
  toggleMobileNav: () => void
}

const Header: React.FC<Props> = ({ className, toggleMobileNav }) => {
  const classes = useStyles()

  return (
    <AppBar color="inherit" className={clsx(classes.root, className)}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          className={classes.menuButton}
          color="inherit"
          edge="start"
          onClick={toggleMobileNav}
        >
          <MenuIcon />
        </IconButton>
        <Logo height={30} />
        <div className={classes.divider} />
        <AuthHeaderItem />
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer + 1,
    },
    divider: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  })
)

export default Header
