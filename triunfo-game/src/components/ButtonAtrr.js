import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/ButtonAttr.module.css';

export default class ButtonAtrr extends Component {
  render() {
    const { name, canPlay, onClick, message } = this.props;
    return (
      <button
        type="button"
        name={ name }
        disabled={ !canPlay }
        onClick={ onClick }
        className={ css.BtnAtrr }
      >
        {message}
      </button>
    );
  }
}

ButtonAtrr.propTypes = {
  canPlay: PropTypes.bool,
  message: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;
