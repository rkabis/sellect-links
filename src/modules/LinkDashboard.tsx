import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import ImageViewer from '../components/ImageViewer'
import Header from '../components/Header'
import Footer from '../components/Footer'

import QRCode from 'qrcode.react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  button: {
    marginTop: theme.spacing(1)
  },
  divider: {
    height: 1,
    width: 400,
    backgroundColor: 'gray',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  qr: {
    padding: theme.spacing(5),
    backgroundColor: '#f5f5f5'
  }
}))

interface Props {
  data: any;
  hostname: string;
}

const LinkDetails = (props: Props): ReactElement => {
  const { data, hostname } = props
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
      const url = `${hostname}/link?id=${data.linkId}`

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
      <Divider className={classes.divider} />
      <Typography>{`Views: ${data.views}`}</Typography>
      <Typography>{`Quotations: ${data.quotations}`}</Typography>
      <Divider className={classes.divider} />
      <div className={classes.qr}>
        <QRCode
          value={`${hostname}/link?id=${data.linkId}`}
          size={250}
        />
      </div>
      <Button
        variant='contained'
        onClick={() => handleCopy()}
        className={classes.button}
        disabled={hasCopied}
      >
        { hasCopied ? 'Copied' : 'Share' }
      </Button>
      <Footer />
    </div>
  )
}

export default LinkDetails