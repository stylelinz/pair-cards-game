const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg', // spade
  'https://image.flaticon.com/icons/svg/105/105220.svg', // heart
  'https://image.flaticon.com/icons/svg/105/105212.svg', // diamonds
  'https://image.flaticon.com/icons/svg/105/105219.svg'  // club
]

const view = {
  getCardElement(index) {
    const number = this.transformNumber((index % 13) + 1)
    const cardSymbol = Symbols[Math.floor(index / 13)]
    return `
    <div class="card">
      <p>${number}</p>
      <img src="${cardSymbol}" />
      <p>${number}</p>
    </div>
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
    rootElement.innerHTML = this.getCardElement(10)
  }
}
view.displayCards()