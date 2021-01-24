import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    }
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
      <Header />
      <div className={classes.text}>
        <Typography>
          {`Success! We've sent your Sellect Express Pick-up Page to ${email}. Please check Primary, Social, and Promotions tabs.`}
        </Typography>
      </div>
      <Footer />
    </div>
  )
}

export default Success