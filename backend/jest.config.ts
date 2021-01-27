/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import { pathsToModuleNameMapper } from 'ts-jest/utils'

// usar a mesma configuração da propriedade compilerOptions.paths do tsconfig.json
const tsconfig_compilerOptions_paths = { "@/*": ["./*"] }

export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(tsconfig_compilerOptions_paths, { prefix: '<rootDir>/src/' }),

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/*.spec.ts",
  ],

};
