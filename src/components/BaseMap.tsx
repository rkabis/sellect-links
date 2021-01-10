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

    return (
      <GoogleMap
        defaultZoom={ points ? 12 : 5 }
        defaultCenter={{ lat: midpoint.lat, lng: midpoint.lng }}
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