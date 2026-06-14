type SavedName = {
  firstName: string;
  lastName: string;
};

const STORAGE_KEY = 'greetingApp.savedNames';

const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement | null;
const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement | null;
const greetButton = document.getElementById('greetButton') as HTMLButtonElement | null;
const messageDisplay = document.getElementById('messageDisplay') as HTMLParagraphElement | null;
const namesTable = document.getElementById('namesTable') as HTMLTableElement | null;
const namesTableBody = document.getElementById('namesTableBody') as HTMLTableSectionElement | null;
const historyEmptyState = document.getElementById('historyEmptyState') as HTMLParagraphElement | null;

function readSavedNames(): SavedName[] {
  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) return [];

  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isSavedName);
  } catch {
    return [];
  }
}

function isSavedName(value: unknown): value is SavedName {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<SavedName>;
  return typeof candidate.firstName === 'string' && typeof candidate.lastName === 'string';
}

function writeSavedNames(names: SavedName[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
}

function appendSavedName(name: SavedName): SavedName[] {
  const names = [...readSavedNames(), name];
  writeSavedNames(names);
  return names;
}

function displayMessage(message: string, isError = false): void {
  if (!messageDisplay) return;
  messageDisplay.textContent = message;
  messageDisplay.classList.toggle('error', isError);
}

function renderNameHistory(names: SavedName[]): void {
  if (!namesTable || !namesTableBody || !historyEmptyState) return;

  namesTableBody.textContent = '';

  if (names.length === 0) {
    namesTable.hidden = true;
    historyEmptyState.hidden = false;
    return;
  }

  namesTable.hidden = false;
  historyEmptyState.hidden = true;

  for (const name of names) {
    const row = document.createElement('tr');
    const firstNameCell = document.createElement('td');
    const lastNameCell = document.createElement('td');
    const fullNameCell = document.createElement('td');

    firstNameCell.textContent = name.firstName;
    lastNameCell.textContent = name.lastName;
    fullNameCell.textContent = name.firstName + ' ' + name.lastName;

    row.append(firstNameCell, lastNameCell, fullNameCell);
    namesTableBody.append(row);
  }
}

if (
  !firstNameInput ||
  !lastNameInput ||
  !greetButton ||
  !messageDisplay ||
  !namesTable ||
  !namesTableBody ||
  !historyEmptyState
) {
  console.error('One or more required DOM elements were not found.');
} else {
  renderNameHistory(readSavedNames());

  greetButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
      displayMessage('Please enter both your first name and last name.', true);
      return;
    }

    const savedNames = appendSavedName({ firstName, lastName });
    displayMessage('Hello ' + firstName + ' ' + lastName);
    renderNameHistory(savedNames);
  });
}
