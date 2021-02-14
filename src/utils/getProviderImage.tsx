import React from 'react'
import Typography from '@material-ui/core/Typography'

const getProviderImage = (provider: string): React.ReactElement => {
  switch (provider) {
  case 'Grab':
    return (
      <img src='./grab.png' alt='grab' height={25}/>
    )
  case 'Lalamove':
    return (
      <img src='./lalamove.png' alt='lalamove' height={30}/>
    )
  case 'Happymove':
    return (
      <img src='./happymove.png' alt='happymove' height={20}/>
    )
  case 'Transportify':
    return (
      <img src='./transportify.png' alt='transportify' height={25}/>
    )
  case 'MrSpeedy':
    return (
      <img src='./mrspeedy.png' alt='mrspeedy' height={25}/>
    )
  case 'Angkas':
    return (
      <img src='./angkas.png' alt='angkas' height={30}/>
    )
  case 'ElleMovers':
    return (
      <img
        src='./ellemovers.png'
        alt='ellemovers'
        height={45}
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
        height={15}
        style={{
          marginTop: 15,
          marginBottom: 15
        }}
      />
    )
  case 'Toktok':
    return (
      <img
        src='./toktok.png'
        alt='toktok'
        height={30}
      />
    )
  case 'JGO':
    return (
      <img src='./jgo.png' alt='jgo' height={20}/>
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