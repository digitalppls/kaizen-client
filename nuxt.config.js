import fs from "fs";
import path from "path";

export default {
  env: {
    PROXY: process.env.PROXY || "",
    SERVER_URL: process.env.SERVER_URL,
    isDevServer: process.env.SERVER_URL === "https://bot.oromundo.io"
  },
  server: {
    port: 5000,
    https: process.env.HTTPS === "true"
      ? {
          key: fs.readFileSync(path.resolve(__dirname, "cert", "server.key")),
          cert: fs.readFileSync(path.resolve(__dirname, "cert", "server.crt"))
        }
      : null,
    host: "0.0.0.0",
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: "static", // target: "static",
  router: {
    base: "/"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "KAIZEN FUND",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: ""
      },
      {
        name: "format-detection",
        content: "telephone=no"
      }
    ],
    // script: [
    //   {
    //     src: `${process.env.SERVER_URL}/socket.io/socket.io.js`
    //   }
    // ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/favicon/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#000"
      },
      {
        rel: "shortcut icon",
        href: "/favicon/favicon.ico"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon/favicon.ico"
      },
      {
        rel: "msapplication-TileColor",
        content: "#ffe600"
      },
      {
        rel: "msapplication-config",
        content: "/favicon/browserconfig.xml"
      },
      {
        rel: "theme-color",
        content: "#000"
      }
      // {
      //   rel: "preconnect",
      //   href: "https://fonts.googleapis.com"
      // },
      // {
      //   rel: "preconnect",
      //   href: "https://fonts.gstatic.com",
      //   cssorigin: "",
      //   as: "font"
      // },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
      // }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  styleResources: {
    scss: ["@/assets/scss/variables.scss", "@/assets/scss/mixins/mixins.scss"]
  },

  css: [
    {
      src: "@/assets/scss/template.scss",
      lang: "scss"
    }
  ],

  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/utils.js", ssr: false },
    { src: "~plugins/api.js", ssr: false },
    { src: "~plugins/click-outside.js", ssr: false },
    { src: "~plugins/axios.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/global-components"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
    [
      "nuxt-i18n",
      {
        locales: [
          {
            name: "Русский",
            code: "ru",
            iso: "ru-RU",
            file: "ru-RU.js"
          },
          {
            name: "English",
            code: "en",
            iso: "en-US",
            file: "en-US.js"
          }
        ],
        langDir: "lang/",
        defaultLocale: "ru",
        vueI18nLoader: true
      }
    ]
  ],

  proxy: process.env.PROXY
    ? {
        "/server": {
          target: process.env.PROXY,
          pathRewrite: { "^/server": "/" }
        }
      }
    : {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.PROXY
      ? "//192.168.0.54:80/server"
      : "/"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    // publicPath: "dist/"
    extend (config, { loaders }) {
      loaders.scss.additionalData = "@use \"sass:math\";";
    }
  }
};
