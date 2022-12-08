import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GameMessage from './components/GameMessage';
import Player from './components/Player';
import ButtonAtrr from './components/ButtonAtrr';
import shuffleCards from './helpers/shuffleCards';
import BackImage from './components/BackImage';
import css from './css/Game.module.css';

const buttonNames = ['Ataque', 'Defesa', 'Força '];
export default class Game extends Component {
  state = {
    turn: 0,
    canPlay1: false,
    canPlay2: false,
    attr: '',
    gameInit: false,
    message: 'Aperte o botão START para jogar',
    round: 1,
    cards1: [],
    cards2: [],
    buttonDisable: false,
    cardId1: 0,
    cardId2: 0,
    cardSelect1: {},
    cardSelect2: {},
    showAtrr: false,
    showCard1: false,
    showCard2: false,
    points1: 0,
    points2: 0,
  };

  selectAttr = ({ target }) => {
    const { name } = target;
    this.setState({ attr: name, showAtrr: false }, this.startRound);
  };

  startRound = () => {
    const { turn, cards1, cardId1 } = this.state;
    if (turn === 1) {
      this.setState({
        turn: 2,
        canPlay2: true,
        showCard1: false,
        showCard2: true,
        cards1: cards1.length > 1 ? cards1
          .filter((card, index) => index !== cardId1) : cards1,
        cardId1: cards1.length - 1 > 1 ? cardId1 - 1 : 0,
        message: 'Jogador 2: Selecione uma carta',
      });
    } else if (turn === 2) {
      this.setState({
        turn: 0,
        canPlay2: false,
        gameInit: false,
        showCard2: false,
        buttonDisable: false,
      }, this.checkForWin);
    }
  };

  checkForWin = () => {
    const { cardSelect1, cardSelect2, attr } = this.state;
    const power1 = Number(cardSelect1[`cardAttr${attr}`]);
    const power2 = Number(cardSelect2[`cardAttr${attr}`]);
    let winner = power1 >= power2 ? 1 : 2;
    if (cardSelect1.cardTrunfo || cardSelect2.cardTrunfo) {
      winner = cardSelect1.cardTrunfo ? 1 : 2;
    }
    this.setState((before) => ({
      message: `Jogador ${winner} ganhou!`,
      cardSelect1: {},
      cardSelect2: {},
      [`points${winner}`]: before[`points${winner}`] + 1,
    }));
  };

  handleId = ({ target }) => {
    const { name } = target;
    const { cardId1, cardId2, cards1, cards2 } = this.state;
    if (name.includes('1')) {
      this.setState({
        cardSelect1: cards1[cardId1],
        showAtrr: true,
        canPlay1: false,
        message: 'Jogador 1 Selecione um atributo',
      });
    } else {
      this.setState({
        cardSelect2: cards2[cardId2],
        cards2: cards2.length > 1 ? cards2
          .filter((card, index) => index !== cardId2) : cards2,
        cardId2: cards2.length - 1 > 1 ? cardId2 - 1 : 0,
      }, this.startRound);
    }
  };

  checkForGame = () => {
    const { round, points1, points2 } = this.state;
    const { cards } = this.props;
    if (round > cards.length / 2) {
      const winner = points1 >= points2 ? 1 : 2;
      global.alert(`Jogador ${winner} venceu o jogo`);
      this.reset();
      return false;
    }
    return true;
  };

  startGame = () => {
    const { cards1, cards2, round } = this.state;
    const { cards } = this.props;
    let newCards;
    let player1;
    let player2;
    let mCards;
    if (round > 1) {
      mCards = cards1.length / 2;
      player1 = cards1;
      player2 = cards2;
    } else {
      newCards = shuffleCards(cards);
      mCards = newCards.length / 2;
      player1 = newCards.filter((card, index) => (index < mCards));
      player2 = newCards.filter((card, index) => (index >= mCards));
    }
    if (this.checkForGame()) {
      this.setState((before) => ({
        round: before.round + 1,
        buttonDisable: true,
        gameInit: true,
        cards1: player1,
        cards2: player2,
        canPlay1: true,
        showCard1: true,
        turn: 1,
        message: 'Jogador 1: Selecione uma carta',
      }));
    }
  };

  nextCard = ({ target }) => {
    const { name } = target;
    const { cards1, cards2 } = this.state;
    let mCards;
    if (name.includes('1')) mCards = cards1.length / 2;
    else mCards = cards2.length / 2;
    this.setState((before) => ({
      [name]: (before[name] + 1 > mCards) ? 0 : before[name] + 1,
    }));
  };

  reset = () => {
    this.setState({
      round: 1,
      cards1: [],
      cards2: [],
      cardSelect1: {},
      cardSelect2: {},
      cardId1: 0,
      cardId2: 0,
      points1: 0,
      points2: 0,
    });
  };

  render() {
    const { canPlay1, canPlay2, message, gameInit,
      cards1, cards2, buttonDisable, cardId1,
      cardId2, showAtrr, showCard1, showCard2, points1,
      points2 } = this.state;
    return (
      <div className={ css.Game }>
        <GameMessage message={ message } />
        <div className={ css.score }>
          <p>{`Jogador 1: ${points1}`}</p>
          <p>{`Jogador 2: ${points2}`}</p>
        </div>
        <div className={ css.divAttr }>
          {gameInit && buttonNames.map((btnName, index) => (<ButtonAtrr
            key={ btnName }
            message={ btnName }
            onClick={ this.selectAttr }
            name={ index + 1 }
            canPlay={ showAtrr }
          />))}
        </div>
        <div className={ css.cardsDiv }>
          {showCard1 ? <Player
            cards={ cards1 }
            canPlay={ canPlay1 }
            name="cardId1"
            selectAttr={ this.selectAttr }
            handleId={ this.handleId }
            nextCard={ this.nextCard }
            chosenCard={ cardId1 }
          /> : <BackImage />}
          {showCard2 ? <Player
            cards={ cards2 }
            canPlay={ canPlay2 }
            name="cardId2"
            selectAttr={ this.selectAttr }
            handleId={ this.handleId }
            nextCard={ this.nextCard }
            chosenCard={ cardId2 }
          /> : <BackImage />}
        </div>
        <button
          type="button"
          onClick={ this.startGame }
          disabled={ buttonDisable }
          className={ css.btnGame }
        >
          StartGame
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    cardName: PropTypes.string,
    cardDescription: PropTypes.string,
    cardAttr1: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cardAttr2: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cardAttr3: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cardImage: PropTypes.string,
    cardRare: PropTypes.string,
    cardTrunfo: PropTypes.bool,
    id: PropTypes.number,
  })),
};

Game.defaultProps = {
  cards: [],
};
