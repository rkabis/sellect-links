import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  photo: {
    height: 150,
    width: 150
  }
}))

interface Props {
	url?: string;
}

const ImageViewer = (props: Props): ReactElement => {
  const { url } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      {
        url
          ? <img src={url} className={classes.photo} />
          : <img src={'./businessPhotoPlaceholder.png'} className={classes.photo} />
      }
    </React.Fragment>
  )
}

export default ImageViewer
