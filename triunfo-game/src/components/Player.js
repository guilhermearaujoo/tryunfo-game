import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import css from '../css/Player.module.css';

export default class Player extends Component {
  render() {
    const { cards, handleId, name, nextCard, chosenCard, canPlay } = this.props;
    return (
      <div className={ css.playerCard }>
        <Card
          cardName={ cards[chosenCard].cardName }
          cardDescription={ cards[chosenCard].cardDescription }
          cardAttr1={ cards[chosenCard].cardAttr1 }
          cardAttr2={ cards[chosenCard].cardAttr2 }
          cardAttr3={ cards[chosenCard].cardAttr3 }
          cardImage={ cards[chosenCard].cardImage }
          cardRare={ cards[chosenCard].cardRare }
          cardTrunfo={ cards[chosenCard].cardTrunfo }
        />
        <span className={ css.restCards }>
          {`Cartas restantes: ${cards.length}`}
        </span>
        <div className={ css.btnsCard }>
          <button
            name={ name }
            type="button"
            onClick={ nextCard }
            disabled={ !(cards.length >= 2 && canPlay) }
            className={ css.btnNext }
          >
            NextCard
          </button>
          <button
            type="button"
            onClick={ handleId }
            name={ name }
            disabled={ !canPlay }
            className={ css.btnSelect }
          >
            Selecionar
          </button>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    cardName: PropTypes.string,
    cardDescription: PropTypes.string,
    cardAttr1: PropTypes.string,
    cardAttr2: PropTypes.string,
    cardAttr3: PropTypes.string,
    cardImage: PropTypes.string,
    cardRare: PropTypes.string,
    cardTrunfo: PropTypes.bool,
    id: PropTypes.number,
  })),
  canPlay: PropTypes.bool,
  chosenCard: PropTypes.number,
  nextCard: PropTypes.func,
  handleId: PropTypes.func,
  name: PropTypes.string,
}.isRequired;
