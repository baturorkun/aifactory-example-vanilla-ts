import fs from 'fs';
import path from 'path';

const stylesPath = path.resolve(__dirname, 'styles.css');

describe('src/styles.css', () => {
  let cssContent: string;

  beforeAll(() => {
    // Ensure the file exists before trying to read it
    if (!fs.existsSync(stylesPath)) {
      throw new Error(`CSS file not found at ${stylesPath}`);
    }
    cssContent = fs.readFileSync(stylesPath, 'utf8');
  });

  // Acceptance Criterion: A file named `src/styles.css` is created.
  test('should exist', () => {
    expect(fs.existsSync(stylesPath)).toBe(true);
  });

  // Acceptance Criterion: The CSS includes basic styling for form elements (inputs, labels, button).
  describe('Form element styling', () => {
    test('should include basic styling for labels', () => {
      expect(cssContent).toMatch(/\.form-group label\s*\{[^}]*display:\s*block;/);
      expect(cssContent).toMatch(/\.form-group label\s*\{[^}]*margin-bottom:\s*8px;/);
      expect(cssContent).toMatch(/\.form-group label\s*\{[^}]*font-weight:\s*600;/);
      expect(cssContent).toMatch(/\.form-group label\s*\{[^}]*color:\s*#555;/);
    });

    test('should include basic styling for text, email, and password inputs', () => {
      // Check for selector presence
      expect(cssContent).toMatch(/\.form-group input\[type="text"\]/);
      expect(cssContent).toMatch(/\.form-group input\[type="email"\]/);
      expect(cssContent).toMatch(/\.form-group input\[type="password"\]/);
      // Check for common properties applied to these inputs
      expect(cssContent).toMatch(/input\[type="text"\][^}]*width:\s*100%;/);
      expect(cssContent).toMatch(/input\[type="email"\][^}]*padding:\s*12px;/);
      expect(cssContent).toMatch(/input\[type="password"\][^}]*border:\s*1px solid #ddd;/);
      expect(cssContent).toMatch(/input\[type="text"\][^}]*border-radius:\s*5px;/);
      expect(cssContent).toMatch(/input\[type="email"\][^}]*box-sizing:\s*border-box;/);
    });

    test('should include focus styles for inputs', () => {
      expect(cssContent).toMatch(/input\[type="text"\]:focus[^}]*border-color:\s*#007bff;/);
      expect(cssContent).toMatch(/input\[type="email"\]:focus[^}]*outline:\s*none;/);
      expect(cssContent).toMatch(/input\[type="password"\]:focus[^}]*box-shadow:\s*0 0 0 3px rgba\(0, 123, 255, 0.25\);/);
    });

    test('should include basic styling for buttons', () => {
      expect(cssContent).toMatch(/button\s*\{[^}]*width:\s*100%;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*padding:\s*12px 20px;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*background-color:\s*#007bff;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*color:\s*white;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*border:\s*none;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*border-radius:\s*5px;/);
      expect(cssContent).toMatch(/button\s*\{[^}]*cursor:\s*pointer;/);
    });

    test('should include hover, active, and disabled states for buttons', () => {
      expect(cssContent).toMatch(/button:hover\s*\{[^}]*background-color:\s*#0056b3;/);
      expect(cssContent).toMatch(/button:hover\s*\{[^}]*transform:\s*translateY\(-1px\);/);
      expect(cssContent).toMatch(/button:active\s*\{[^}]*transform:\s*translateY\(0\);/);
      expect(cssContent).toMatch(/button:disabled\s*\{[^}]*background-color:\s*#cccccc;/);
      expect(cssContent).toMatch(/button:disabled\s*\{[^}]*cursor:\s*not-allowed;/);
    });
  });

  // Acceptance Criterion: The CSS includes styles for the message display area, differentiating between normal and error states (e.g., using different colors).
  describe('Message display area styling', () => {
    test('should include basic styling for message-area', () => {
      expect(cssContent).toMatch(/\.message-area\s*\{[^}]*margin-top:\s*20px;/);
      expect(cssContent).toMatch(/\.message-area\s*\{[^}]*padding:\s*12px;/);
      expect(cssContent).toMatch(/\.message-area\s*\{[^}]*border-radius:\s*5px;/);
      expect(cssContent).toMatch(/\.message-area\s*\{[^}]*text-align:\s*center;/);
    });

    test('should include success state styling for message-area', () => {
      expect(cssContent).toMatch(/\.message-area\.success\s*\{[^}]*background-color:\s*#d4edda;/);
      expect(cssContent).toMatch(/\.message-area\.success\s*\{[^}]*color:\s*#155724;/);
      expect(cssContent).toMatch(/\.message-area\.success\s*\{[^}]*border:\s*1px solid #c3e6cb;/);
    });

    test('should include error state styling for message-area', () => {
      expect(cssContent).toMatch(/\.message-area\.error\s*\{[^}]*background-color:\s*#f8d7da;/);
      expect(cssContent).toMatch(/\.message-area\.error\s*\{[^}]*color:\s*#721c24;/);
      expect(cssContent).toMatch(/\.message-area\.error\s*\{[^}]*border:\s*1px solid #f5c6cb;/);
    });

    test('should hide message-area when empty', () => {
      expect(cssContent).toMatch(/\.message-area:empty\s*\{[^}]*display:\s*none;/);
    });
  });

  // Additional tests for overall layout elements mentioned in the CSS
  describe('Overall layout styling', () => {
    test('should include basic body styles', () => {
      expect(cssContent).toMatch(/body\s*\{[^}]*font-family:/);
      expect(cssContent).toMatch(/body\s*\{[^}]*background-color:\s*#f4f7f6;/);
      expect(cssContent).toMatch(/body\s*\{[^}]*display:\s*flex;/);
      expect(cssContent).toMatch(/body\s*\{[^}]*min-height:\s*100vh;/);
    });

    test('should include form-container styles', () => {
      expect(cssContent).toMatch(/\.form-container\s*\{[^}]*background-color:\s*#ffffff;/);
      expect(cssContent).toMatch(/\.form-container\s*\{[^}]*padding:\s*30px;/);
      expect(cssContent).toMatch(/\.form-container\s*\{[^}]*box-shadow:\s*0 4px 12px rgba\(0, 0, 0, 0.1\);/);
      expect(cssContent).toMatch(/\.form-container\s*\{[^}]*max-width:\s*400px;/);
    });

    // Negative case: Ensure a critical style is not missing (covered by positive assertions failing)
    test('should not have an empty CSS file', () => {
      expect(cssContent.length).toBeGreaterThan(0);
    });
  });
});
