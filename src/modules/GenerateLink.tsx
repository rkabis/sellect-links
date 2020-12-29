import React, { ReactElement } from 'react'

import { useRouter } from 'next/router'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_LINK } from '../utils/gqlMutations'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LocationAutocomplete from '../components/LocationAutocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import ImageUploader from '../components/ImageUploader'
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
  }
}))

const GenerateLink = (): ReactElement => {
  const [email, setEmail] = React.useState('')
  const [from, setFrom] = React.useState(null)
  const [contactNumber, setContactNumber] = React.useState('')
  const [businessName, setBusinessName] = React.useState('')
  const [url, setUrl] = React.useState(null)

  const classes = useStyles()
  const router = useRouter()
  const [createLink, { loading }] = useMutation(CREATE_LINK)

  const isButtonDisabled = from == null || email == '' || businessName == '' || loading || contactNumber == ''

  const handleConfirm = async () => {
    const { data } = await createLink({
      variables: {
        businessName: businessName,
        businessEmail: email,
        businessLocation: from,
        businessContactNumber: contactNumber,
        businessPhoto: url
      }
    })

    if (data) {
      if (data.createLink.isSuccessful) {
        router.push(`/dashboard?id=${data.createLink.linkId}`)
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
        label={'Business Name'}
        required
        className={classes.textField}
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
      />
      <TextField
        label={'Business Email'}
        required
        className={classes.textField}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <LocationAutocomplete
        label='Business Pick-up Location'
        value={from}
        setValue={setFrom}
      />
      <TextField
        label={'Business Contact Number'}
        required
        className={classes.textField}
        value={contactNumber}
        onChange={e => setContactNumber(e.target.value)}
      />
      <Button
        variant='contained'
        className={classes.button}
        onClick={(): Promise<void> => handleConfirm()}
        disabled={isButtonDisabled}
      >
        { loading ? <CircularProgress /> : 'CONFIRM' }
      </Button>
    </div>
  )
}

export default GenerateLink