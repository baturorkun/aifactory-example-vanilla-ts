const { JSDOM } = require('jsdom');

// The HTML content provided in the prompt for testing
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Name Greeter</title>
    <link rel="stylesheet" href="../src/styles.css">
</head>
<body>
    <div class="container">
        <h1>Name Greeter</h1>

        <div class="form-group">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" placeholder="Enter first name">
        </div>

        <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" placeholder="Enter last name">
        </div>

        <button id="greetButton">Greet Me!</button>

        <div id="greetingMessage" class="message-area"></div>
    </div>

    <script type="module" src="../dist/main.js"></script>
</body>
</html>`;

let dom;
let document;

describe('public/index.html structure and content', () => {
    beforeAll(() => {
        // Load the HTML content into a JSDOM environment before running tests
        dom = new JSDOM(htmlContent);
        document = dom.window.document;
    });

    // Acceptance Criterion: The HTML contains two `<input type="text">` elements, each with a corresponding `<label>` for 'First Name' and 'Last Name'.
    test('should contain two text input fields with corresponding labels for First Name and Last Name', () => {
        const firstNameLabel = document.querySelector('label[for="firstName"]');
        const firstNameInput = document.getElementById('firstName');
        const lastNameLabel = document.querySelector('label[for="lastName"]');
        const lastNameInput = document.getElementById('lastName');

        // Happy Path: First Name elements
        expect(firstNameLabel).not.toBeNull();
        expect(firstNameLabel.textContent).toBe('First Name:');
        expect(firstNameInput).not.toBeNull();
        expect(firstNameInput.tagName).toBe('INPUT');
        expect(firstNameInput.type).toBe('text');
        expect(firstNameInput.placeholder).toBe('Enter first name');
        expect(firstNameInput.id).toBe('firstName');
        expect(firstNameLabel.getAttribute('for')).toBe(firstNameInput.id);

        // Happy Path: Last Name elements
        expect(lastNameLabel).not.toBeNull();
        expect(lastNameLabel.textContent).toBe('Last Name:');
        expect(lastNameInput).not.toBeNull();
        expect(lastNameInput.tagName).toBe('INPUT');
        expect(lastNameInput.type).toBe('text');
        expect(lastNameInput.placeholder).toBe('Enter last name');
        expect(lastNameInput.id).toBe('lastName');
        expect(lastNameLabel.getAttribute('for')).toBe(lastNameInput.id);

        // Negative Case: Ensure no other text inputs exist that are not accounted for
        const allTextInputs = document.querySelectorAll('input[type="text"]');
        expect(allTextInputs.length).toBe(2);

        // Negative Case: Ensure labels are correctly associated and not pointing to non-existent elements
        expect(document.querySelector('label[for="nonExistentInput"]')).toBeNull();
    });

    // Acceptance Criterion: A `<button>` element is present to trigger the greeting.
    test('should contain a button element with id "greetButton" to trigger greeting', () => {
        const greetButton = document.getElementById('greetButton');

        // Happy Path: Button element
        expect(greetButton).not.toBeNull();
        expect(greetButton.tagName).toBe('BUTTON');
        expect(greetButton.textContent).toBe('Greet Me!');
        expect(greetButton.id).toBe('greetButton');

        // Negative Case: Ensure no other buttons exist with the same ID or unexpected text
        const allButtons = document.querySelectorAll('button');
        expect(allButtons.length).toBe(1);
        expect(document.getElementById('nonExistentButton')).toBeNull();
    });

    // Acceptance Criterion: A dedicated HTML element (e.g., `<div id="greetingMessage">`) exists to display output.
    test('should contain a dedicated div element with id "greetingMessage" for output', () => {
        const greetingMessageDiv = document.getElementById('greetingMessage');

        // Happy Path: Greeting message div
        expect(greetingMessageDiv).not.toBeNull();
        expect(greetingMessageDiv.tagName).toBe('DIV');
        expect(greetingMessageDiv.classList.contains('message-area')).toBe(true);
        expect(greetingMessageDiv.id).toBe('greetingMessage');

        // Negative Case: Ensure no other element has this ID or wrong tag
        const elementsWithGreetingMessageId = document.querySelectorAll('#greetingMessage');
        expect(elementsWithGreetingMessageId.length).toBe(1);
        expect(document.querySelector('span#greetingMessage')).toBeNull();
    });

    // Acceptance Criterion: The HTML correctly links to `../dist/main.js`.
    test('should correctly link to ../dist/main.js script', () => {
        const scriptLink = document.querySelector('script[src="../dist/main.js"]');

        // Happy Path: Script link
        expect(scriptLink).not.toBeNull();
        expect(scriptLink.tagName).toBe('SCRIPT');
        expect(scriptLink.getAttribute('type')).toBe('module');
        expect(scriptLink.getAttribute('src')).toBe('../dist/main.js');

        // Negative Case: Ensure no other script with the same src but wrong type, or missing.
        const wrongTypeScript = document.querySelector('script[src="../dist/main.js"][type!="module"]');
        expect(wrongTypeScript).toBeNull();
        expect(document.querySelector('script[src="./main.js"]')).toBeNull(); // Incorrect path
    });

    // Acceptance Criterion: The HTML correctly links to `src/styles.css`.
    test('should correctly link to src/styles.css stylesheet', () => {
        const styleLink = document.querySelector('link[rel="stylesheet"][href="../src/styles.css"]');

        // Happy Path: Stylesheet link
        expect(styleLink).not.toBeNull();
        expect(styleLink.tagName).toBe('LINK');
        expect(styleLink.getAttribute('rel')).toBe('stylesheet');
        expect(styleLink.getAttribute('href')).toBe('../src/styles.css');

        // Negative Case: Ensure no other stylesheet link with wrong href or rel.
        const wrongHrefStyle = document.querySelector('link[rel="stylesheet"][href!="../src/styles.css"]');
        expect(wrongHrefStyle).toBeNull();
        expect(document.querySelector('link[rel="alternate stylesheet"]')).toBeNull(); // Wrong rel
    });

    // Additional general checks for good HTML practice
    test('should have a title element with specific text', () => {
        const title = document.querySelector('title');
        expect(title).not.toBeNull();
        expect(title.textContent).toBe('Name Greeter');
    });

    test('should have a meta viewport tag', () => {
        const metaViewport = document.querySelector('meta[name="viewport"]');
        expect(metaViewport).not.toBeNull();
        expect(metaViewport.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });

    test('should have a meta charset tag', () => {
        const metaCharset = document.querySelector('meta[charset="UTF-8"]');
        expect(metaCharset).not.toBeNull();
    });
});
