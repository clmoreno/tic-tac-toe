import React from 'react';
import PropTypes from 'prop-types';
import classNamesMerge from 'classnames';
import injectSheet from 'react-jss/lib/injectSheet';

const flipCardStyles = ({
  flipCard: {
    position: 'relative',
    transition: '0.6s',
    transformStyle: 'preserve-3d'
  },
  cardSide: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  frontSide: {
    composes: '$cardSide',
    zIndex: 2,
    transform: 'rotateY(0deg)'
  },
  backSide: {
    composes: '$cardSide',
    transform: 'rotateY(180deg)'
  },
  cardFlipped: {
    transform: 'rotateY(180deg)'
  }
});

function FlipCard(props) {
  const {className, flipped, classes} = props;
  const frontSide = props.children[0];
  const backSide = props.children[1];

  return (
    <div className={classNamesMerge(className, classes.flipCard, {[`${classes.cardFlipped}`]: flipped})}>
      <div className={classes.frontSide}>
        {frontSide}
      </div>
      <div className={classes.backSide}>
        {backSide}
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  flipped: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: function (props, propName, componentName) {
    let children = props[propName];
    let error = null;

    if (!Array.isArray(children)) {
      children = [children];
    }

    if (React.Children.count(children) !== 2) {
      error = `\`${componentName}\` should have two children elements.`;
    }

    if (error) {
      return new Error(error);
    }
  }
};
FlipCard.defaultProps = {
  flipped: false,
  className: ''
};


export default injectSheet(flipCardStyles)(FlipCard);