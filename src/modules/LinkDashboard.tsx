import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
  const classes = useStyles()

  const handleShare = async () => {
    const domain = window.location.hostname
    const url = `${domain}/link?id=${data.linkId}`

    if (navigator.share) {
      navigator.share({
        title: 'Sellect Links',
        text: 'Share you link!',
        url
      })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className={classes.root}>
      <Typography>{data.businessName}</Typography>
      <Typography>{data.businessEmail}</Typography>
      <Typography>{data.businessContactNumber}</Typography>
      <Typography>{data.businessLocation}</Typography>
      <Typography>{`Views: ${data.views}`}</Typography>
      <Button
        variant='contained'
        onClick={() => handleShare()}
        className={classes.button}
      >
        {'Share'}
      </Button>
    </div>
  )
}

export default LinkDetails