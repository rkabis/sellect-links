import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import Header from '../components/Header'
import BaseMap from '../components/BaseMap'
import Quotation from '../components/Quotation'

import providerToUrl from '../utils/providerToUrl'
import whatDevice from '../utils/whatDevice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1)
  },
  origin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  originButton: {
    marginLeft: theme.spacing(2)
  },
  divider: {
    height: 1,
    width: 400,
    backgroundColor: 'gray',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  grid: {
    width: 350,
    marginTop: theme.spacing(1)
  }
}))

interface Props {
  data: any;
}

const QuotationDetails = (props: Props): ReactElement => {
  const { data } = props
  const {
    quotationId,
    tripDetails,
    customerDetails,
    businessDetails } = data
  const [hasCopied, setHasCopied] = React.useState(false)
  const [hasCopiedOrigin, setHasCopiedOrigin] = React.useState(false)
  const [device, setDevice] = React.useState('')
  const classes = useStyles()

  React.useEffect(() => {
    setDevice(whatDevice())
  }, [])

  const handleCopy = async () => {
    if (navigator.share) {
      const url = `/quotation?id=${data.quotationId}`
      navigator.share({
        title: 'Sellect Links',
        text: 'Share your link!',
        url
      })
    } else {
      const url = `${window.location.hostname}/quotation?id=${quotationId}`

      navigator.clipboard.writeText(url)
      setHasCopied(true)
    }
  }

  const handleCopyOrigin = async () => {
    const origin = tripDetails.origin.name

    navigator.clipboard.writeText(origin)
    setHasCopiedOrigin(true)
  }

  return (
    <div className={classes.root}>
      <Header />
      <Typography>{businessDetails.businessName}</Typography>
      <Typography>
        {`${businessDetails.businessHours.lower} - ${businessDetails.businessHours.upper}`}
      </Typography>
      <Typography>{businessDetails.businessContactNumber}</Typography>
      <div className={classes.origin}>
        <Typography>{tripDetails.origin.name}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyOrigin()}
          disabled={hasCopiedOrigin}
          className={classes.originButton}
        >
          { hasCopiedOrigin ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <Divider className={classes.divider} />
      <Typography>{tripDetails.destination.name}</Typography>
      <Typography>{customerDetails.customerContactNumber}</Typography>
      <Divider className={classes.divider} />
      <Typography>{`${tripDetails.duration} - ${tripDetails.distance}`}</Typography>
      <BaseMap
        points={
          [
            { lat: tripDetails.origin.lat, lng: tripDetails.origin.lng },
            { lat: tripDetails.destination.lat, lng: tripDetails.destination.lng }
          ]
        }
      />
      <Grid container spacing={1} className={classes.grid}>
        {
          tripDetails.fees.map((fee: any) => {
            return (
              <Grid
                key={fee.provider}
                item
                xs={6}
              >
                <Quotation
                  provider={fee.provider}
                  fee={fee.fee}
                  url={providerToUrl(
                    fee.provider,
                    tripDetails.origin,
                    tripDetails.destination,
                    tripDetails.vehicleType,
                    device
                  )}
                  size={tripDetails.vehicleType}
                />
              </Grid>
            )
          })
        }
      </Grid>
      <Button
        variant='contained'
        onClick={() => handleCopy()}
        className={classes.button}
        disabled={hasCopied}
      >
        { hasCopied ? 'Copied' : 'Share' }
      </Button>
    </div>
  )
}

export default QuotationDetails