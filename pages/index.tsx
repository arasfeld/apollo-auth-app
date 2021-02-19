import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export default function Home() {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Home
      </Typography>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
  })
)
