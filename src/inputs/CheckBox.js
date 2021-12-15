export default class CheckboxInput {
  constructor(name, defaultValue) {
    this.defaultValue = defaultValue;
    this.settingsContainer = document.querySelector('#form');

    this.label = document.createElement('label');
    this.label.id = name;
    this.label.innerText = name;

    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.checked = defaultValue;
    this.onInput = null;

    this.init();
  }

  init() {
    this.label.appendChild(this.input);
    this.input.addEventListener('input', () => {
      this.onInput(this.input.checked);
    });

    this.settingsContainer.appendChild(this.label);
  }

  reset() {
    this.input.checked = this.defaultValue;
    this.onInput(this.input.checked);
  }
}
