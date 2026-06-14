class FormUI {
  private nameErrorElement: HTMLElement | null;
  private surnameErrorElement: HTMLElement | null;
  private successMessageElement: HTMLElement | null;

  constructor() {
    this.nameErrorElement = document.getElementById('nameError');
    this.surnameErrorElement = document.getElementById('surnameError');
    this.successMessageElement = document.getElementById('successMessage');
  }

  showErrors(errors: ValidationErrors): void {
    if (this.nameErrorElement) {
      this.nameErrorElement.textContent = errors.name || '';
    }
    if (this.surnameErrorElement) {
      this.surnameErrorElement.textContent = errors.surname || '';
    }
    if (this.successMessageElement) {
      this.successMessageElement.textContent = '';
    }
  }

  showSuccess(name: string, surname: string): void {
    if (this.successMessageElement) {
      this.successMessageElement.textContent = `Hello ${name} ${surname}`;
    }
  }
}