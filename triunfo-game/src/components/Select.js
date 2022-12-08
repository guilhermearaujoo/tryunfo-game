import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Error from './Error';
import css from '../css/Form.module.css';

export default class Select extends Component {
  render() {
    const { onInputChange, cardRare } = this.props;
    return (
      <label
        htmlFor="cardRare"
        className={ css.select }
      >
        Raridade
        <select
          name="cardRare"
          id="cardRare"
          value={ cardRare }
          onChange={ onInputChange }
          data-testid="rare-input"
          placeholder="Selecione"
        >
          <option name="normal">normal</option>
          <option name="raro">raro</option>
          <option name="muito raro">muito raro</option>
        </select>
        { !cardRare && <Error /> }
      </label>
    );
  }
}

Select.propTypes = {
  onInputChange: PropTypes.func,
  select: PropTypes.string,
}.isRequired;
