module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/customEvironment.js"
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ['/node_modules/(?!react-dnd|dnd-core|@react-dnd)'],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};
