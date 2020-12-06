import React from 'react'
import Typography from '@material-ui/core/Typography'

const getProviderImage = (provider: string): React.ReactElement => {
  switch (provider) {
  case 'Grab':
    return (
      <img src='./grab.png' alt='grab' height={30}/>
    )
  case 'Lalamove':
    return (
      <img src='./lalamove.png' alt='lalamove' height={35}/>
    )
  case 'Happymove':
    return (
      <img src='./happymove.png' alt='happymove' height={25}/>
    )
  case 'Transportify':
    return (
      <img src='./transportify.png' alt='transportify' height={30}/>
    )
  case 'MrSpeedy':
    return (
      <img src='./mrspeedy.png' alt='mrspeedy' height={35}/>
    )
  case 'Angkas':
    return (
      <img src='./angkas.png' alt='angkas' height={35}/>
    )
  case 'ElleMovers':
    return (
      <img
        src='./ellemovers.png'
        alt='ellemovers'
        height={50}
        style={{
          marginTop: 5
        }}
      />
    )
  case 'Byaheros':
    return (
      <img
        src='./byaheros.png'
        alt='byaheros'
        height={20}
        style={{
          marginTop: 15,
          marginBottom: 15
        }}
      />
    )
  default:
    return (
      <Typography variant='h6'>
        {'No provider'}
      </Typography>
    )
  }
}

export default getProviderImage