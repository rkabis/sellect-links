import React from 'react'
import Typography from '@material-ui/core/Typography'

const getVehicleImage = (size: string): React.ReactElement => {
  switch (size) {
  case 'Motorcycle':
    return (
      <img src='./small.png' alt='small' height={40}/>
    )
  case 'Car':
    return (
      <img src='./medium.png' alt='medium' height={40}/>
    )
  case 'Van':
    return (
      <img src='./large.png' alt='large' height={40}/>
    )
  case null:
    return <div></div>
  default:
    return (
      <Typography variant='h6'>
        {'No service'}
      </Typography>
    )
  }
}

export default getVehicleImage