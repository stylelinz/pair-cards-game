const GAME_STATE = {
  FirstCardAwaits: 'FirstCardAwaits',
  SecondCardAwaits: 'SecondCardAwaits',
  CardsMatchFailed: 'CardsMatchFailed',
  CardsMatched: 'CardsMatched',
  GameFinished: 'GameFinished',
}

const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg', // spade
  'https://image.flaticon.com/icons/svg/105/105220.svg', // heart
  'https://image.flaticon.com/icons/svg/105/105212.svg', // diamonds
  'https://image.flaticon.com/icons/svg/105/105219.svg'  // club
]

const model = {
  revealedCards: [],

  isRevealedCardsMatched() {
    return Number(this.revealedCards[0].dataset.index) % 13 === Number(this.revealedCards[1].dataset.index) % 13
  }
}

const view = {
  getCardElement(index) {
    return `<div data-index="${index}" class="card back"></div>`
  },

  getCardContent(index) {
    const number = this.transformNumber((index % 13) + 1)
    const cardSymbol = Symbols[Math.floor(index / 13)]

    return `
      <p>${number}</p>
      <img src="${cardSymbol}" />
      <p>${number}</p>
    `
  },

  transformNumber(number) {
    switch (number) {
    case 1:
      return 'A'
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
    default:
      return number
    }
  },

  displayCards(indexes) {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join('')
  },

  flipCard(card) {
    if (card.classList.contains('back')) {
      // back to front
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
      return
    }

    //  Front to back
    card.classList.add('back')
    card.innerHTML = null
  },

  pairCard(card) {
    card.classList.add('paired')
  },
}

const controller = {
  currentState: GAME_STATE.FirstCardAwaits,

  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52))
  },

  dispatchCardAction(card) {
    if (!card.classList.contains('back')) return

    switch (this.currentState) {
    case GAME_STATE.FirstCardAwaits:
      view.flipCard(card)
      model.revealedCards.push(card)
      this.currentState = GAME_STATE.SecondCardAwaits
      break
    case GAME_STATE.SecondCardAwaits:
      view.flipCard(card)
      model.revealedCards.push(card)
      // Check cards' number are same.
      if (model.isRevealedCardsMatched()) {
        // mark the paired cards
        this.currentState = GAME_STATE.CardsMatched
        view.pairCard(model.revealedCards[0])
        view.pairCard(model.revealedCards[1])
        this.currentState = GAME_STATE.FirstCardAwaits
        model.revealedCards = []
      } else {
        // flip back the cards, and clear array model.revealCards
        this.currentState = GAME_STATE.CardsMatchFailed
        setTimeout(() => {
          view.flipCard(model.revealedCards[0])
          view.flipCard(model.revealedCards[1])
          model.revealedCards = []
          this.currentState = GAME_STATE.FirstCardAwaits
        }, 1000)
      }
      break
    }
  },
}

const utility = {
  getRandomNumberArray(count) {
    const number = Array.from((Array(count).keys()))
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}
controller.generateCards()

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    controller.dispatchCardAction(card)
  })
})