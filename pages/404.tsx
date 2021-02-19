import NextLink from 'next/link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ErrorLayout from '../layouts/Error'

const FourOhFour = () => {
  const mobileDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const classes = useStyles()

  return (
    <>
      <Typography
        align="center"
        component="h1"
        variant={mobileDevice ? 'h4' : 'h1'}
      >
        404: The page you are looking for isn’t here
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Page not found"
          className={classes.image}
          src="/undraw_page_not_found_su7k.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <NextLink href="/" passHref>
          <Button color="primary" variant="outlined">
            Back to home
          </Button>
        </NextLink>
      </div>
    </>
  )
}

FourOhFour.Layout = ErrorLayout

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      marginTop: theme.spacing(6),
      display: 'flex',
      justifyContent: 'center'
    },
    image: {
      maxWidth: '100%',
      width: 560,
      maxHeight: 300,
      height: 'auto'
    },
    imageContainer: {
      marginTop: theme.spacing(6),
      display: 'flex',
      justifyContent: 'center'
    }
  })
)

export default FourOhFour
