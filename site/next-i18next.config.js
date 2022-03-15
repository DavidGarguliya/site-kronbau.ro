module.exports = {
  i18n: {
    locales: process.env.NEXT_PUBLIC_LANGUAGES.split(','),
    defaultLocale: 'ro',

    localeDetection: false,
  },
}