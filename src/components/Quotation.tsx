import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import priceFormatter from '../utils/priceFormatter'
import { sizeLabeler } from '../utils/sizeLabeler'
import getVehicleImage from '../utils/getVehicleImage'
import getProviderImage from '../utils/getProviderImage'

interface Props {
	provider: string;
	fee: string;
  url: string;
  cookie: string;
  size: string;
  description: Array<string>;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    backgroundColor: 'black',
    width: 150,
    color: 'white',
    '&:disabled': {
      backgroundColor: 'gray',
      color: 'white'
    },
    [theme.breakpoints.up('md')]: {
      width: 100,
      marginRight: theme.spacing(2)
    }
  },
  description: {
    display: 'flex',
    flexDirection: 'column'
  },
  divider: {
    width: '100%',
    backgroundColor: 'gray'
  },
  aTag: {
    textDecoration: 'none'
  },
  buttonContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: theme.spacing(1)
    }
  },
  providerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: theme.spacing(22)
  }
}))

const Quotation = (props: Props): ReactElement => {
  const {
    provider,
    fee,
    url,
    cookie,
    size,
    description
  } = props

  const classes = useStyles()
  const date = new Date()

  const vehicle = sizeLabeler(provider, size)

  return (
    <>
      <Grid
        className={classes.root}
        container
        direction='row'
        alignItems='center'
        justify='space-between'
      >
        <Grid item xs={7} md={5}>
          <div className={classes.providerInfo}>
            <div>
              {
                getProviderImage(provider)
              }
              <Typography variant='h5'>
                { (fee && vehicle) ? priceFormatter(fee) : ''}
              </Typography>
            </div>
            {
              getVehicleImage(vehicle)
            }
          </div>
        </Grid>
        <Grid item className={classes.description} xs={5} md={5}>
          {
            description.map((e, i) => {
              return (
                <Typography key={i}>{e}</Typography>
              )
            })
          }
        </Grid>
        <Grid item xs={12} md={2} className={classes.buttonContainer}>
          {!(url != null && !vehicle) && (
            <a
              href={vehicle && url}
              target="_blank"
              className={classes.aTag}
              rel="noreferrer"
            >
              <Button
                className={classes.button}
                variant='contained'
                disabled={(!vehicle || url == null) && true}
              >
                {(!vehicle || url == null) ? 'SOON' :'BOOK'}
              </Button>
            </a>
          )}
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
    </>
  )
}

export default Quotation