import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  }
}))

const Header = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={'./white-logo.png'} width={200} />
    </div>
  )
}

export default Header