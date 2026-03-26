export default {
preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ], 
};