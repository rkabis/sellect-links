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
    const { origin, destination } = this.props

    const midpoint = findMidpoint(origin, destination)

    return (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: midpoint.lat, lng: midpoint.lng }}>
        <>
          <Marker position={{ lat: origin.lat, lng: origin.lng }} />
          <Marker position={{ lat: destination.lat, lng: destination.lng }} />
        </>
      </GoogleMap>
    )
  }
}

const BaseMap: any = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '45vh' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapComponent)

export default BaseMap