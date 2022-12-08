import PropTypes from 'prop-types';
import React, { Component } from 'react';
import correct from '../imgs/Complete.png';
import wrong from '../imgs/error.png';
import css from '../css/Error.module.css';

const MAX_SIZE = 90;
const MAX_SUM = 210;
export default class Error extends Component {
  render() {
    const { attr, name } = this.props;
    if (name === 'attr') {
      return (
        <img
          src={ Number(attr) <= MAX_SIZE && attr ? correct : wrong }
          alt="Status"
          className={ css.Error }
        />
      );
    } if (name === 'points') {
      return (
        <img
          src={ Number(attr) <= MAX_SUM ? correct : wrong }
          alt="Status"
          className={ css.Error }
        />
      );
    }
    return (<img
      src={ attr !== ''
        ? correct : wrong }
      alt="Status"
      className={ css.Error }
    />);
  }
}

Error.propTypes = {
  attr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  name: PropTypes.string.isRequired,
};

Error.defaultProps = {
  attr: false,
};
