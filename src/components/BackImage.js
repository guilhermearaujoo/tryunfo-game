import React, { Component } from 'react';
import logo from '../imgs/logo-selecao.png';
import css from '../css/BackImage.module.css';

export default class BackImage extends Component {
  render() {
    return (
      <div className={ css.backDiv }>
        <div className={ css.BackImage }>
          <div>
            <img alt="logo" src={ logo } />
          </div>
        </div>
      </div>
    );
  }
}
