// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    'web/**/*.{js,jsx,ts,tsx}',
    '!web/**/*.d.ts',
    'vanillajs/**/*.{js,jsx,ts,tsx}',
    '!vanillajs/**/*.d.ts',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'coverage/ui', outputName: 'junit.xml' },
    ],
  ],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testMatch: [
    '<rootDir>/web/**/__tests__/**/*.{js,jsx,ts,tsx}', 
    '<rootDir>/web/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/vanillajs/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/vanillajs/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!gsap|@mui|d3|d3-array|d3-tip|internmap|delaunator|robust-predicates)",
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  coverageDirectory: 'coverage/ui',
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: true,
};
