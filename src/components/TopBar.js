import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip
} from '@material-ui/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHashtag} from '@fortawesome/fontawesome-free-solid';
import {faGithub, faReact} from '@fortawesome/fontawesome-free-brands';
import Grid from '@material-ui/core/Grid';
import injectSheet from 'react-jss/lib/injectSheet';

const topBarStyles = ({
  rightSide: {
    textAlign: 'right',
    '& a': {
      color: 'currentColor',
      margin: '0 5px'
    },
    '& [data-icon="react"]': {
      color: 'white'
    }
  }
});

function TopBar(props) {
  const {className, classes} = props;

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="title" color="inherit">
              <FontAwesomeIcon icon={faHashtag}/>
              Tic Tac Toe
            </Typography>
          </Grid>
          <Grid item className={classes.rightSide}>
            <Tooltip id="react-link-tooltip" title="Made with ReactJs">
              <a href="https://reactjs.org/">
                <FontAwesomeIcon icon={faReact} size="3x"/>
              </a>
            </Tooltip>
            <Tooltip id="github-link-tooltip" title="Github">
              <a href="https://github.com/">
                <FontAwesomeIcon icon={faGithub} size="3x"/>
              </a>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string
};
TopBar.defaultProps = {
  className: ''
};

export default injectSheet(topBarStyles)(TopBar);