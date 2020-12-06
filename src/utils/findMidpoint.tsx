type Coordinates = {
	lat: number;
	lng: number;
}

const findMidpoint = (x: Coordinates, y: Coordinates) => {
  const midLat = (x.lat + y.lat) / 2
  const midLng = (x.lng + y.lng) / 2

  return {
    lat: midLat,
    lng: midLng
  }
}

export default findMidpoint