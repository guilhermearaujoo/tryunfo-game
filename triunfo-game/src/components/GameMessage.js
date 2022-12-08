import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/GameMessage.module.css';

export default class GameMessage extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className={ css.message }>
        <p>{message}</p>
      </div>
    );
  }
}

GameMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
