module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["node_modules", "test-config", "<rootDir>/src/createTypeormConn.ts"]
};