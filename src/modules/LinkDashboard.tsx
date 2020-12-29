import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ImageViewer from '../components/ImageViewer'
import Header from '../components/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1)
  }
}))

interface Props {
  data: any;
}

const LinkDetails = (props: Props): ReactElement => {
  const { data } = props
  const [hasCopied, setHasCopied] = React.useState(false)
  const classes = useStyles()

  const handleCopy = async () => {
    if (navigator.share) {
      const url = `/link?id=${data.linkId}`
      navigator.share({
        title: 'Sellect Links',
        text: 'Share your link!',
        url
      })
    } else {
      const url = `${window.location.hostname}/link?id=${data.linkId}`

      navigator.clipboard.writeText(url)
      setHasCopied(true)
    }
  }

  return (
    <div className={classes.root}>
      <Header />
      <ImageViewer url={data.businessPhoto} />
      <Typography>{data.businessName}</Typography>
      <Typography>{data.businessEmail}</Typography>
      <Typography>{data.businessContactNumber}</Typography>
      <Typography>{data.businessLocation}</Typography>
      <Typography>
        {`${data.businessHours.lower} - ${data.businessHours.upper}`}
      </Typography>
      <Typography>{`Views: ${data.views}`}</Typography>
      <Button
        variant='contained'
        onClick={() => handleCopy()}
        className={classes.button}
        disabled={hasCopied}
      >
        { hasCopied ? 'Copied' : 'Share' }
      </Button>
    </div>
  )
}

export default LinkDetails