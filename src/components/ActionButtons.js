import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss/lib/injectSheet';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClassNamesMerge from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';

const actionBarStyles = theme => ({
  resetBtn: {
    backgroundColor: theme.colors.blue.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.colors.blue.light
    }
  }
});

function ActionButtons(props) {
  const {classes, classNames, onResetClick} = props;
  return (
    <div>
      <div className={ClassNamesMerge(classNames)}>
        <Tooltip id="reset-btn-tooltip" title="Reset">
          <Button variant="fab" classes={{root: classes.resetBtn}} onClick={onResetClick}>
            <FontAwesomeIcon icon={faSyncAlt}/>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

ActionButtons.propTypes = {
  classNames: PropTypes.string.isRequired,
  onResetClick: PropTypes.func.isRequired
};
ActionButtons.defaultProps = {
  classNames: ''
};

export default injectSheet(actionBarStyles)(ActionButtons);