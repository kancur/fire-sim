export default class SettingsHandlers {
  constructor() {
    this.forestDensity = 0.8;
    this.densityInput = document.body.querySelector("#density");
    this.densityDisplay = document.body.querySelector("#density-display");

    this.attachListeners();
  }

  attachListeners = () => {
    this.densityInput.oninput = () => this.handleDensityInput();
    this.densityInput.value = this.forestDensity;
    this.densityDisplay.textContent = this.forestDensity;
  };

  handleDensityInput = () => {
    this.forestDensity = this.densityInput.value;
    this.densityDisplay.textContent = this.forestDensity;
  };
}
