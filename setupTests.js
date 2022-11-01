import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn().mockImplementation((query) => jest.fn()),
});
// Object.defineProperty(window.location, 'href', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => query),
// });

let __cookies;
Object.defineProperty(window.document, 'cookie', {
  get: () => __cookies,
  set: (v) => (__cookies = v),
  split: (s) => __cookies.split(s),
});
