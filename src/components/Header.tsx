import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))

const Header = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={'./white-logo.png'} width={200} />
      <Button variant='contained' className={classes.button}>
        {'Need Help?'}
      </Button>
    </div>
  )
}

export default Header