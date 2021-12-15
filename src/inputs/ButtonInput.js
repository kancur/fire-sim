export default class ButtonInput {
  constructor(name) {
    this.buttonRow = document.querySelector('#buttonrow');

    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerText = name;
    this.onClick = null;

    this.init();
  }

  init() {
    this.buttonRow.appendChild(this.button);

    this.button.addEventListener('click', () => {
      this.onClick();
    });
  }
}
