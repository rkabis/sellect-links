const getVehicleName = (provider: string, size: string) => {
  switch (provider) {
  case 'MrSpeedy':
    if (size == 'small'){
      return 'motorbike'
    } else{
      return 'car'
    }
  case 'Transportify':
    if (size =='large') {
      return 'L300/Van'
    } else {
      return 'Economy'
    }
  default:
    return ''
  }
}


const providerToUrl = (
  provider: string,
  origin: any,
  destination: any,
  size: string
): string => {

  const vehicle = getVehicleName(provider, size)

  switch (provider) {
  case 'MrSpeedy':
    return `https://mrspeedy.ph/order?from_address=${origin.name}&to_address=${destination.name}&vehicle=${vehicle}`
  case 'Lalamove':
    return 'https://www.lalamove.com/philippines/manila/fil/deliver'
  case 'Transportify':
    return `https://www.transportify.com.ph/price-wizard/?calc=true&dname=${origin.name}&shortname=${origin.name}&lat=${origin.lat}&lng=${origin.lng}&dname=${destination.name}&shortname=${destination.name}&lat=${destination.lat}&lng=${destination.lng}&st_name=${vehicle}`
  case 'Grab':
    return 'https://www.grab.com/ph/'
  case 'Happymove':
    return 'https://online.happymove.com.ph/'
  default:
    return null
  }
}

export default providerToUrl