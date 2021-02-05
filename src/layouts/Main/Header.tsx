import React from 'react'
import NextLink from 'next/link'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import { useAuth } from '../../auth/auth-context'
import { Logo } from '../../components'

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

interface Props {
  className?: string
  toggleMobileNav: () => void
}

const Header: React.FC<Props> = ({ className, toggleMobileNav }) => {
  const { user } = useAuth()
  const classes = useStyles()

  return (
    <AppBar className={clsx(classes.root, className)}>
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
        {!user && (
          <NextLink href="/login" passHref>
            <Button color="inherit">
              Sign In
            </Button>
          </NextLink>
        )}
        {user && (
          <Button color="inherit">
            <AccountCircleIcon />&nbsp;
            {user.email}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
