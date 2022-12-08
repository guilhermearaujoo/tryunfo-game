import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/Filters.module.css';

export default class Filters extends Component {
  render() {
    const { onChange, nameSelect, rareSelect, trunfoSelect } = this.props;
    return (
      <div className={ css.filters }>
        <p>Filtros de busca</p>
        <input
          name="nameSelect"
          type="text"
          data-testid="name-filter"
          placeholder="Nome da Carta"
          onChange={ onChange }
          value={ nameSelect }
          disabled={ trunfoSelect }
          className={ css.input }
        />
        <select
          name="rareSelect"
          onChange={ onChange }
          data-testid="rare-filter"
          value={ rareSelect }
          disabled={ trunfoSelect }
          className={ css.input }
        >
          <option name="todas">todas</option>
          <option name="normal">normal</option>
          <option name="raro">raro</option>
          <option name="muito raro">muito raro</option>
        </select>
        <div className={ css.checkbox }>
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            checked={ trunfoSelect }
            name="trunfoSelect"
            onChange={ onChange }
          />
          <span>Super Trunfo Card</span>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  nameSelect: PropTypes.string,
  onChange: PropTypes.func,
  rareSelect: PropTypes.string,
  trunfoSelect: PropTypes.bool,
}.isRequired;

Filters.propTypes = {
  nameSelect: PropTypes.string,
  onChange: PropTypes.func,
  rareSelect: PropTypes.string,
}.isRequired;
