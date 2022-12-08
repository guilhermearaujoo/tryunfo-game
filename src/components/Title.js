import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/Title.module.css';

export default class Title extends Component {
  render() {
    const { message } = this.props;
    return (<h2 className={ css.title }>{message}</h2>);
  }
}

Title.propTypes = {
  message: PropTypes.string.isRequired,
};
