const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://front.serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },
  env: {
    baseUrlApi: process.env.CYPRESS_BASE_URL || 'https://serverest.dev/'
  },
  defaultCommandTimeout: 4000,
  responseTimeout: 100000,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 2,
  }
});