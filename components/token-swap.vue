<template>
  <div v-if="!sendCoinList.length" style="padding: 30px;">
    Please replenish your wallet before buy tokens...
  </div>
  <div v-else class="token-swap">
    <h2 v-if="mode" class="modal-title m-b-40">
      {{ $t(mode.toUpperCase()) }}
      {{ inputCurrency.toUpperCase() }}
    </h2>
    <div class="m-b-20">
      <div v-if="sendCoin" class="text-right small m-b-10">
        <span class="font-300">{{ $t("AVAILABLE") }}:</span>
        <span class="font-medium color-white">
          {{ (sendCoin.amount > 0 ? sendCoin.amount : 0).toLocaleString("en-US", $LOCALESTRING_CRYPTO()) }}
        </span>
        <span class="color-white">{{ sendCoin.symbol.toUpperCase() }}</span>
      </div>
      <ui-text-field
        v-model.number="sendInput"
        :label="$t('GIVE')"
        type="number"
        min="0"
        step="0.01"
        @input="onSendInput"
      >
        <template #append>
          <div class="display-flex aic">
            <button
              class="btn btn-small"
              style="color: #fff;"
              @click="setMax"
            >
              {{ $t("ALL") }}
            </button>
            <ui-select
              v-model="sendCoin"
              :options="sendCoinList"
              @input="sendSelect($event)"
            >
              <template #default="{ option }">
                <div style="text-transform: uppercase">
                  {{ option ? option.symbol : "NO_SYMBOL" }}
                </div>
              </template>
            </ui-select>
          </div>
        </template>
      </ui-text-field>
      <p v-if="errorValidate" class="error-text" v-html="errorValidate" />
    </div>
    <div v-if="false">
      <ui-icon name="swap" role="button" style="width: 30px; margin: 30px auto 0; display: block;" />
    </div>
    <div class="m-b-20">
      <ui-text-field
        v-model.number="getInput"
        :label="`≈ ${$t('GET')}`"
        type="number"
        min="0"
        step="0.01"
        @input="onGetInput"
      >
        <template #append>
          <ui-select
            v-model="getCoin"
            :options="getCoinList"
            @input="getSelect($event)"
          >
            <template #default="{ option }">
              {{ option ? option.symbol.split("USDT")[0] : "NONE" }}
            </template>
          </ui-select>
        </template>
      </ui-text-field>
    </div>
    <div class="m-t-40">
      <button
        class="btn btn-full"
        :class="['btn', {'btn-blue': inputCurrency === 'KZN'}, {'btn-yellow': inputCurrency === 'VNG'}, {'btn-red': inputCurrency === 'SRK'}]"
        :disabled="loading || !wallets.length || sendInput > sendCoin.amount || !sendInput || !getInput || $symbolCurrencySplitUsdt(sendCoin.symbol).toLowerCase() === $symbolCurrencySplitUsdt(getCoin.symbol).toLowerCase()"
        @click="onExchange"
      >
        <template v-if="loading">
          <ui-preloader size="small" color="white" />
        </template>
        <template v-else-if="done">
          <ui-icon-done fill="#deff82" />
        </template>
        <template v-else>
          {{ $t(mode ? mode.toUpperCase() : "BUY") }}
        </template>
      </button>
    </div>
    <ul v-if="errors.length" class="list m-t-20">
      <li v-for="(error, idx) in errors" :key="idx" class="error-text" v-html="error" />
    </ul>
  </div>
</template>

<script>

