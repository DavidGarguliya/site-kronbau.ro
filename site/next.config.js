const { withKeystone } = require('@keystone-6/core/next')
const { i18n } = require('./next-i18next.config')
const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withKeystone(withBundleAnalyzer(withVanillaExtract({
  i18n,
})))