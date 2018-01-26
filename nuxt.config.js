module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'kr-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [ { src: '~plugins/iview', ssr: false } ],
  css: ['iview/dist/styles/iview.css',],
}
