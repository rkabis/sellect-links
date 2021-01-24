import React, { ReactElement } from 'react'

import { useRouter } from 'next/router'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_QUOTATION, UPDATE_LINKVIEW } from '../utils/gqlMutations'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import LocationAutocomplete from '../components/LocationAutocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import BaseMap from '../components/BaseMap'

import ImageViewer from '../components/ImageViewer'
import Header from '../components/Header'

import { isValidEmail } from '../utils/stringUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1)
  },
  divider: {
    width: '80%',
    height: theme.spacing(0.25),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  vehicleField: {
    width: 300,
    marginTop: theme.spacing(2)
  },
  textField: {
    width: 300
  },
  map: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

interface Props {
  data: any;
}

const UseLink = (props: Props): ReactElement => {
  const { data } = props
  const [to, setTo] = React.useState(null)
  const [size, setSize] = React.useState('small')
  const [customerName, setCustomerName] = React.useState('')
  const [customerEmail, setCustomerEmail] = React.useState('')
  const [customerContactNumber, setCustomerContactNumber] = React.useState('')
  const [latLng, setLatLng] = React.useState()
  const classes = useStyles()
  const router = useRouter()

  const [createQuotation, { loading }] = useMutation(CREATE_QUOTATION)
  const [updateLinkView] = useMutation(UPDATE_LINKVIEW)

  React.useEffect(() => {
    updateLinkView({ variables: { linkId: data.linkId } })
  }, [])

  const handleBook = async () => {
    const { data: quotationData } = await createQuotation({
      variables: {
        linkId: data.linkId,
        customerName,
        customerContactNumber,
        customerEmail,
        customerLocation: to,
        vehicleType: size
      }
    })

    if (quotationData) {
      if (quotationData.createQuotation.isSuccessful) {
        router.push(`/quotation?id=${quotationData.createQuotation.quotationId}`)
      }
    }
  }

  const isButtonDisabled = !isValidEmail(customerEmail) || to == null || loading || customerContactNumber == '' || customerEmail == '' || customerName == ''

  return (
    <div className={classes.root}>
      <Header />
      <ImageViewer url={data.businessPhoto} />
      <Typography>{data.businessName}</Typography>
      <Typography>{data.businessContactNumber}</Typography>
      <Typography>
        {`${data.businessHours.lower} - ${data.businessHours.upper}`}
      </Typography>
      <Typography>{data.businessLocation}</Typography>
      <Divider className={classes.divider} />
      <TextField
        label={'Customer Name'}
        required
        className={classes.textField}
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
      />
      <TextField
        label={'Customer Email'}
        required
        className={classes.textField}
        value={customerEmail}
        onChange={e => setCustomerEmail(e.target.value)}
        error={!isValidEmail(customerEmail) && customerEmail.length > 0}
        helperText={
          !isValidEmail(customerEmail) &&
                  customerEmail.length > 0 && 'Please enter valid email'
        }
      />
      <TextField
        label={'Customer Mobile Number'}
        required
        className={classes.textField}
        value={customerContactNumber}
        onChange={e => setCustomerContactNumber(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">{'(+63)'}</InputAdornment>
        }}
      />
      <LocationAutocomplete
        label='Delivery Location'
        value={to}
        setValue={setTo}
        setLatLng={(e: any) => setLatLng(e)}
      />
      <div className={classes.map}>
        <BaseMap points={(to && latLng) && [latLng]} />
      </div>
      <Select
        value={size}
        className={classes.vehicleField}
        onChange={ev => setSize(ev.target.value as string)}
      >
        <MenuItem value={'small'}>{'Motorcycle (up to 20kg)'}</MenuItem>
        <MenuItem value={'medium'}>{'Car (up to 300kg)'}</MenuItem>
        <MenuItem value={'large'}>{'Van (up to 600kg)'}</MenuItem>
      </Select>
      <Button
        onClick={() => handleBook()}
        className={classes.button}
        disabled={isButtonDisabled}
        variant='contained'
      >
        { loading ? <CircularProgress /> : 'QUOTE' }
      </Button>
    </div>
  )
}

export default UseLink