/* eslint-disable */
import Vue from "vue";

export default {
  name: "v-global-mixin",

  data () {
    return {};
  },

  created () {
    Vue.prototype.$balanceUsd = this.balanceUsd;
    Vue.prototype.$value_to_str = this.value_to_str;
    Vue.prototype.$value_to_usd = this.value_to_usd;
    Vue.prototype.$str_to_value = this.str_to_value;
    Vue.prototype.$str_to_usd = this.str_to_usd;
    Vue.prototype.$usd_to_str = this.usd_to_str;
    Vue.prototype.$usd_to_value = this.usd_to_value;
    Vue.prototype.$user = this.user;
    Vue.prototype.$countdown = this.countdown;
    Vue.prototype.$LOCALESTRING_USD = this.localeStringUSD;
    Vue.prototype.$LOCALESTRING_CRYPTO = this.localeStringCRYPTO;
    Vue.prototype.$symbolCurrency = this.symbolCurrency;
    Vue.prototype.$symbolCurrencySplitUsdt = this.symbolCurrencySplitUsdt;
    Vue.prototype.$toUsd = this.toUsd;
    Vue.prototype.$fromUsd = this.fromUsd;
    Vue.prototype.$DateText = this.DateText;
    Vue.prototype.$TimeText = this.TimeText;
    Vue.prototype.$declOfNum = this.declOfNum;
    Vue.prototype.$isDev = this.isDev;
  },

  computed: {
    user () {
      return this.$store.getters.user;
    },
    isDev () {
      return process.env.isDev;
    }
  },

  methods: {
    localeStringUSD (min = 2, max = 2) {
      return {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: min,
        maximumFractionDigits: max
      };
    },
    localeStringCRYPTO (min = 3, max = 5) {
      return {
        minimumFractionDigits: min,
        maximumFractionDigits: max
      };
    },

    /** Таймер */
    countdown (earlierDate, laterDate) {
      const oDiff = {};

      //  Calculate Differences
      //  -------------------------------------------------------------------  //
      let nTotalDiff = laterDate.getTime() - earlierDate.getTime();

      oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
      nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

      oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
      nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

      oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
      nTotalDiff -= oDiff.minutes * 1000 * 60;

      oDiff.seconds = Math.floor(nTotalDiff / 1000);
      //  -------------------------------------------------------------------  //

      //  Format Duration
      //  -------------------------------------------------------------------  //
      //  Format Hours
      let hourtext = "00";
      if (oDiff.hours > 0) { hourtext = String(oDiff.hours); }
      if (hourtext.length === 1) { hourtext = "0" + hourtext; }

      //  Format Minutes
      let mintext = "00";
      if (oDiff.minutes > 0) { mintext = String(oDiff.minutes); }
      if (mintext.length === 1) { mintext = "0" + mintext; }

      //  Format Seconds
      let sectext = "00";
      if (oDiff.seconds > 0) { sectext = String(oDiff.seconds); }
      if (sectext.length === 1) { sectext = "0" + sectext; }

      //  Set Duration
      let sDuration = hourtext + ":" + mintext + ":" + sectext;
      if (oDiff.days) { sDuration = oDiff.days + " days, " + sDuration; }
      oDiff.duration = sDuration;
      //  -------------------------------------------------------------------  //

      return oDiff;
    },

    value_to_str (coinType, value) {
      if (!this.$store.getters.config) {
        console.error("NO_CONFIG");
        return 0;
      }
      const format = this.$store.getters.config.coin_format[coinType];
      return value / format;
    },

    str_to_usd (coinType, value) {
      if (!this.$store.getters.config) {
        console.error("NO_CONFIG");
        return 0;
      }
      const format = this.$store.getters.config.coin_format[coinType];
      return this.value_to_usd(coinType, Number(value) * format);
    },

    usd_to_str (coinType, value) {
      const currency = this.$store.getters.currency;
      if (!currency) {
        console.error("NO_CURRENCY");
        return 0;
      }
      const price = currency[coinType];
      return value / price;
    },

    usd_to_value (coinType, value) {
      const currency = this.$store.getters.currency;
      if (!currency) {
        console.error("NO_CURRENCY");
        return 0;
      }
      const price = currency[coinType];

      const format = this.$store.getters.config.coin_format[coinType];

      return value / price * format;
    },

    str_to_value (coinType, value) {
      if (!this.$store.getters.config) {
        console.error("NO_CONFIG");
        return 0;
      }
      const format = this.$store.getters.config.coin_format[coinType];
      return Number(value) * format;
    },

    value_to_usd (coinType, value) {
      // const str = this.value_to_str(coinType, value);
      const currency = this.$store.getters.currency;
      if (!currency) {
        console.error("NO_CURRENCY");
        return 0;
      }
      // let price = currency[coinType];
      // if (!price) { price = 0; }
      const price = (currency.find(e => e.symbol === coinType))?.price ?? 0;
      return Number(value) * Number(price);
    },

    balanceUsd () {
      if (!this.$store.getters.user || !this.$store.getters.currency ||
        !this.$store.getters.wallets) {
        return 0;
      }

      return this.$store.getters.wallets.map(x => x.amountUsd)
        .reduce((a, b) => a + b, 0);
    },

    symbolCurrency (coin) {
      return `${coin.toUpperCase()}USDT`;
    },

    symbolCurrencySplitUsdt (coin) {
      return coin.toUpperCase().split("USDT")[0];
    },

    toUsd (symbol, amount) {
      const list = this.$store.getters.currency;
      const coin = list.find(x => x.symbol === this.symbolCurrency(symbol));
      const usd = symbol.toUpperCase() === "USDT" ? amount : !coin
        ? 0
        : (coin.price * amount);
      return Math.floor(usd * 1e2) / 1e2;
    },

    fromUsd (symbol, amountUsd) {
      const list = this.$store.getters.currency;
      const coin = list.find(x => x.symbol === this.symbolCurrency(symbol));
      const usd = symbol.toUpperCase() === "USDT" ? amountUsd : !coin
        ? 0
        : (amountUsd / coin.price);
      return Math.floor(usd * 1e8) / 1e8;
    },

    DateText (date) {
      date = new Date(date);

      const nowDate = new Date();

      const tomorrow = new Date();
      tomorrow.setDate(nowDate.getDate() + 1);

      const yesterday = new Date();
      yesterday.setDate(nowDate.getDate() - 1);

      const today = new Date();
      today.setDate(nowDate.getDate());

      let str = date.toLocaleDateString();
      try {
        str = date.toLocaleDateString() === tomorrow.toLocaleDateString()
          ? this.$t("TOMORROW")
          : date.toLocaleDateString() === yesterday.toLocaleDateString()
            ? this.$t("YESTERDAY")
            : date.toLocaleDateString() === today.toLocaleDateString()
              ? this.$t("TODAY")
              : date.toLocaleDateString(this.$i18n.locale);
      } catch (err) {}

      return str;
    },

    TimeText (date) {
      date = new Date(date);
      return date.toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit" });
    },

    declOfNum (number, titles, echo = false) {
      const cases = [2, 0, 1, 1, 1, 2];
      const text = titles[(number % 100 > 4 && number % 100 < 20)
        ? 2
        : cases[(number % 10 < 5) ? number % 10 : 5]];
      return echo ? `${number} ${text}` : text;
    }

  }
};
