<template>
  <div v-if="!wallets.length" style="padding: 30px;">
    {{ $t("REFILL_MSG") }}
  </div>
  <div v-else-if="!emailVerified" style="padding: 30px;">
    <div class="m-b-20">
      {{ $t("VERIFY_EMAIL_MSG") }}
    </div>

    <nuxt-link :to="localePath('/my/profile') + '#verifyemail'" class="btn btn-yellow btn-small" style="padding: 10px 20px; font-size: 14px;">
      {{ $t("CONFIRM_EMAIL") }}
    </nuxt-link>
  </div>
  <div v-else class="token-swap">
    <h2 v-if="mode" class="modal-title m-b-40">
      {{ $t(mode.toUpperCase()) }}
      <span class="text-uppercase">
        {{ inputCurrency }}
      </span>
    </h2>
    <div class="m-b-20">
      <!-- Баланс выбранного токена -->
      <div v-if="sendCoin" class="text-right small m-b-10">
        <!-- Доступно для вывода -->
        <span v-if="sendCoinAvailable > -1" class="m-r-10">
          <span class="font-300">{{ $t("AVAILABLE") }}:</span>
          <span class="font-medium color-white">
            {{ sendCoinAvailable.toLocaleString("en-US", $LOCALESTRING(1, 5)) }}
          </span>
          <span class="color-white text-uppercase">
            {{ sendCoin }}
          </span>
        </span>

        <span class="font-300">{{ $t("BALANCE") }}:</span>
        <span class="font-medium color-white">
          {{ sendCoinBalance.toLocaleString("en-US", $LOCALESTRING(1, 5)) }}
        </span>
        <span class="color-white text-uppercase">
          {{ sendCoin }}
        </span>
      </div>
      <!-- Отдаешь токен -->
      <ui-text-field
        v-model.number="sendInput"
        :label="$t('GIVE')"
        type="number"
        min="0"
        step="0.01"
        @input="onSendInput"
      >
        <template #append>
          <div class="display-flex ai--center">
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
              style="text-transform: uppercase"
              @input="sendSelect($event)"
            >
              <template #default="{ option }">
                {{ option }}
              </template>
            </ui-select>
          </div>
        </template>
      </ui-text-field>
      <p v-if="errorSendValidate" class="error-text m-t-5 font-300" v-html="errorSendValidate" />
    </div>
    <div class="m-b-20">
      <!-- Получаешь токен -->
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
            style="text-transform: uppercase"
            @input="getSelect($event)"
          >
            <template #default="{ option }">
              {{ option }}
            </template>
          </ui-select>
        </template>
      </ui-text-field>
      <p v-if="errorGetValidate" class="error-text m-t-5 font-300" v-html="errorGetValidate" />
    </div>
    <!-- Кнопка "КУПИТЬ" -->
    <div class="m-t-40">
      <button
        class="btn btn-full"
        :class="['btn', 'text-uppercase', {'kzn': 'btn-blue', 'vng': 'btn-yellow', 'srk': 'btn-red'}[inputCurrency]]"
        :disabled="loading || !wallets.length || !!errorSendValidate || !!errorGetValidate  || !sendInput || !getInput || sendCoin === getCoin"
        @click="onExchange"
      >
        <ui-preloader v-if="loading" size="small" color="white" />
        <ui-icon-done v-else-if="done" fill="#141517" />
        <template v-else>
          {{ $t(mode.toUpperCase()) }}
          <template v-if="mode === 'sell'">
            {{ sendCoin }}
          </template>
          <template v-else>
            {{ getCoin }}
          </template>
        </template>
      </button>
    </div>
    <ul v-if="errors.length" class="list list--none m-t-20">
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
      sendCoinAvailable: -1,
      sendCoin: "",
      getInput: "",
      getInputUsd: 0,
      getCoinList: [],
      getCoin: "",
      errors: [],
      errorSendValidate: "",
      errorGetValidate: ""
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
    },
    /* Из общего списка выбираем направления обмена для текущего токена
     * Вид элемента массива ["sendToken", "getToken"]
     */
    tokenSwapList () {
      return this.$store.getters.tokenSwapList.filter(x => x.includes(this.inputCurrency));
    },
    /* Баланс отдаваемого токена */
    sendCoinBalance () {
      return this.wallets.find(item => this.sendCoin === item.symbol)?.amount ?? 0;
    },
    emailVerified () {
      return this.$store.getters.user?.emailVerified ?? false;
    }
  },
  mounted () {
    this.Update();
  },
  methods: {
    /** Устанавливаем значения списков по умолчанию */
    Update () {
      if (this.mode === "buy") { /* Покупка */
        // Список отдаваемых монет
        this.sendCoinList = this.tokenSwapList.map(e => e[0]).filter(x => !x.includes(this.inputCurrency));
        this.sendCoin = this.sendCoinList[0];
        // Список получаемых монет
        this.getCoinList = [this.inputCurrency];
        this.getCoin = this.getCoinList[0];
      } else { /* Продажа */
        this.$API.TokenSwapLimit(this.inputCurrency, (r) => {
          this.sendCoinAvailable = Math.abs(r);
        });

        // Список отдаваемых монет
        this.sendCoinList = [this.inputCurrency];
        this.sendCoin = this.sendCoinList[0];
        // Список получаемых монет
        this.getCoinList = this.tokenSwapList.map(e => e[1]).filter(x => !x.includes(this.inputCurrency));
        this.getCoin = this.getCoinList[0];
      }
    },

    /** Слушатель события ввода отдаваемых монет */
    onSendInput () {
      this.sendInputUsd = this.$toUsd(this.sendCoin, this.sendInput);
      this.getInput = this.$fromUsd(this.getCoin, this.sendInputUsd);
      this.inputValidate()
    },

    /** Слушатель события ввода получаемых монет */
    onGetInput () {
      this.getInputUsd = this.$toUsd(this.getCoin, this.getInput);
      this.sendInput = this.$fromUsd(this.sendCoin, this.getInputUsd);
      this.inputValidate();
    },

    /** Обмен токенов */
    onExchange () {
      const confirmMsg = this.$t(`CONFIRM_${this.mode ? this.mode.toUpperCase() : "BUY"}_INDEX`)
        .replace("%{TOKEN_2}", `${this.sendInput} ${this.sendCoin.toUpperCase()}`)
        .replace("%{TOKEN_1}", `${this.getInput} ${this.getCoin.toUpperCase()}`);

      if (confirm(confirmMsg)) {
        this.loading = true;
        this.$API.TokenSwap(
          {
            fromSymbol: this.sendCoin,
            toSymbol: this.getCoin,
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
    sendSelect (token) {
      this.sendCoin = token;

      /* Получаем инфо о доступном кол-ве токенов для продажи/вывода */
      if (["kzn", "vng", "srk"].includes(token)) {
        this.$API.TokenSwapLimit(token, (r) => {
          this.sendCoinAvailable = Math.abs(r);
        });
      } else {
        this.sendCoinAvailable = -1;
      }

      this.clearFields();
    },

    /** Выбор типа получаемой монеты */
    getSelect (event) {
      this.getCoin = event;
      this.clearFields();
    },

    /** Очистка полей формы и данных */
    clearFields () {
      this.getInput = this.sendInput = this.errorSendValidate = this.errorGetValidate = null;
    },

    /** Установить max значение в поле */
    setMax () {
      this.sendInput = this.sendCoinAvailable > -1
        ? this.sendCoinAvailable
        : this.sendCoinBalance;
      this.onSendInput();
    },

    /** Валидация формы */
    inputValidate () {
      // Если это продажа токена, то продаём max согласно доступному лимиту (берем с сервера)
      const available = ["kzn", "vng", "srk"].includes(this.sendCoin)
        ? this.sendCoinAvailable
        : this.sendCoinBalance;

      if (this.sendInput > available) {
        this.errorSendValidate = `Max ${available.toLocaleString("en-US", this.$LOCALESTRING(1, 16))}`;
      } else {
        this.errorSendValidate = "";
      }

      if (this.mode === "buy" && this.getInput > this.sale.maxValue) {
        this.errorGetValidate = `Max ${this.sale.maxValue.toLocaleString("en-US", this.$LOCALESTRING(1, 16))}`;
      } else {
        this.errorGetValidate = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
