import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LocationAutocomplete from '../components/LocationAutocomplete'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

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
  const [size, setSize] = React.useState('small')
  const classes = useStyles()

  const isButtonDisabled = from == null || email == '' || contactNumber == '' || businessName == ''

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
      <Select
        value={size}
        className={classes.selectField}
        onChange={ev => setSize(ev.target.value as string)}
      >
        <MenuItem value={'small'}>{'Motorcycle (up to 20kg)'}</MenuItem>
        <MenuItem value={'medium'}>{'Car (up to 300kg)'}</MenuItem>
        <MenuItem value={'large'}>{'Van (up to 600kg)'}</MenuItem>
      </Select>
      <Button
        variant='contained'
        className={classes.button}
        onClick={(): void => onSearch()}
        disabled={isButtonDisabled}
      >
        {'CONFIRM'}
      </Button>
    </div>
  )
}

export default GenerateLink