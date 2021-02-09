import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const Error: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      {children}
    </main>
  )
}

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  }
})

export default Error
