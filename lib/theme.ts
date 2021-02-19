import green from '@material-ui/core/colors/green'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#1c2025',
      paper: '#282C34'
    },
    primary: green,
    secondary: green,
    text: {
      primary: '#e6e5e8',
      secondary: '#adb0bb',
    },
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #__next': {
          height: '100%',
        },
      },
    },
  },
})

export default theme
