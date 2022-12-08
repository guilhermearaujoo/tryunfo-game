import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Title from './Title';
import Select from './Select';
import Error from './Error';
import Trunfo from './Trunfo';
import css from '../css/Form.module.css';

export default class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      pontos, cardTrunfo, hasTrunfo,
      isSaveButtonDisabled } = this.props;
    const { onInputChange, onSaveButtonClick } = this.props;
    return (
      <div className={ css.Form }>
        <Title message="adicione nova carta" />
        <form className={ css.MyForm }>
          <label
            htmlFor="cardName"
            className={ css.name }
          >
            Nome
            <input
              type="text"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
              data-testid="name-input"
              id="cardName"
            />
            <Error attr={ cardName } name="name" />
          </label>
          <label
            htmlFor="cardDescription"
            className={ css.description }
          >
            Descrição
            <textarea
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
              data-testid="description-input"
              id="cardDescription"
              maxLength={ 70 }
            />
            <Error
              attr={ cardDescription }
              name="description"
            />
          </label>
          <label
            htmlFor="cardAttr1"
            className={ css.attr1 }
          >
            Ataque:
            <input
              type="number"
              max={ 90 }
              min={ 0 }
              name="cardAttr1"
              id="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              data-testid="attr1-input"
            />
            <Error attr={ cardAttr1 } name="attr" />
          </label>
          <label
            htmlFor="cardAttr2"
            className={ css.attr2 }
          >
            Defesa:
            <input
              type="number"
              max={ 90 }
              min={ 0 }
              name="cardAttr2"
              id="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              data-testid="attr2-input"
            />
            <Error attr={ cardAttr2 } name="attr" />
          </label>
          <label
            htmlFor="cardAttr3"
            className={ css.attr3 }
          >
            Força:
            <input
              type="number"
              max={ 90 }
              min={ 0 }
              name="cardAttr3"
              id="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              data-testid="attr3-input"
            />
            <Error attr={ cardAttr3 } name="attr" />
          </label>
          <label
            htmlFor="cardImage"
            className={ css.img }
          >
            Imagem
            <input
              type="text"
              name="cardImage"
              id="imacardImagege"
              value={ cardImage }
              onChange={ onInputChange }
              data-testid="image-input"
            />
            <Error attr={ cardImage } name="image" />
          </label>
          <div className={ css.divPoints }>
            <span className={ css.points }>{`Total de pontos = ${pontos}`}</span>
            <Error attr={ pontos } name="points" />
          </div>
          <Select onInputChange={ onInputChange } cardRare={ cardRare } />
          <div className={ css.last }>
            { !hasTrunfo ? <Trunfo
              cardTrunfo={ cardTrunfo }
              onInputChange={ onInputChange }
            /> : <span>Você já tem um Super Trunfo em seu baralho</span>}
            <button
              type="submit"
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string,
  cardAttr1erro: PropTypes.bool,
  cardAttr2: PropTypes.string,
  cardAttr2erro: PropTypes.bool,
  cardAttr3: PropTypes.string,
  cardAttr3erro: PropTypes.bool,
  cardDescription: PropTypes.string,
  cardImage: PropTypes.string,
  cardName: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  pontos: PropTypes.string,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;
