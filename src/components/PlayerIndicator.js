import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import injectSheet from 'react-jss/lib/injectSheet';
import ClassNamesMerge from 'classnames';
import magicCss from 'magic.css/magic.css';

const playerIndicatorStyles = theme => ({
  container: {
    width: '100px',
    position: 'relative'
  },
  player1: {
    padding: '20px',
    backgroundColor: theme.colors.yellow.main,
    color: 'white'
  },
  player2: {
    padding: '20px',
    position: 'absolute',
    top: '0',
    backgroundColor: theme.colors.turquoise.main,
    color: 'white'
  },
  onTop: {
    zIndex: 99
  }
});

function PlayerIndicator(props) {
  let {player} = props;
  const {classes, classNames} = props;

  const boingInUp = ClassNamesMerge(magicCss.magictime, magicCss.boingInUp, classes.onTop);

  return (
    <div className={ClassNamesMerge(classes.container, classNames)}>
      <Paper classes={{root: classes.player1}} className={player === 1 ? boingInUp : ''}>
        Player 1
      </Paper>
      <Paper classes={{root: classes.player2}} className={player === 2 ? boingInUp : ''}>
        Player 2
      </Paper>
    </div>
  );
}

PlayerIndicator.propTypes = {
  player: PropTypes.number,
  classNames: PropTypes.string.isRequired
};
PlayerIndicator.defaultProps = {
  player: 1,
  classNames: ''
};

export default injectSheet(playerIndicatorStyles)(PlayerIndicator);