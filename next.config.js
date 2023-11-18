module.exports = {
    basePath: '',
    trailingSlash: true,
    env: {
        PUBLIC_URL:  '/',
        APP_URL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost/'
    },
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 10 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 1,
      },
}
