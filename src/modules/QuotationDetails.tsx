import React, { ReactElement } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
  },
  origin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  originButton: {
    marginLeft: theme.spacing(2)
  }
}))

interface Props {
  data: any;
}

const QuotationDetails = (props: Props): ReactElement => {
  const { data } = props
  const [hasCopied, setHasCopied] = React.useState(false)
  const [hasCopiedOrigin, setHasCopiedOrigin] = React.useState(false)
  const classes = useStyles()

  const handleCopy = async () => {
    if (navigator.share) {
      const url = `/quotation?id=${data.quotationId}`
      navigator.share({
        title: 'Sellect Links',
        text: 'Share your link!',
        url
      })
    } else {
      const url = `${window.location.hostname}/quotation?id=${data.quotationId}`

      navigator.clipboard.writeText(url)
      setHasCopied(true)
    }
  }

  const handleCopyOrigin = async () => {
    const origin = data.origin.location

    navigator.clipboard.writeText(origin)
    setHasCopiedOrigin(true)
  }

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.origin}>
        <Typography>{data.origin.location}</Typography>
        <Button
          variant='contained'
          onClick={() => handleCopyOrigin()}
          disabled={hasCopiedOrigin}
          className={classes.originButton}
        >
          { hasCopiedOrigin ? 'Copied' : 'Copy' }
        </Button>
      </div>
      <Typography>{data.destination.location}</Typography>
      <Typography>{data.distance}</Typography>
      <Typography>{data.duration}</Typography>
      {
        data.fees.map((fee: any) => {
          return (
            <Typography key={fee.provider}>
              {`${fee.provider}: ${fee.fee}`}
            </Typography>
          )
        })
      }
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

export default QuotationDetails