import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

const useStyles = makeStyles(() => ({
  photo: {
    height: 150,
    width: 150
  },
  genericPhoto: {
    height: 100,
    width: 100
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
        (url && url !== '')
          ? <img src={url} className={classes.photo} />
          : <AddAPhotoIcon className={classes.genericPhoto} />
      }
    </React.Fragment>
  )
}

export default ImageViewer
