import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function GameOver(props) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" 
    //   onClick={handleClickOpen}
      >
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={props.isGameOver}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Wars Over, Good Job Team!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Player Score: {props.cardsRemaining.player}
            <br></br>
            Computer Score: {props.cardsRemaining.opponent}
            <br></br>
            Winner : {props.cardsRemaining.player > props.cardsRemaining.opponent ? "Player" : "Computer"}
            <br></br>
            Click the War Button again to start over. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus 
          onClick={props.reset} 
          color="primary">
            Play Again?
          </Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}