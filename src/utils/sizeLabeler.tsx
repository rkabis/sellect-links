export const sizeLabeler = (provider: string, size: string) => {
  const grabObject: any = {
    'small': 'Motorcycle',
    'medium': 'Car',
    'large': null
  }

  const mrspeedyObject: any = {
    'small': 'Motorcycle',
    'medium': 'Car',
    'large': 'Van'
  }

  const lalamoveObject: any = {
    'small': 'Motorcycle',
    'medium': 'Car',
    'large': 'Van'
  }

  const transportifyObject: any = {
    'small': 'Car',
    'medium': 'Car',
    'large': 'Van'
  }

  const happymoveObject: any = {
    'small': 'Motorcycle',
    'medium': 'Car',
    'large': 'Van'
  }

  const toktokObject: any = {
    'small': 'Motorcycle',
    'medium': 'Motorcycle',
    'large': 'Motorcycle'
  }

  const jgoObject: any = {
    'small': 'Motorcycle',
    'medium': 'Motorcycle',
    'large': 'Motorcycle'
  }

  switch (provider) {
  case 'Grab':
    return grabObject[size]
  case 'MrSpeedy':
    return mrspeedyObject[size]
  case 'Lalamove':
    return lalamoveObject[size]
  case 'Transportify':
    return transportifyObject[size]
  case 'Happymove':
    return happymoveObject[size]
  case 'Toktok':
    return toktokObject[size]
  case 'JGO':
    return jgoObject[size]
  default:
    return null
  }
}