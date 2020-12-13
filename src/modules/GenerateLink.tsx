import React, { ReactElement } from 'react'

import { useRouter } from 'next/router'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_LINK } from '../utils/gqlMutations'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LocationAutocomplete from '../components/LocationAutocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

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

  const classes = useStyles()
  const router = useRouter()
  const [createLink, { loading }] = useMutation(CREATE_LINK)

  const isButtonDisabled = from == null || email == '' || contactNumber == '' || businessName == '' || loading

  const handleConfirm = async () => {
    const { data } = await createLink({
      variables: {
        businessName: businessName,
        businessEmail: email,
        businessLocation: from,
        businessContactNumber: contactNumber
      }
    })

    if (data) {
      if (data.createLink.isSuccessful) {
        router.push(`/details?id=${data.createLink.linkId}`)
      }
    }
  }

  return (
    <div className={classes.root}>
      <TextField
        label={'Business Name'}
        className={classes.textField}
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
      />
      <TextField
        label={'Email'}
        className={classes.textField}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <LocationAutocomplete
        label='Pick-up Location'
        value={from}
        setValue={setFrom}
      />
      <TextField
        label={'Contact Number'}
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