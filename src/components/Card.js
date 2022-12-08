import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from '../css/Card.module.css';
import players from '../helpers/player';

export default class Card extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare, cardTrunfo } = this.props;
    return (
      <div className={ css.Card }>
        <div className={ css.conteudo }>
          <div className={ css.nome }>
            <span
              data-testid="rare-card"
              className={ css.rare }
            >
              {cardRare}
            </span>
            <h3 data-testid="name-card">{cardName}</h3>
          </div>
          <div className={ css.jogador }>
            <img
              data-testid="image-card"
              // src={ cardImage }
              src={ players[cardImage] }
              alt={ cardName }
              className={ cardImage }
            />
          </div>
          <div className={ css.desc }>
            <span data-testid="description-card">{ cardDescription }</span>
          </div>
          <div className={ css.atributos }>
            <div className={ css.attr1 }>
              <p>Ataque...........................</p>
              <span data-testid="attr1-card">{Number(cardAttr1)}</span>
            </div>
            <div className={ css.attr2 }>
              <p>Defesa...........................</p>
              <span data-testid="attr2-card">{Number(cardAttr2)}</span>
            </div>
            <div className={ css.attr3 }>
              <p>Força..............................</p>
              <span data-testid="attr3-card">{Number(cardAttr3)}</span>
            </div>
          </div>
          <div className={ css.trunfo }>
            { cardTrunfo && <span data-testid="trunfo-card"> Super Trunfo </span>}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardDescription: PropTypes.string,
  cardImage: PropTypes.string,
  cardName: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;
