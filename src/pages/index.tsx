import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Home
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    card: {
      padding: theme.spacing(2),
    },
  })
)
