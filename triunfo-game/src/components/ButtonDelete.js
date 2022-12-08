import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/ButtonDelete.module.css';

export default class ButtonDelete extends Component {
  render() {
    const { onClick, name } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-button"
        onClick={ onClick }
        name={ name }
        className={ css.delete }
      >
        Excluir
      </button>
    );
  }
}

ButtonDelete.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;
