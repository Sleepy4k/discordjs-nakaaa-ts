declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * @type {string}
       */
      BOT_NAME: string;

      /**
       * @type {string}
       */
      BOT_ICON: string;

      /**
       * @type {string}
       */
      BOT_TOKEN: string;

      /**
       * @type {string}
       */
      BOT_AUTHOR: string;

      /**
       * @type {string}
       */
      BOT_PREFIX: string;

      /**
       * @type {string}
       */
      BOT_BROWSER: string;

      /**
       * @type {string}
       */
      WEB_HOSTNAME: string;

      /**
       * @type {string}
       */
      WEB_PORT: string;

      /**
       * @type {string}
       */
      WEB_ENV: "development" | "production";

      /**
       * @type {string}
       */
      WEB_NAME: string;

      /**
       * @type {string}
       */
      ACTIVITY_TYPE: string;

      /**
       * @type {string}
       */
      ACTIVITY_NAME: string;

      /**
       * @type {string}
       */
      ANTI_CRASH_URL: string;

      /**
       * @type {string}
       */
      WELCOME_CHANNEL: string;

      /**
       * @type {string}
       */
      GOODBYE_CHANNEL: string;
    }
  }
}
