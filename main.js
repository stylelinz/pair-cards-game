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

  displayCards() {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = utility.getRandomNumberArray(52).map(index => this.getCardElement(index)).join('')
  },

  flipCard(card) {
    if (card.classList.contains('back')) {
      // back to front
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index)) // 12 for temp
      return
    }

    //  Front to back
    card.classList.add('back')
    card.innerHTML = null
  }
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
view.displayCards()

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    view.flipCard(card)
  })
})