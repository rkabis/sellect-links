import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))

interface Props {
  needHelp?: boolean;
}

const Header = (props: Props): ReactElement => {
  const { needHelp } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={'./white-logo.png'} width={200} />
      {
        (needHelp) && (
          <Button variant='contained' className={classes.button}>
            {'Need Help?'}
          </Button>
        )
      }
    </div>
  )
}

export default Header