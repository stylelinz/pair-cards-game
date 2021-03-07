const view = {
  displayCards() {
    document.querySelector('#cards').innerHTML = `
    <div class="card">
      <p>3</p>
      <img src="https://image.flaticon.com/icons/svg/105/105219.svg" alt="spare">
      <p>3</p>
    </div>
    `
  }
}
view.displayCards()