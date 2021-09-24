module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.vue'
  ],
  setupFiles: ['./jest-init.js']
}
