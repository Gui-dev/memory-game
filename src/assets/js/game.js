const FRONT = 'card_front'
const BACK = 'card_back'

const cards = [
  'bootstrap',
  'css',
  'electron',
  'firebase',
  'html',
  'javascript',
  'jquery',
  'mongo',
  'node',
  'react'
]
let createCardsGame = null


const startGame = () => {
  createCardsGame = createCards(cards)
  shuffleCards(createCardsGame)
  console.log(createCardsGame)
}

const shuffleCards = (cards) => {
  let currentIndex = cards.length
  let randomIndex = 0

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
  }
}

const createCards = (cards) => {
  let allCards = []

  for(let card of cards) {
    allCards.push(createPairFromCard(card))
  }

  return allCards.flatMap(pair => pair)
} 

const createPairFromCard = (card) => {
  return [
    {
      id: createIdWithCard(card),
      icon: card,
      flipped: false
    },
    {
      id: createIdWithCard(card),
      icon: card,
      flipped: false
    }
  ]
}

const createIdWithCard = (card) => {
  return card + parseInt(Math.random() * 1000)
}

startGame()