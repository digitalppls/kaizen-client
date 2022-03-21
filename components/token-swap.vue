<template>
  <!-- <div v-if="!sendCoinList.length" style="padding: 30px;">
    {{ $t("REFILL_MSG") }}
  </div> -->
  <div class="token-swap">
    <h2 v-if="mode" class="modal-title m-b-40">
      {{ $t(mode.toUpperCase()) }}
      <span class="text-uppercase">
        {{ inputCurrency }}
      </span>
    </h2>
    <div class="m-b-20">
      <div v-if="sendCoin" class="text-right small m-b-10">
        <span class="font-300">{{ $t("AVAILABLE") }}:</span>
        <span class="font-medium color-white">
          {{ (sendCoin.amount > 0 ? sendCoin.amount : 0).toLocaleString("en-US", $LOCALESTRING_CRYPTO()) }}
        </span>
        <span class="color-white text-uppercase">
          {{ sendCoin.symbol }}
        </span>
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
                  {{ option ? $symbolCurrencyRemoveUsdt(option.symbol) : "NO_SYMBOL" }}
                </div>
              </template>
            </ui-select>
          </div>
        </template>
      </ui-text-field>
      <p v-if="errorValidate" class="error-text m-t-5 font-300" v-html="errorValidate" />
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
              {{ option ? $symbolCurrencyRemoveUsdt(option.symbol) : "NONE" }}
            </template>
          </ui-select>
        </template>
      </ui-text-field>
    </div>
    <div class="m-t-40">
      <button
        class="btn btn-full"
        :class="['btn', 'text-uppercase', {'btn-blue': inputCurrency === 'kzn'}, {'btn-yellow': inputCurrency === 'vng'}, {'btn-red': inputCurrency === 'srk'}]"
        :disabled="loading || !wallets.length || sendInput > sendCoin.amount || !sendInput || !getInput || $symbolCurrencyRemoveUsdt(sendCoin.symbol).toLowerCase() === $symbolCurrencyRemoveUsdt(getCoin.symbol).toLowerCase()"
        @click="onExchange"
      >
        <ui-preloader v-if="loading" size="small" color="white" />
        <ui-icon-done v-else-if="done" fill="#deff82" />
        <template v-else>
          {{ $t(mode.toUpperCase()) }}
          <template v-if="mode === 'sell'">
            {{ $symbolCurrencyRemoveUsdt(sendCoin.symbol) }}
          </template>
          <template v-else>
            {{ $symbolCurrencyRemoveUsdt(getCoin.symbol) }}
          </template>
        </template>
      </button>
    </div>
    <ul v-if="errors.length" class="list m-t-20">
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="error-text"
        v-html="error"
      />
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
    type: { // Что меняем: токен/индекс
      type: String,
      default: "token",
      validator (value) {
        return ["token", "index"].includes(value);
      }
    },
    mode: { // Покупка или продажа
      type: String,
      default: ""
    },
    sale: { // Покупка или продажа
      type: Object,
      default () {
        return {};
      }
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
      const tokenSymbol = this.type === "index"
        ? this.inputCurrency
        : this.sale.symbol;

      if (this.mode === "buy") { /* Покупка */
        // Список отдаваемых монет: все что > 0 и если это не получаемая монета
        this.sendCoinList = this.wallets.filter(item => item.amount > 0 && ![tokenSymbol].includes(item.symbol));
        this.sendCoin = this.sendCoinList[0];
        // список получаемых монет
        this.getCoinList = this.currencies.filter(item => [this.$symbolCurrencyAddUsdt(tokenSymbol)].includes(item.symbol));
        this.getCoin = this.getCoinList.find(item => this.$symbolCurrencyRemoveUsdt(item.symbol).toLowerCase() === tokenSymbol);
      } else { /* Продажа */
        // Список токенов, недоступных для получения при продаже
        const disabledCoins = ["USDTUSDT", "TRXUSDT", "BUSDUSDT", "USDCUSDT", "BNBUSDT", "BTCUSDT"];
        // Список отдаваемых монет: все что > 0 и если это не получаемая монета
        this.sendCoinList = this.currencies.filter(item => [this.$symbolCurrencyAddUsdt(tokenSymbol)].includes(item.symbol));
        this.sendCoin = this.wallets.find(item => tokenSymbol === item.symbol);
        // this.sendCoin = this.sendCoinList[0];
        disabledCoins.push(this.sendCoin.symbol);
        // список получаемых монет
        this.getCoinList = this.currencies.filter(item => !disabledCoins.includes(item.symbol));
        this.getCoin = this.wallets.filter(item => item.amount > 0 && ![tokenSymbol].includes(item.symbol))[0];
      }

      // Если в URL есть get параметр "index", то устанавливаем его по умолчанию для покупки
      // if (this.indexFromUrl) {
      //   this.getCoin = this.getCoinList.find(e => e.symbol.split("USDT")[0].toUpperCase() === this.indexFromUrl.toUpperCase());
      // } else if (this.inputCurrency && this.mode === "buy") {
      //   console.log("2");
      //   this.getCoin = this.getCoinList.find(item => this.$symbolCurrencyRemoveUsdt(item.symbol).toUpperCase() === this.inputCurrency.toUpperCase());
      // } else {
      //   console.log("3");
      //   this.getCoin = this.getCoinList.filter(e => e.symbol !== this.getCoinList[0].symbol)[0];
      // }
    },

    /** Слушатель события ввода получаемых монет */
    onSendInput () {
      this.sendInputUsd = this.$toUsd(this.$symbolCurrencyRemoveUsdt(this.sendCoin.symbol), this.sendInput);
      this.getInput = this.$fromUsd(this.$symbolCurrencyRemoveUsdt(this.getCoin.symbol), this.sendInputUsd);

      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Слушатель события ввода отправляемых монет */
    onGetInput () {
      this.getInputUsd = this.$toUsd(this.$symbolCurrencyRemoveUsdt(this.getCoin.symbol), this.getInput);
      this.sendInput = this.$fromUsd(this.$symbolCurrencyRemoveUsdt(this.sendCoin.symbol), this.getInputUsd);
      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Обмен токенов */
    onExchange () {
      const confirmMsg = this.$t(`CONFIRM_${this.mode ? this.mode.toUpperCase() : "BUY"}_INDEX`)
        .replace("%{TOKEN_2}", `${this.sendInput} ${this.sendCoin.symbol.toUpperCase()}`)
        .replace("%{TOKEN_1}", `${this.getInput} ${this.$symbolCurrencyRemoveUsdt(this.getCoin.symbol)}`);

      if (confirm(confirmMsg)) {
        this.loading = true;
        this.$API.TokenSwap(
          {
            fromSymbol: this.sendCoin.symbol,
            toSymbol: this.$symbolCurrencyRemoveUsdt(this.getCoin.symbol).toLowerCase(),
            fromAmount: this.sendInput
          }, (r) => {
            this.exchangeSuccess(r);
          }, (e) => {
            console.error("ERROR swap", e);
            this.loading = false;
            if (e.message === "incorrect_access_token") {
              this.$store.dispatch("logout");
              this.$router.push(this.localePath("auth"));
            }
            this.errors = Array.isArray(e?.message)
              ? this.$t(e?.message.toUpperCase())
              : [this.$t(e.message.toUpperCase())];
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
