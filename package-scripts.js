const npsUtils = require('nps-utils')

const { rimraf, series, concurrent } = npsUtils

module.exports = {
  scripts: {
    clean: series(rimraf('.next'), rimraf('coverage')),
    commit: 'git cz',
    default: 'next build && next start',
    dev: 'next',
    lint: {
      default: 'eslint pages components',
      fix: series.nps('lint --fix')
    },
    reportCoverage: 'codecov',
    test: {
      default: 'jest --config jest.config.json --runInBand',
      coverage: series.nps('test --coverage --silent'),
      watch: series.nps('test --watch')
    },
    validate: {
      default: concurrent.nps('lint', 'test'),
      withCoverage: concurrent.nps('lint', 'test.coverage')
    }
  }
}
