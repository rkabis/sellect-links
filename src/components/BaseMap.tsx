import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

import findMidpoint from '../utils/findMidpoint'

const GOOGLE_API = process.env.GOOGLE_API

class MapComponent extends React.Component<any, {}> {
  render() {
    const { points } = this.props

    const midpoint = findMidpoint(points)

    const zoom = () => {
      if (points) {
        if (points.length == 1) {
          return 17
        } else {
          const x = points[0]
          const y = points[1]
          const z = ((x.lat-y.lat)**2 + (x.lng - y.lng)**2)**(0.5)

          return 10-Math.ceil(z)
        }
      } else {
        return 5
      }
    }

    return (
      <GoogleMap
        defaultZoom={zoom()}
        defaultCenter={{ lat: midpoint.lat, lng: midpoint.lng }}
        zoom={zoom()}
        center={{ lat: midpoint.lat, lng: midpoint.lng }}
      >
        <>
          {
            points && points.map((point: any, index: number) => {
              return (
                <Marker key={index} position={{ lat: point.lat, lng: point.lng }} />
              )
            })
          }

        </>
      </GoogleMap>
    )
  }
}

const BaseMap: any = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: 350, width: 350 }} />,
    containerElement: <div style={{ height: 350, width: 350 }} />,
    mapElement: <div style={{ height: 350, width: 350 }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapComponent)

export default BaseMap