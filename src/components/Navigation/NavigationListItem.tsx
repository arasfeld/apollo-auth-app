import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
  active?: boolean
  className?: string
  defaultOpen?: boolean
  depth: number
  href?: string
  icon?: React.FC<React.HTMLAttributes<HTMLOrSVGElement>>
  title: string
}

const NavigationListItem: React.FC<Props> = ({
  active = false,
  className,
  children,
  defaultOpen = false,
  depth = 0,
  href,
  icon: Icon,
  title,
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const classes = useStyles()

  const style = {
    paddingLeft: depth > 0 ? 32 + 8 * depth : 8
  }

  if (children) {
    return (
      <ListItem className={clsx(classes.item, className)} disableGutters>
        <Button
          className={classes.button}
          onClick={() => setOpen(value => !value)}
          style={style}
        >
          {Icon && <Icon className={classes.icon} />}
          {title}
          {open
            ? <ExpandLessIcon className={classes.expandIcon} color="inherit" />
            : <ExpandMoreIcon className={classes.expandIcon} color="inherit" />
          }
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    )
  } else {
    return (
      <Link href={href} passHref>
        <ListItem className={clsx(classes.itemLeaf, className)} component="a" disableGutters>
          <Button
            className={clsx(classes.buttonLeaf, `depth-${depth}`, {
              [classes.active]: active
            })}
            style={style}
          >
            {Icon && <Icon className={classes.icon} />}
            {title}
          </Button>
        </ListItem>
      </Link>
    )
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0
    },
    itemLeaf: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      // color: colors.blueGrey[800],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%'
    },
    buttonLeaf: {
      // color: colors.blueGrey[800],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      '&.depth-0': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    icon: {
      // color: theme.palette.text.primary,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    expandIcon: {
      marginLeft: 'auto',
      height: 16,
      width: 16
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main
      }
    }
  })
)

export default NavigationListItem
