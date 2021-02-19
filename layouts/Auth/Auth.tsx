import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Logo } from '../../components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(8, 0)
    }
  })
)

const Auth: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="xs">
      <Box display="flex" justifyContent="center" mb={8}>
        <Logo />
      </Box>
      <main>
        {children}
      </main>
    </Container>
  )
}

export default Auth
