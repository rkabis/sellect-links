import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))

const Footer = (): ReactElement => {
  const classes = useStyles()

  const handleHelpClick = () => {
    const mail = 'mailto:sellectexpress@gmail.com'
    const a = document.createElement('a')
    a.href = mail
    a.target='_blank'
    a.click()
  }

  return (
    <div className={classes.root}>
      <Button
        variant='contained'
        className={classes.button}
        onClick={() => handleHelpClick()}
      >
        {'Need Help?'}
      </Button>
    </div>
  )
}

export default Footer