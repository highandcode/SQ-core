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
Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: jest.fn().mockImplementation((query) => 'testURl'),
    revokeObjectURL: jest.fn(),
  },
});

delete window.location;
window.location = {};
let _url = 'test';
Object.defineProperty(window.location, 'href', {
  get: () => _url,
  set: (u) => (_url = u),
});
Object.defineProperty(window.location, 'pathname', {
  get: () => _url,
  set: (u) => (_url = u),
});

let __cookies;
Object.defineProperty(window.document, 'cookie', {
  get: () => __cookies,
  set: (v) => (__cookies = v),
  split: (s) => __cookies.split(s),
});
