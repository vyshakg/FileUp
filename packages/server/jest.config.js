module.exports = {
  globalSetup: "<rootDir>/src/test/index.js",
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["node_modules", "test-config", "<rootDir>/src/createTypeormConn.ts"]
  // setupTestFrameworkScriptFile: "./jest.setup.js"
};
