import React, { useCallback, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useAuth } from '../lib/auth-context'
import AuthLayout from '../layouts/Auth'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const classes = useStyles()

  const submit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login({ email, password })
      .then(() => {
        router.push('/')
      })
  }, [email, password])

  return (
    <Card>
      <CardContent>
        <Typography component="h1" variant="h5" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={submit} noValidate>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            label="Email Address"
            margin="normal"
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label="Password"
            margin="normal"
            onChange={(evt) => setPassword(evt.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <NextLink href="/forgot-password" passHref>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </NextLink>
          </Grid>
          <Grid item>
            <NextLink href="/register" passHref>
              <Link variant="body2">
                Don't have an account? Sign Up
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Login.Layout = AuthLayout

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)

export default Login
