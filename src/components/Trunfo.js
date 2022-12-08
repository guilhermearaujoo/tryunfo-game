import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/Form.module.css';

export default class Trunfo extends Component {
  render() {
    const { cardTrunfo, onInputChange } = this.props;
    return (
      <label
        htmlFor="trunfo"
        className={ css.trunfo }
      >
        <input
          type="checkbox"
          name="cardTrunfo"
          id="trunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
          data-testid="trunfo-input"
        />
        Super Card Trunfo
      </label>
    );
  }
}

Trunfo.propTypes = {
  cardTrunfo: PropTypes.string,
  onInputChange: PropTypes.func,
}.isRequired;
