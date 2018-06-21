import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Paper} from '@material-ui/core';
import FlipCard from './FlipCard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faQuestion, faTimes} from '@fortawesome/fontawesome-free-solid';
import {faCircle} from '@fortawesome/fontawesome-free-regular';
import injectSheet from 'react-jss/lib/injectSheet';

const gameBoardStyles = theme => ({
  paper: {
    color: theme.colors.white.main,
    backgroundColor: theme.colors.blue.main,
    '&.player1': {
      backgroundColor: theme.colors.yellow.main
    },
    '&.player2': {
      backgroundColor: theme.colors.turquoise.main
    }
  },
  tile: {
    position: 'relative',
    cursor: 'pointer',
    '&:after': {
      content: '""',
      display: 'block',
      paddingBottom: '100%'
    },
    '& > div': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      color: 'white'
    },
    '& *': {
      width: '100%',
      height: '100%',
    },
    '& svg': {
      width: 'auto !important',
      height: '90% !important',
      marginTop: '5%'
    }
  }
});

function GameBoard(props) {
  let {boardState, onTileClick, classes} = props;

  let tiles = boardState.map(function (row, rowIndex) {
    let rowElements = row.map(function (player, colIndex) {
      let icon = faQuestion;
      if (player === 1) {
        icon = faCircle;
      }
      if (player === 2) {
        icon = faTimes;
      }

      return <Grid item xs={4} key={`col${rowIndex}.${colIndex}`}>
        <div className={classes.tile} onClick={function (evt) {
          onTileClick(rowIndex, colIndex);
        }}>
          <FlipCard flipped={player !== 0}>
            <Paper classes={{root: classes.paper}}>
              <FontAwesomeIcon icon={faQuestion}/>
            </Paper>
            <Paper classes={{root: classes.paper}} className={`player${player}`}>
              <FontAwesomeIcon icon={icon}/>
            </Paper>
          </FlipCard>
        </div>
      </Grid>
    });

    return <Grid container key={`row${rowIndex}`} spacing={8}>
      {rowElements}
    </Grid>
  });

  return (
    <div style={{overflow: 'hidden'}}>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={6} lg={4}>
          {tiles}
        </Grid>
      </Grid>
    </div>
  );
}

GameBoard.propTypes = {
  boardState: PropTypes.array.isRequired,
  onTileClick: PropTypes.func.isRequired
};
GameBoard.defaultProps = {
  boardState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  onTileClick: function () {
  }
};

export default injectSheet(gameBoardStyles)(GameBoard);