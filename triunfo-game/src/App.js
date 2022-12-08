import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import css from './css/App.module.css';
import Title from './components/Title';
import Filters from './components/Filters';
import ButtonDelete from './components/ButtonDelete';
import Game from './Game';
import logo from './imgs/logo-selecao.png';

const MAX_POWER = 210;
const MAX_POWER_ATTR = 90;
const CONF_NUMBER = -3;
class App extends React.Component {
  state = {
    id: 1,
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    pontos: '000',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardAttr1erro: false,
    cardAttr2erro: false,
    cardAttr3erro: false,
    cards: [],
    cardsForFilter: [],
    rareSelect: 'todas',
    nameSelect: '',
    trunfoSelect: false,
    enableGame: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === 'cardTrunfo') {
      const { cardTrunfo } = this.state;
      value = !cardTrunfo;
    }
    this.setState({ [name]: value }, this.handleSoma);
    if (name.includes('Attr')) {
      const error = (value < 0 || value > MAX_POWER_ATTR);
      this.setState({ [`${name}erro`]: error });
    }
  };

  handleSoma = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const atributo1 = cardAttr1 ? Number(cardAttr1) : 0;
    const atributo2 = cardAttr2 ? Number(cardAttr2) : 0;
    const atributo3 = cardAttr3 ? Number(cardAttr3) : 0;
    const soma = atributo1 + atributo2 + atributo3;
    const somaString = (`000${soma.toString()}`).substr(CONF_NUMBER);
    this.setState({ pontos: somaString }, this.enableButton);
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, id } = this.state;
    if (cardTrunfo) this.setState({ hasTrunfo: true });
    const card = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      id };
    if (!card.cardAttr1) card.cardAttr1 = 0;
    if (!card.cardAttr2) card.cardAttr2 = 0;
    if (!card.cardAttr3) card.cardAttr3 = 0;
    this.setState((before) => ({
      cardsForFilter: [...before.cards, card],
      cards: [...before.cards, card],
    }), this.clearState);
  };

  checkForGame = () => {
    const { cards } = this.state;
    this.setState({
      enableGame: cards.length > 0 && cards.length % 2 === 0,
    });
  };

  clearState = () => {
    this.setState((before) => ({
      id: before.id + 1,
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      pontos: '000',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), this.checkForGame);
  };

  changeCards = () => {
    const { cardsForFilter, nameSelect, rareSelect, trunfoSelect } = this.state;
    if (trunfoSelect) {
      this.setState({
        cards: cardsForFilter.filter((card) => card.cardTrunfo === true),
      }, this.checkForGame);
    } else if (!trunfoSelect) {
      if (rareSelect === 'todas') {
        this.setState({
          cards: cardsForFilter.filter((card) => card.cardName.includes(nameSelect)),
        }, this.checkForGame);
      } else {
        this.setState({
          cards: cardsForFilter.filter((card) => card.cardRare === rareSelect)
            .filter((card) => card.cardName.includes(nameSelect)),
        }, this.checkForGame);
      }
    }
  };

  enableButton = () => {
    const { cardName, cardDescription, cardImage, cardRare, cardAttr1erro,
      cardAttr2erro, cardAttr3erro, pontos } = this.state;
    const numberPontos = Number(pontos);
    const soma = numberPontos <= MAX_POWER && numberPontos > 0;
    if (cardName.length > 0 && cardDescription.length > 0
        && cardImage.length > 0 && cardRare.length > 0
        && !cardAttr1erro && !cardAttr2erro && !cardAttr3erro && soma) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  handleFilter = ({ target: { name, value } }) => {
    if (name === 'trunfoSelect') {
      this.setState((before) => ({
        trunfoSelect: !before.trunfoSelect,
      }), this.changeCards);
    } else {
      this.setState({ [name]: value }, this.changeCards);
    }
  };

  handleDelete = ({ target: { name } }) => {
    const id = Number(name);
    const { cards } = this.state;
    const newCards = cards.filter((card) => card.id !== id);
    const trunfo = newCards.every((card) => card.cardTrunfo === false);
    this.setState({
      cardsForFilter: newCards,
      cards: newCards,
      hasTrunfo: !trunfo,
    }, this.checkForGame);
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, pontos, cardTrunfo, hasTrunfo, isSaveButtonDisabled, cards,
      nameSelect, rareSelect, trunfoSelect, enableGame } = this.state;
    return (
      <div className={ css.App }>
        <img alt="logo-selecao" src={ logo } className={ css.logo } />
        <div>
          <div className={ css.formAndPreview }>
            <Form
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              pontos={ pontos }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
            />
            <div className={ css.preview }>
              <Title message="pré-visualização" />
              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }

              />
            </div>
          </div>
          <div className={ css.deck }>
            <Title message="todas as cartas" />
            <Filters
              onChange={ this.handleFilter }
              nameSelect={ nameSelect }
              rareSelect={ rareSelect }
              trunfoSelect={ trunfoSelect }
            />
            <div className={ css.deckCards }>
              { cards.map((card) => (
                <div key={ card.id } className={ css.divCard }>
                  <Card
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <ButtonDelete
                    type="button"
                    onClick={ this.handleDelete }
                    name={ card.id }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={ css.gameDiv }>
          <Title message="tryunfo game" />
          { enableGame
            ? <Game cards={ cards } />
            : <p className={ css.error }> Adicione mais uma carta</p>}
        </div>
      </div>
    );
  }
}

export default App;
