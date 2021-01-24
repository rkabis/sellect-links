import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import ImageViewer from './ImageViewer'

const readImageFromFile = (file: any)=> {
  return new Promise((resolve, _) => {
    const reader = new window.FileReader()
    reader.onload = (e: any) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

interface Props {
  url?: string;
  setUrl: any;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const ImageUploader = (props: Props): ReactElement => {
  const { url, setUrl } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <label htmlFor={'logo'}>
        <div>
          <input
            type="file"
            id="logo"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={async event => {
              event.preventDefault()
              if (event.target.files && event.target.files[0]) {
                event.persist()
                const newImage = event.target.files[0]
                const newUrl = await readImageFromFile(newImage)

                setUrl(newUrl)
              }
            }}
          />
          <ImageViewer url={url} />
          <div>{'Upload Profile Pic'}</div>
        </div>
      </label>
    </div>
  )
}

export default ImageUploader