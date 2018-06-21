import React, {Component} from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import TopBar from './TopBar';
import GameBoard from './GameBoard';
import PlayerIndicator from './PlayerIndicator';
import ActionButtons from './ActionButtons';
import injectSheet from 'react-jss/lib/injectSheet'
import colors from './../utils/colors';
import MatchDialog from './MatchDialog';

const theme = createMuiTheme({
  colors: colors,
  palette: {
    primary: colors.blueGrey
  }
});

const AppStyles = ({
  topBar: {
    marginBottom: '20px'
  },
  actionBar: {
    margin: '10px'
  },
  playerIndicator: {
    margin: '0 auto'
  },
  actionButtons: {}
});

const PLAYER_1 = 1;
const PLAYER_2 = 2;
const UNKNOWN_PLAYER = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.classes = props.classes;
  }

  initialState() {
    return {
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: PLAYER_1,
      matchCompleted: false,
      matchWinner: UNKNOWN_PLAYER
    }
  }

  // Status handlers
  winnerChecker() {
    const {currentPlayer, board} = this.state;

    // Int representation of the possible winner lines.
    // where 0 is top left corner and 8 bottom right corner
    // The actual relative position for each tile can be calculated with a simple division and it's module
    const winLines = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Math.floor( line[n] / 3) return the row
    // line[n] % 3 returns the col
    for (let lineIndex = 0; lineIndex < winLines.length; lineIndex++) {
      let line = winLines[lineIndex];

      if (board[Math.floor(line[0] / 3)][line[0] % 3] === currentPlayer
        && board[Math.floor(line[1] / 3)][line[1] % 3] === currentPlayer
        && board[Math.floor(line[2] / 3)][line[2] % 3] === currentPlayer
      ) {
        this.setState(state => {
          state.matchCompleted = true;
          state.matchWinner = currentPlayer;
          return state;
        });
        return true;
      }
    }

    // Check if the board is already filled.
    let remainingEmptySpaces = [].concat(...board).filter(function (x) {
      return x === UNKNOWN_PLAYER
    }).length;

    if (remainingEmptySpaces === 0) {
      this.setState(state => {
        state.matchCompleted = true;
        return state;
      });
    }

    // Switch player
    this.switchPlayer();
    return false;
  }

  switchPlayer() {
    if (!this.state.matchCompleted) {
      this.setState(state => {
        if (state.currentPlayer === PLAYER_1) {
          state.currentPlayer = PLAYER_2;
        } else {
          state.currentPlayer = PLAYER_1;
        }
        return state;
      });
    }
  }

  // Events
  onGameBoardTileClick = (row, col) => {
    if (this.state.board[row][col] !== 0 || this.state.matchCompleted) {
      return;
    }
    this.setState(state => {
      state.board[row][col] = state.currentPlayer || 0;
      return state;
    }, () => {
      this.winnerChecker();
    });
  };

  onResetBtnClick = () => {
    this.setState(this.initialState())
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <TopBar className={this.classes.topBar}/>
        <div className={this.classes.actionBar}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={2}>
              <ActionButtons onResetClick={this.onResetBtnClick}/>
            </Grid>
            <Grid item xs={8}>
              <PlayerIndicator player={this.state.currentPlayer} classNames={this.classes.playerIndicator}/>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </div>
        <GameBoard size={3} boardState={this.state.board} onTileClick={this.onGameBoardTileClick}/>
        <MatchDialog btnOnClick={this.onResetBtnClick} matchCompleted={this.state.matchCompleted}
                     matchWinner={this.state.matchWinner}
        />
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(AppStyles)(App);
