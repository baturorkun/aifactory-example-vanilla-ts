import { readFileSync } from 'fs';

describe('HTML structure tests', () => {
  const htmlContent = readFileSync('public/index.html', 'utf-8');

  test('should have two labeled input fields for first and last name', () => {
    expect(htmlContent).toContain('<label for="firstName">First Name:</label>');
    expect(htmlContent).toContain('<input type="text" id="firstName" required>');
    expect(htmlContent).toContain('<label for="lastName">Last Name:</label>');
    expect(htmlContent).toContain('<input type="text" id="lastName" required>');
  });

  test('should have a button element with click handler', () => {
    expect(htmlContent).toContain('<button type="button" id="greetButton">Greet</button>');
  });

  test('should have a div for displaying greeting or error messages', () => {
    expect(htmlContent).toContain('<div id="greetingDisplay"></div>');
  });

  test('script tag should reference dist/main.js', () => {
    expect(htmlContent).toContain('<script src="dist/main.js"></script>');
  });

  test('stylesheet link should reference src/styles.css', () => {
    expect(htmlContent).toContain('<link rel="stylesheet" href="src/styles.css">');
  });
});