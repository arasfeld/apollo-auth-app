import React, { useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AuthLayout from '../layouts/Auth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const classes = useStyles()

  const submit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('forgot password - email:', email)
  }, [email])

  return (
    <Card>
      <CardContent>
        <Typography component="h1" variant="h5" gutterBottom>
          Forgot Your Password?
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
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

ForgotPassword.Layout = AuthLayout

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)

export default ForgotPassword
