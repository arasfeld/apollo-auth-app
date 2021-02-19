import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Header from './Header'
import LeftNav from './LeftNav'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    container: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden'
    },
    content: {
      overflowY: 'auto',
      flex: '1 1 auto'
    },
    header: {
      position: 'relative',
      zIndex: 2,
    },
    leftNav: {
      flex: '0 0 auto',
      minWidth: 256,
      width: 256,
      zIndex: 3,
    },
  })
)

const Main: React.FC = ({ children }) => {
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header className={classes.header} toggleMobileNav={() => setOpenNavBarMobile(value => !value)} />
      <div className={classes.container}>
        <LeftNav
          className={classes.leftNav}
          onMobileClose={() => setOpenNavBarMobile(false)}
          openMobile={openNavBarMobile}
        />
        <main className={classes.content}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Main
