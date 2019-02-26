module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/createTypeormConn.ts",
    "<rootDir>/src/routes/photo.ts",
    "<rootDir>/src/routes/upgrade.ts"
  ]
};
