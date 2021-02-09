import { createMuiTheme } from '@material-ui/core/styles'

import palette from './palette'
import overrides from './overrides'

const theme = createMuiTheme({
  palette,
  overrides,
})

export default theme
