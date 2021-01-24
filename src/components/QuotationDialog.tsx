import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'solid white 2px'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))

interface Props {
	open: boolean;
	handleClose: any;
}

const QuotationDialog = (props: Props) => {
  const { open, handleClose } = props
  const classes = useStyles()

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={classes.root}>
        <DialogTitle id="simple-dialog-title">
          {'How-To Use Pick-up Page'}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Hi there! To book, track, and contact your own same-day delivery, please copy-paste both pick-up and delivery details into your sellected courier\'s mobile app.'}
          </DialogContentText>
          <DialogContentText>
            {'This is the free beta version of Sellect Express Pick-up Pages and we\'re continuously working on improving your user experience.'}
          </DialogContentText>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default QuotationDialog