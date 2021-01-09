import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3)
  }
}))

interface Props {
  email: any;
}

const Success = (props: Props): ReactElement => {
  const { email } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header needHelp={false} />
      <Typography>
        {`Success! We've sent your Sellect Express Link to ${email}. Please check Primary, Social, and Promotions tabs.`}
      </Typography>
    </div>
  )
}

export default Success