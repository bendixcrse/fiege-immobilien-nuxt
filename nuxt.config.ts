import { repositoryName, apiEndpoint } from "./slicemachine.config.json";
import { createClient } from "@prismicio/client";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  compatibilityDate: "2024-09-11",
  

  css: ["~/assets/scss/general.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "@/assets/scss/variables.scss" as *;' },
      },
    },
  },

  hooks: {
    async "prerender:routes"(ctx: any) {
      const prismicClient = createClient(repositoryName);

      // German pages
      let pages: any = await prismicClient.getAllByType("page");
      pages = pages.map((i: any) => `/${i.uid}`);
      pages = pages.filter((i: any) => i != "/home");
      pages.push("/");

      // English pages
      // let enPages: any = await prismicClient.getAllByType("page", {
      //   lang: "en-US",
      // });
      // enPages = enPages.map((i: any) => `/en/${i.uid}`);
      // enPages = enPages.filter((i: any) => !i.includes("/home"));
      // enPages.push("/en");
      // pages = pages.concat(enPages);

      pages.forEach((item: string) => ctx.routes.add(item));
      return ctx;
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Leif Fiege Immobilien",
      htmlAttrs: { lang: "de" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "google-site-verification", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  router: { options: { scrollBehaviorType: "smooth" } },

  routeRules: {
    "/de/**": { redirect: "/" },
    "/de": { redirect: "/" },
    "/hospitality-vip-arrangements": { robots: false, sitemap: false },
    "/slice-simulator": { robots: false, sitemap: false },
    "/api/preview": { robots: false, sitemap: false },
    "/preview": { robots: false, sitemap: false },
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxtjs/prismic",
    "@nuxtjs/seo",
    "nuxt-gtag",
    "nuxt-swiper",
  ],

  site: { url: "https://fiege-immobilien.com", name: "Leif Fiege Immobilien", description: "" },

  schemaOrg: { identity: "Organization" },

  googleFonts: { families: { 'Red Hat Display': [300, 400, 500, 600, 700] }, download: false },

  gtag: {
    id: "G-QB72SEC3S0",
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          // analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },

  i18n: {
    vueI18n: "../i18n.config.ts",
    locales: [
      { code: "de", language: "de-de" },
      // { code: "en", language: "en-us" },
    ],
    detectBrowserLanguage: false,
    defaultLocale: "de",
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    // preview: "/api/preview",
    clientConfig: {
      routes: [
        { type: "page", path: "/:lang/:uid" },
        { type: "page", uid: "home", path: "/:lang" },
      ],
    },
  },

  sitemap: {
    excludeAppSources: ["nuxt:prerender"],
    urls: async () => {
      const prismicClient = createClient(repositoryName);

      // German pages
      let pages: any = await prismicClient.getAllByType("page");
      pages = pages.map((i: any) => `/${i.uid}`);
      pages = pages.filter((i: any) => i != "/home");

      // English pages
      // let enPages: any = await prismicClient.getAllByType("page", {
      //   lang: "en-US",
      // });
      // enPages = enPages.map((i: any) => `/en/${i.uid}`);
      // enPages = enPages.filter((i: any) => !i.includes("/home"));
      // pages = pages.concat(enPages);

      return pages;
    },
  },
});