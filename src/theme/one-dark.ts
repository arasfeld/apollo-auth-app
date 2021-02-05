import { createMuiTheme } from '@material-ui/core/styles'
import baseTheme from './base'

export default createMuiTheme({
  ...baseTheme,
  palette: {
    background: {
      default: '#1c2025',
      paper: '#282C34',
    },
    primary: {
      contrastText: '#fff',
      dark: 'rgb(96, 93, 178)',
      light: 'rgb(161, 157, 255)',
      main: '#8a85ff',
    },
    secondary: {
      contrastText: '#fff',
      dark: 'rgb(96, 93, 178)',
      light: 'rgb(161, 157, 255)',
      main: '#8a85ff'
    },
    type: 'dark',
  },
})
