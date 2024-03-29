import React, { ReactElement } from 'react'

import { useRouter } from 'next/router'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_LINK } from '../utils/gqlMutations'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LocationAutocomplete from '../components/LocationAutocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Alert from '@material-ui/lab/Alert'
import Header from '../components/Header'
import ImageUploader from '../components/ImageUploader'
import BaseMap from '../components/BaseMap'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers'

import { isValidEmail } from '../utils/stringUtils'

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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  selectField: {
    width: 300,
    marginTop: theme.spacing(2)
  },
  textField: {
    width: 300
  },
  timeField: {
    width: 130
  },
  timeDiv: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    width: 300,
    justifyContent: 'space-between',
    marginTop: theme.spacing(1)
  },
  pickersDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    justifyContent: 'space-between'
  },
  map: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const GenerateLink = (): ReactElement => {
  const [businessEmail, setBusinessEmail] = React.useState('')
  const [from, setFrom] = React.useState(null)
  const [businessContactNumber, setBusinessContactNumber] = React.useState('')
  const [businessName, setBusinessName] = React.useState('')
  const [lower, setLower] = React.useState(new Date(2020, 12, 31, 9, 0, 0, 0))
  const [upper, setUpper] = React.useState(new Date(2020, 12, 31, 18, 0, 0, 0))
  const [url, setUrl] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [latLng, setLatLng] = React.useState()

  const classes = useStyles()
  const router = useRouter()
  const [createLink, { loading }] = useMutation(CREATE_LINK)

  const isButtonDisabled = !isValidEmail(businessEmail) || from == null || businessEmail == '' || businessName == '' || loading || businessContactNumber == '' || lower == null || upper == null

  const handleConfirm = async () => {
    const { data } = await createLink({
      variables: {
        businessName,
        businessEmail,
        businessLocation: from,
        businessContactNumber,
        businessPhoto: url,
        businessHours: {
          lower: lower.toLocaleTimeString(navigator.language, { hour: '2-digit', minute:'2-digit' }),
          upper: upper.toLocaleTimeString(navigator.language, { hour: '2-digit', minute:'2-digit' })
        }
      }
    })

    if (data) {
      if (data.createLink.isSuccessful) {
        router.push(`/success?email=${businessEmail}`)
      } else {
        setIsError(true)
      }
    }
  }

  return (
    <div className={classes.root}>
      <Header />
      <ImageUploader
        url={url}
        setUrl={setUrl}
      />
      <TextField
        label={'Seller Name'}
        required
        className={classes.textField}
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
      />
      <TextField
        label={'Seller Email'}
        required
        className={classes.textField}
        value={businessEmail}
        onChange={e => setBusinessEmail(e.target.value)}
        error={!isValidEmail(businessEmail) && businessEmail.length > 0}
        helperText={
          !isValidEmail(businessEmail) &&
                  businessEmail.length > 0 && 'Please enter valid email'
        }
      />
      <LocationAutocomplete
        label='Seller Pick-up Location'
        value={from}
        setValue={setFrom}
        setLatLng={(e: any) => setLatLng(e)}
      />
      <div className={classes.map}>
        <BaseMap points={(from && latLng) && [latLng]} />
      </div>
      <TextField
        label={'Seller Contact Number'}
        required
        className={classes.textField}
        value={businessContactNumber}
        onChange={e => setBusinessContactNumber(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">{'(+63)'}</InputAdornment>
        }}
      />
      <div className={classes.timeDiv}>
        <Typography color="textSecondary">{'Pick-up Hours *'}</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.pickersDiv}>
            <KeyboardTimePicker
              className={classes.timeField}
              value={lower}
              onChange={setLower}
              views={['hours', 'minutes']}
            />
            &#8212;
            <KeyboardTimePicker
              className={classes.timeField}
              value={upper}
              onChange={setUpper}
              views={['hours', 'minutes']}
            />
          </div>
        </MuiPickersUtilsProvider>
      </div>
      <Button
        variant='contained'
        className={classes.button}
        onClick={(): Promise<void> => handleConfirm()}
        disabled={isButtonDisabled}
      >
        { loading ? <CircularProgress /> : 'CREATE' }
      </Button>
      { isError && <Alert severity="error">{'Please try again.'}</Alert> }
    </div>
  )
}

export default GenerateLink