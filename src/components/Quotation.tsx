import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import priceFormatter from '../utils/priceFormatter'
import { sizeLabeler } from '../utils/sizeLabeler'
import getVehicleImage from '../utils/getVehicleImage'
import getProviderImage from '../utils/getProviderImage'

interface Props {
	provider: string;
	fee: string;
  url: string;
  size: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vehicle: {
    marginLeft: theme.spacing(1)
  },
  aTag: {
    textDecoration: 'none'
  }
}))

const Quotation = (props: Props): ReactElement => {
  const {
    provider,
    fee,
    url,
    size
  } = props

  const classes = useStyles()

  const vehicle = sizeLabeler(provider, size)

  return (
    <>
      <div className={classes.root}>
        <Typography variant='h6'>
          { (fee && vehicle) ? priceFormatter(fee) : ''}
        </Typography>
        <div className={classes.icons}>
          <a
            href={vehicle && url}
            target="_blank"
            className={classes.aTag}
            rel="noreferrer"
          >
            {
              getProviderImage(provider)
            }
          </a>
          <div className={classes.vehicle}>
            {
              getVehicleImage(vehicle)
            }
          </div>
        </div>

      </div>
    </>
  )
}

export default Quotation