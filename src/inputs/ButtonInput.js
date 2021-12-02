export default class ButtonInput {
  constructor(name) {
    this.settingsContainer = document.querySelector('#settings');

    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerText = name;
    this.onClick = null;

    this.init();
  }

  init() {
    this.settingsContainer.appendChild(this.button);

    this.button.addEventListener('click', () => {
      this.onClick();
    });
  }
}
