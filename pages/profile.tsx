import React, { useCallback, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { useUpdateUserMutation } from '../graphql/types'
import { useAuth } from '../lib/auth-context'

const Profile = () => {
  const { user } = useAuth()
  const [updateUserMutation] = useUpdateUserMutation()
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState(null)
  const classes = useStyles()

  const submit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await updateUserMutation({
      variables: {
        email,
        firstName,
        lastName,
      }
    })
  }, [email, firstName, lastName])

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const imageFile = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.addEventListener('load', (e) => setAvatar(e.target.result))
    fileReader.readAsDataURL(imageFile)
  }

  return (
    <Container className={classes.root} maxWidth="lg">
      <Card>
        <form onSubmit={submit} noValidate>
          <CardContent>
            <Typography component="h1" variant="h5" gutterBottom>
              Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid item container xs={12} sm={6} justify="center" alignItems="center">
                <TextField
                  autoComplete="fname"
                  fullWidth
                  label="First Name"
                  margin="normal"
                  onChange={(evt) => setFirstName(evt.target.value)}
                  required
                  value={firstName}
                  variant="outlined"
                />
                <TextField
                  autoComplete="lname"
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  onChange={(evt) => setLastName(evt.target.value)}
                  required
                  value={lastName}
                  variant="outlined"
                />
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
              </Grid>
              <Grid item container xs={12} sm={6} justify="center" alignItems="center">
                <input
                  accept="image/*"
                  className={classes.fileInput}
                  id="icon-button-file"
                  onChange={selectImage}
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton aria-label="upload avatar" className={classes.avatarButton} component="span">
                    {avatar ? (
                      <Avatar className={classes.avatar} src={avatar} />
                    ) : (
                      <Avatar className={classes.avatar}>
                        <AddAPhotoIcon className={classes.addAvatarIcon} color="action" />
                      </Avatar>
                    )}
                    
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
            >
              Save Changes
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    addAvatarIcon: {
      fontSize: 80,
    },
    avatar: {
      backgroundColor: '#353B45',
      height: '12rem',
      width: '12rem',
    },
    avatarButton: {
      margin: 'auto',
      padding: 0,
    },
    fileInput: {
      display: 'none',
    },
  })
)

export default Profile
