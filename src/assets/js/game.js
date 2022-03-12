const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

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
let lockMode = false
let firstCard = null
let secondCard = null


const startGame = () => {
  createCardsGame = createCards(cards)
  shuffleCards(createCardsGame)
  initializeCards(createCardsGame)
}

const checkMath = () => {
  if (!firstCard || !secondCard) {
    return false
  }
  return firstCard.icon === secondCard.icon
}

const clearCards = () => {
  firstCard = null
  secondCard = null
  lockMode = false
}

const unflipCards = () => {
  firstCard.flipped = false
  secondCard.flipped = false
  clearCards()
}

const checkGameOver = (cards) => {
  return cards.filter(card => !card.flipped).length === 0
}

const setCard = (cards, cardId) => {
  const card = cards.filter(card => card.id === cardId)[0]

  if (card.flipped || lockMode) {
    return false
  }

  if (!firstCard) {
    firstCard = card
    firstCard.flipped = true
    return true
  } else {
    secondCard = card
    secondCard.flipped = true
    lockMode = true
    return true
  }
}

const initializeCards = (cards) => {
  const gameBoard = document.querySelector('#game-board')
  gameBoard.innerHTML = ''
  cards.forEach(card => {
    const cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon

    createCardContent(card, cardElement)

    cardElement.addEventListener('click', () => flipCard(cards, cardElement))
    gameBoard.appendChild(cardElement)
  })
}

const createCardContent = (card, cardElement) => {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

const createCardFace = (face, card, cardElement) => {
  const cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)

  if (face === FRONT) {
    const iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = `./src/assets/images/${card.icon}.png`
    cardElementFace.appendChild(iconElement)
  } else {
    cardElementFace.innerHTML = '?'
  }

  cardElement.appendChild(cardElementFace)
}

const flipCard = (cards, cardElement) => {
  if (setCard(cards, cardElement.id)) {
    cardElement.classList.add('flip')

    if (secondCard) {
      if (checkMath()) {
        clearCards()
        if (checkGameOver(cards)) {
          const gameOverLayer = document.querySelector('.game-over')
          gameOverLayer.style.display = 'flex'
        }
      } else {
        setTimeout(() => {
          const firstCardView = document.querySelector(`#${firstCard.id}`)
          const secondCardView = document.querySelector(`#${secondCard.id}`)
          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          unflipCards()
        }, 1000)
      }
    }
  }
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


  cards.forEach(card => {
    allCards.push(createPairFromCard(card))
  })

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

function restart () {
  console.log('clicou')
  clearCards()
  startGame()
  const gameOverLayer = document.querySelector('.game-over')
  gameOverLayer.style.display = 'none'
}

startGame()