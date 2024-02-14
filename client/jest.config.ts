const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

export default {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    "^.+\\.(ts|tsx)$": [`ts-jest`, { tsconfig: 'tsconfig.json' }]
  },
}