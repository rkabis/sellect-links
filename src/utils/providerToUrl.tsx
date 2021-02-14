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
  size: string,
  device: string
): string => {

  if (device == 'android') {
    switch (provider) {
    case 'MrSpeedy':
      return 'https://play.google.com/store/apps/details?id=ph.speedy.express.delivery.client&hl=en&gl=US'
    case 'Lalamove':
      return 'https://play.google.com/store/apps/details?id=hk.easyvan.app.client&hl=en&gl=US'
    case 'Transportify':
      return 'https://play.google.com/store/apps/details?id=com.transportify.user&hl=en&gl=US'
    case 'Grab':
      return 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger&hl=en&gl=US'
    case 'Happymove':
      return 'https://play.google.com/store/apps/details?id=my.happy.move&hl=en&gl=US'
    case 'Toktok':
      return 'https://play.google.com/store/apps/details?id=ph.cloudpanda.toktok&hl=en&gl=US'
    case 'JGO':
      return 'https://play.google.com/store/apps/details?id=ph.com.jgo.delivery'
    default:
      return null
    }
  } else if (device == 'apple') {
    switch (provider) {
    case 'MrSpeedy':
      return 'https://apps.apple.com/ph/app/mrspeedy-best-courier-service/id1442074811'
    case 'Lalamove':
      return 'https://apps.apple.com/ph/app/lalamove-fast-delivery-app/id735701965'
    case 'Transportify':
      return 'https://apps.apple.com/ph/app/transportify-delivers/id1153482546'
    case 'Grab':
      return 'https://apps.apple.com/sg/app/grab-food-grocery-taxi-pay/id647268330'
    case 'Happymove':
      return 'https://apps.apple.com/us/app/happy-move/id1438427540'
    case 'Toktok':
      return 'https://apps.apple.com/ph/app/toktok-ph/id1522988322'
    case 'JGO':
      return 'https://apps.apple.com/ph/app/jgo-rider/id1540719460'
    default:
      return null
    }
  } else {
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
    case 'Toktok':
      return 'https://toktok.ph/home'
    case 'JGO':
      return 'https://www.jgo.com.ph'
    default:
      return null
    }
  }
}

export default providerToUrl