import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
  data: any;
}

const QuotationDetails = (props: Props): ReactElement => {
  const { data } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography>{data.origin.location}</Typography>
      <Typography>{data.destination.location}</Typography>
      <Typography>{data.distance}</Typography>
      <Typography>{data.duration}</Typography>
      {
        data.fees.map((fee: any) => {
          return (
            <Typography key={fee.provider}>
              {`${fee.provider}: ${fee.fee}`}
            </Typography>
          )
        })
      }
    </div>
  )
}

export default QuotationDetails