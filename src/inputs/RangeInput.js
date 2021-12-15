export default class RangeInput {
  constructor(name, min, max, step, defaultValue) {
    this.defaultValue = defaultValue;
    this.settingsContainer = document.querySelector('#form');

    this.label = document.createElement('label');
    this.label.id = name;
    this.label.innerHTML = `<span class="grow">${name}</span>`;

    this.span = document.createElement('span');
    this.span.className = 'value-display';
    this.span.innerText = defaultValue;

    this.input = document.createElement('input');
    this.input.type = 'range';
    this.input.min = min;
    this.input.max = max;
    this.input.step = step;
    this.input.value = defaultValue;
    this.onInput = null;

    this.init();
  }

  init() {
    this.label.appendChild(this.span);
    this.label.appendChild(this.input);
    this.input.addEventListener('input', () => {
      this.span.innerText = this.input.value;
      this.onInput(this.input.value);
    });
    
    this.settingsContainer.appendChild(this.label);
  }
  
  reset() {
    this.input.value = this.defaultValue;
    this.span.innerText = this.input.value;
    this.onInput(this.input.value)
  }
}
