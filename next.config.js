module.exports = {
  target: 'serverless',
  webpack(config) {
    config.resolve.modules.push(__dirname)
    return config;
  },
  env: {
    HTTP_BASE_URL: process.env.HTTP_BASE_URL,
    GOOGLE_API: process.env.GOOGLE_API
  }
}
