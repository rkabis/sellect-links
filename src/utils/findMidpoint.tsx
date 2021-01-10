type Coordinates = {
	lat: number;
	lng: number;
}

const findMidpoint = (points: Array<Coordinates>) => {
  if (!points) {
    return {
      lat: 12.8797,
      lng: 121.7740
    }
  }

  if (points.length > 1) {
    const midLat = (points[0].lat + points[1].lat) / 2
    const midLng = (points[0].lng + points[1].lng) / 2

    return {
      lat: midLat,
      lng: midLng
    }
  } else {
    return {
      lat: points[0].lat,
      lng: points[0].lng
    }
  }
}

export default findMidpoint