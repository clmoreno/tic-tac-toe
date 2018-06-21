import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function MatchDialog(props) {
  let title = 'Draw !';
  let text = 'mmm... Let\'s play again! ';
  if (props.matchWinner !== 0){
    title = `Player ${props.matchWinner} wins!`;
    text = `Congratulations player ${props.matchWinner} you are the best!`;
  }

  return (
    <div>
      <Dialog open={props.matchCompleted} TransitionComponent={Transition}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.btnOnClick}>
            Rematch
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MatchDialog.propTypes = {
  btnOnClick: PropTypes.func.isRequired,
  matchCompleted: PropTypes.bool.isRequired,
  matchWinner: PropTypes.number.isRequired
};
MatchDialog.defaultProps = {
  matchCompleted: false,
  matchWinner: 0
};

export default MatchDialog;