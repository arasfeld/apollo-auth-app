import React from 'react'
import NextLink from 'next/link'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useAuth } from '../../../lib/auth-context'

const AuthHeaderItem: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const { logout, user } = useAuth()
  const classes = useStyles()

  const handleLogout = (event: React.MouseEvent<EventTarget>) => {
    handleClose(event)
    logout()
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  if (!user) {
    return (
      <NextLink href="/login" passHref>
        <Button color="inherit">
          Sign In
        </Button>
      </NextLink>
    )
  }

  return (
    <>
      <Button
        aria-label="account of current user"
        aria-controls="account-menu"
        aria-haspopup="true"
        className={classes.button}
        color="inherit"
        onClick={() => setOpen(value => !value)}
        ref={anchorRef}
      >
        <AccountCircleIcon />&nbsp;
        <Typography variant="body2">
          {user.email}
        </Typography>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps }) => (
            <Grow in={open} {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </>
  )
}

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
})

export default AuthHeaderItem
