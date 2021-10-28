<template>
  <div class="token-swap">
    <div class="m-b-20">
      <div v-if="sendCoin" class="text-right small">
        <span class="color-gray">{{ $t("AVAILABLE") }}:</span>
        <span class="font-medium">
          {{ (sendCoin.amount > 0 ? sendCoin.amount : 0).toLocaleString("en-US", $LOCALESTRING_CRYPTO()) }}
        </span>
        <span class="color-gray">{{ sendCoin.symbol.toUpperCase() }}</span>
      </div>
      <ui-text-field
        v-model.number="sendInput"
        :floating="true"
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
              style="color: var(--base-text);"
              @click="setMax"
            >
              {{ $t("ALL") }}
            </button>
            <ui-select
              v-model="sendCoin"
              :options="sendCoinList"
              @input="sendSelect($event)"
            >
              <template #selected="{ option }">
                {{ option.symbol.toUpperCase() }}
              </template>
              <template #default="{ option }">
                {{ option.symbol.toUpperCase() }}
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
        :floating="true"
        :label="$t('GET')"
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
            <template #selected="{ option }">
              {{ option.symbol.toUpperCase() }}
            </template>
            <template #default="{ option }">
              {{ option.symbol.toUpperCase() }}
            </template>
          </ui-select>
        </template>
      </ui-text-field>
    </div>
    <p v-if="fee > 0" class="color-info small" v-html="feeMessage" />
    <div class="m-t-40">
      <button
        class="btn btn-solid btn-full"
        :disabled="loading || done || !wallets.length || sendInput > sendCoin.amount || !sendInput || !getInput"
        @click="onExchange"
      >
        <template v-if="loading">
          <ui-preloader size="small" color="black" />
        </template>
        <template v-else-if="done">
          <ui-icon-done />
        </template>
        <template v-else>
          {{ $t("SWAP_TOKENS") }}
        </template>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "TokenSwap",
  data () {
    return {
      loading: false,
      done: false,
      sendInput: "",
      getInput: "",
      fee: 0,
      sendCoin: {
        symbol: ""
      },
      getCoin: {
        symbol: ""
      },
      getCoinList: [],
      sendCoinList: [],
      errors: [],
      errorValidate: null,
      feeMessageShow: null
    };
  },
  computed: {
    wallets () {
      return this.$store.getters.wallets; // .filter(e => !["usdt", "bnb"].includes(e.symbol)) || [];
    },
    feeSymbol () {
      return this.wallets.find(e => e.symbol === "oro").amount >= this.fee ? "oro" : this.getCoin.symbol;
    },
    feeMessage () {
      return `${this.$t("ADDITIONAL_COMMISSION")}: ${this.fee} ${this.feeSymbol.toUpperCase()}`;
    }
  },
  mounted () {
    this.Update();
  },
  methods: {
    /** Устанавливаем значения списков по умолчанию */
    Update () {
      this.getCoinList = this.wallets;
      this.sendCoinList = this.wallets; // .filter(e => !["oro"].includes(e.symbol));

      this.sendCoin = this.sendCoinList[0];
      this.getCoin = this.getCoinList.filter(e => e.symbol !== this.getCoinList[0].symbol)[0];
    },

    /** Слушатель события ввода получаемых монет */
    onSendInput () {
      // this.fee = this.sendCoin.symbol === "fcoin" && this.getCoin.symbol === "oro" ? 0 : this.sendInput * 0.1;
      this.getInput = this.sendInput;
      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Слушатель события ввода отправляемых монет */
    onGetInput () {
      // this.fee = this.sendCoin.symbol === "fcoin" && this.getCoin.symbol === "oro" ? 0 : this.getInput * 0.1;
      this.sendInput = this.getInput;
      this.errorValidate = this.sendInput > this.sendCoin.amount
        ? `Max ${this.sendCoin.amount.toLocaleString("en-US", this.$LOCALESTRING_CRYPTO())}`
        : "";
    },

    /** Обмен токенов */
    onExchange () {
      if (confirm(this.$t("CONFIRM_SWAP")
        .replace("%{TOKEN_1}", `${this.sendInput}${this.sendCoin.symbol.toUpperCase()}`)
        .replace("%{TOKEN_2}", `${this.getInput}${this.getCoin.symbol.toUpperCase()}`))) {
        this.loading = true;
        this.$API.TokenSwap(
          { fromSymbol: this.sendCoin.symbol, toSymbol: this.getCoin.symbol, fromAmount: this.sendInput }, (r) => {
            this.exchangeSuccess(r);
          }, (error) => {
            this.loading = false;
            console.error("ERROR swap", error);
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
      if (this.sendCoin.symbol === "fcoin") {
        this.getCoin = this.wallets.filter(e => e.symbol === "oro")[0];
        this.getCoinList = this.wallets.filter(e => ["fcash", "oro"].includes(e.symbol));
      }
      if (this.sendCoin.symbol === "fcash") {
        this.getCoin = this.wallets.filter(e => e.symbol === "fcoin")[0];
        this.getCoinList = this.wallets.filter(e => ["fcoin"].includes(e.symbol));
      }
    },

    /** Выбор типа получаемой монеты */
    getSelect (event) {
      this.getCoin = event;
      this.clearFields();
      if (this.getCoin.symbol === "fcoin") {
        this.sendCoin = this.wallets.filter(e => e.symbol === "fcash")[0];
        this.sendCoinList = this.wallets.filter(e => ["fcash", "fcoin"].includes(e.symbol));
      }
      if (this.getCoin.symbol === "fcash") {
        this.sendCoin = this.wallets.filter(e => e.symbol === "fcoin")[0];
        this.sendCoinList = this.wallets.filter(e => ["fcoin", "fcash"].includes(e.symbol));
      }
    },

    /** Очистка полей формы и данных */
    clearFields () {
      this.getInput = this.sendInput = this.fee = this.errorValidate = null;
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
.token-swap {
  max-width: 600px;
}
</style>
