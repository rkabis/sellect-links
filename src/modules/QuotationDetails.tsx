import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import Header from '../components/Header'
import BaseMap from '../components/BaseMap'
import Quotation from '../components/Quotation'
import QuotationDialog from '../components/QuotationDialog'
import Footer from '../components/Footer'

import providerToUrl from '../utils/providerToUrl'
import whatDevice from '../utils/whatDevice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  button: {
    marginTop: theme.spacing(1)
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 400,
    alignItems: 'baseline',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  fieldButton: {
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
  },
  sectionTitle: {
    width: 400
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
  const [device, setDevice] = React.useState('')
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const initialCopyState = {
    businessName: false,
    businessContactNumber: false,
    businessLocation: false,
    customerName: false,
    customerContactNumber: false,
    customerLocation: false
  }

  const reducer = (state: any, action: any) => {
    return { ...initialCopyState, [action.field]: true }
  }

  const [copyState, dispatch] = React.useReducer(reducer, initialCopyState)

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

  const handleCopyField = (field: string, fieldValue: string) => {
    navigator.clipboard.writeText(fieldValue)

    dispatch({ field })
  }

  return (
    <div className={classes.root}>
      <QuotationDialog open={open} handleClose={() => setOpen(false)} />
      <Header />
      <div className={classes.sectionTitle}><Typography variant="h6">{'Pick-up Details'}</Typography></div>
      <div className={classes.field}>
        <Typography>
          {`${businessDetails.businessHours.lower} - ${businessDetails.businessHours.upper}`}
        </Typography>
      </div>
      <div className={classes.field}>
        <Typography>{businessDetails.businessName}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('businessName', businessDetails.businessName)}
          disabled={copyState.businessName}
          className={classes.fieldButton}
        >
          { copyState.businessName ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <div className={classes.field}>
        <Typography>{businessDetails.businessContactNumber}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('businessContactNumber', businessDetails.businessContactNumber)}
          disabled={copyState.businessContactNumber}
          className={classes.fieldButton}
        >
          { copyState.businessContactNumber ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <div className={classes.field}>
        <Typography>{tripDetails.origin.name}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('businessLocation', tripDetails.origin.name)}
          disabled={copyState.businessLocation}
          className={classes.fieldButton}
        >
          { copyState.businessLocation ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.sectionTitle}><Typography variant="h6">{'Delivery Details'}</Typography></div>
      <div className={classes.field}>
        <Typography>{customerDetails.customerName}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('customerName', customerDetails.customerName)}
          disabled={copyState.customerName}
          className={classes.fieldButton}
        >
          { copyState.customerName ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <div className={classes.field}>
        <Typography>{customerDetails.customerContactNumber}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('customerContactNumber', customerDetails.customerContactNumber)}
          disabled={copyState.customerContactNumber}
          className={classes.fieldButton}
        >
          { copyState.customerContactNumber ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <div className={classes.field}>
        <Typography>{tripDetails.destination.name}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyField('customerLocation', tripDetails.destination.name)}
          disabled={copyState.customerLocation}
          className={classes.fieldButton}
        >
          { copyState.customerLocation ? 'Copied' : 'Copy' }
        </Button>
      </div>
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
      <Footer />
    </div>
  )
}

export default QuotationDetails