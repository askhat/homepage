module.exports = {
  head: {
    title: 'askhat.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: '16291c5c56d06f57' },
      { hid: 'description', name: 'description', content: 'Askhat&apos;s Homepage' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/minireset.css/0.0.2/minireset.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed:300&amp;subset=cyrillic,cyrillic-ext,latin-ext' }
    ]
  },
  css: [
    '@/assets/flow.css',
    '@/assets/flex.css',
    '@/assets/typography.css'
  ],
  loading: { color: '#3B8070' },
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '49857259',
        webvisor: true,
        clickmap: true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ],
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

