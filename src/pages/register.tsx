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
import { useAuth } from '../auth/auth-context'
import AuthLayout from '../layouts/Auth'

const Register = () => {
  const { register } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const classes = useStyles()

  const submit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register({ email, firstName, lastName,password })
      .then(() => {
        router.push('/')
      })
  }, [email, firstName, lastName, password])

  return (
    <Card>
      <CardContent>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={submit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                autoFocus
                fullWidth
                label="First Name"
                onChange={(evt) => setFirstName(evt.target.value)}
                required
                value={firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                fullWidth
                label="Last Name"
                onChange={(evt) => setLastName(evt.target.value)}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            autoComplete="email"
            fullWidth
            label="Email Address"
            margin="normal"
            onChange={(evt) => setEmail(evt.target.value)}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="new-password"
            fullWidth
            label="Password"
            margin="normal"
            onChange={(evt) => setPassword(evt.target.value)}
            required
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
            Sign Up
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <NextLink href="/login" passHref>
              <Link variant="body2">
                Already have an account? Sign in
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Register.Layout = AuthLayout

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)

export default Register