export default {
  name: "TokenSwap",
  props: {
    inputCurrency: { // Для покупки/продажи индексов
      type: String,
      default: ""
    },
    propToken: { // Для покупки/продажи токенов
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "token",
      validator (value) {
        return ["token", "index"].includes(value);
      }
    },
    mode: { // Покупка или продажа
      type: String,
      default: ""
    }
  },
  data () {
    return {
      done: false,
      loading: false,
      sendInput: "",
      sendInputUsd: 0,
      sendCoinList: [],
      sendCoin: {
        symbol: ""
      },
      getInput: "",
      getInputUsd: 0,
      getCoinList: [],
      getCoin: {
        symbol: ""
      },
      errors: [],
      errorValidate: null
    };
  },
  computed: {
    wallets () {
      return this.$store.getters.wallets;
    },
    currencies () {
      return this.$store.getters.currency;
    },
    indexFromUrl () {
      return this.$route.query?.index ?? null;
    }
  },
  mounted () {
    this.Update();
  },
  methods: {
    /** Устанавливаем значения списков по умолчанию */
    Update () {
      if (this.type === "index") {
        this.getCoinList = this.currencies.filter(e => ["KAIZENUSDT", "CRYPTO100USDT", "COIN10USDT", "DEFIUSDT", (this.inputCurrency && this.mode === "sell") ? "USDUSDT" : ""].includes(e.symbol));
      } else {
        this.getCoinList = this.currencies.filter(e => ["VNGUSDT", "KZNUSDT", "SRKUSDT", (this.inputCurrency && this.mode === "sell") ? "USDUSDT" : ""].includes(e.symbol));
      }
      this.sendCoinList = this.mode === "sell"
        ? []
        : this.wallets.filter(e => e.amount > 0 && !["crypto10", "coin10", "defi", "kaizen", "bitw", this.inputCurrency.toLowerCase()].includes(e.symbol));

      this.sendCoin = this.inputCurrency && this.mode === "sell"
        ? this.sendCoinList.find(e => e.symbol.toUpperCase() === this.inputCurrency.toUpperCase())
        : this.sendCoin = this.sendCoinList[0]; // .filter(e => e.symbol === "usd");

      // Если в URL есть get параметр "index", то устанавливаем его по умолчанию для покупки
      if (this.indexFromUrl) {
        this.getCoin = this.getCoinList.find(e => e.symbol.split("USDT")[0].toUpperCase() === this.indexFromUrl.toUpperCase());
      } else if (this.inputCurrency && this.mode === "buy") {
        this.getCoin = this.getCoinList.find(e => e.symbol.split("USDT")[0].toUpperCase() === this.inputCurrency.toUpperCase());
      } else {
        this.getCoin = this.getCoinList.filter(e => e.symbol !== this.getCoinList[0].symbol)[0];
      }
    },

    /** Слушатель события ввода получаемых монет */
    onSendInput () {
      this.sendInputUsd = this.$toUsd(this.$symbolCurrencySplitUsdt(this.sendCoin.symbol), this.sendInput);
      this.getInput = this.$fromUsd(this.$symbolCurrencySplitUsdt(this.getCoin.symbol), this.sendInputUsd);
      console.log(this.sendCoin.symbol, this.sendInput);
      console.log(this.sendInputUsd, this.getInput);

      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Слушатель события ввода отправляемых монет */
    onGetInput () {
      this.getInputUsd = this.$toUsd(this.$symbolCurrencySplitUsdt(this.getCoin.symbol), this.getInput);
      this.sendInput = this.$fromUsd(this.$symbolCurrencySplitUsdt(this.sendCoin.symbol), this.getInputUsd);
      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Обмен токенов */
    onExchange () {
      if (confirm(this.$t(`CONFIRM_${this.mode ? this.mode.toUpperCase() : "BUY"}_INDEX`)
        .replace("%{TOKEN_2}", `${this.sendInput} ${this.sendCoin.symbol.toUpperCase()}`)
        .replace("%{TOKEN_1}", `${this.getInput} ${this.$symbolCurrencySplitUsdt(this.getCoin.symbol)}`))) {
        this.loading = true;
        this.$API.TokenSwap(
          {
            fromSymbol: this.sendCoin.symbol,
            toSymbol: this.$symbolCurrencySplitUsdt(this.getCoin.symbol).toLowerCase(),
            fromAmount: this.sendInput
          }, (r) => {
            this.exchangeSuccess(r);
          }, (e) => {
            this.loading = false;
            if (e.message === "incorrect_access_token") {
              this.$store.dispatch("logout");
              this.$router.push(this.localePath("auth"));
            }
            console.error("ERROR swap", e);
            this.errors = Array.isArray(e?.message) ? this.$t(e?.message.toUpperCase()) : [this.$t(e.message.toUpperCase())];
          });
      }
    },

    /** Метод при успешном обмене монет
     * r - объект response
     */
    exchangeSuccess (r) {
      this.loading = false;
      this.done = true;
      this.$store.dispatch("updateUser", r.user);
      setTimeout(() => {
        this.done = false;
        this.clearFields();
        this.Update();
      }, 2000);
    },

    /** Выбор типа отправляемой монеты */
    sendSelect (event) {
      this.sendCoin = event;
      this.clearFields();
    },

    /** Выбор типа получаемой монеты */
    getSelect (event) {
      this.getCoin = event;
      this.clearFields();
    },

    /** Очистка полей формы и данных */
    clearFields () {
      this.getInput = this.sendInput = this.errorValidate = null;
    },

    /** Установить max значение в поле */
    setMax () {
      this.sendInput = this.sendCoin.amount;
      this.onSendInput();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
