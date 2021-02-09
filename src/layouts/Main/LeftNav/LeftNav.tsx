import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Navigation } from '../../../components'
import links from './links'

interface Props {
  className?: string 
  onMobileClose: () => void
  openMobile: boolean
}

const LeftNav: React.FC<Props> = ({ className, onMobileClose, openMobile }) => {
  const classes = useStyles()

  const navContent = (
    <nav className={classes.content}>
      {links.map(list => (
        <Navigation
          key={list.title}
          items={list.pages}
          title={list.title}
        />
      ))}
    </nav>
  )

  return (
    <>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden lgUp implementation="css">
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={clsx(classes.root, className)}>
            {navContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Paper
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navContent}
        </Paper>
      </Hidden>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      overflowY: 'auto',
    },
    content: {
      padding: theme.spacing(2),
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 240,
        flexShrink: 0,
      },
    },
  })
)

export default LeftNav
