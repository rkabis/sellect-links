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

import ImageViewer from '../components/ImageViewer'

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
  }
}))

interface Props {
  data: any;
}

const UseLink = (props: Props): ReactElement => {
  const { data } = props
  const [to, setTo] = React.useState(null)
  const [size, setSize] = React.useState('small')
  const [customerEmail, setCustomerEmail] = React.useState('')
  const [customerNumber, setCustomerNumber] = React.useState('')
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
        customerNumber,
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

  const isButtonDisabled = to == null || loading || customerNumber == '' || customerEmail == ''

  return (
    <div className={classes.root}>
      <ImageViewer url={data.businessPhoto} />
      <Typography>{data.businessName}</Typography>
      <Typography>{data.businessContactNumber}</Typography>
      <Typography>{data.businessLocation}</Typography>
      <Divider className={classes.divider} />
      <TextField
        label={'Customer Email'}
        required
        className={classes.textField}
        value={customerEmail}
        onChange={e => setCustomerEmail(e.target.value)}
      />
      <TextField
        label={'Customer Mobile Number'}
        required
        className={classes.textField}
        value={customerNumber}
        onChange={e => setCustomerNumber(e.target.value)}
      />
      <LocationAutocomplete
        label='Delivery Location'
        value={to}
        setValue={setTo}
      />
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