const numberFilter = 0.5;

const shuffleCards = (cards) => cards.sort(() => Math.random() - numberFilter);

export default shuffleCards;
