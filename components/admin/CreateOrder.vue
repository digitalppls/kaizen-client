<template>
  <div>
    <h2 class="color-white">
      {{ $t(order ? "EDIT_LIMIT_ORDER" : "NEW_LIMIT_ORDER") }}
      <span
        class="color-success"
        v-text="$t(`FOR_${direction.toUpperCase()}`)"
      />
    </h2>
    <div v-if="order" class="font-500" style="margin-top: -15px; margin-bottom: 25px;">
      {{ $t("LIMIT_ORDER") }} ID: {{ order._id }}
    </div>

    <ui-check
      v-for="wallet in wallets"
      :key="wallet._id"
      :checked="symbol === wallet.symbol"
      :value="wallet.symbol"
      inline
      name="token"
      type="radio"
      class="m-b-20 m-r-20 text-uppercase"
      @change="onChangeSymbol(wallet.symbol, wallet.amount)"
    >
      {{ wallet.symbol }}
    </ui-check>
    <div
      v-for="(field, label, key) in fields"
      :key="key"
      class="m-b-20"
    >
      <div class="m-b-5">
        {{ $t(label.toUpperCase()) }}
      </div>
      <ui-text-field
        v-model.number="fields[label]"
        type="number"
        min="0"
        step="0.01"
        :value="field"
        @input="inputValidate"
      >
        <template
          #prepend
          v-if="label === 'priceUsd'"
        >
          $
        </template>
        <template
          #append
          v-if="label === 'amount'"
        >
          <div class="display-flex ai--center">
            <div class="text-uppercase m-r-10">
              {{ symbol }}
            </div>
            <button
              v-if="direction === 'sell'"
              class="btn btn-small"
              style="color: #fff;"
              @click="setMax"
            >
              {{ $t("ALL") }}
            </button>
          </div>
        </template>
      </ui-text-field>
      <div v-if="direction === 'sell' && label === 'priceUsd' && recommendedPrice && errors[label]" class="font-300 m-t-5">
        {{ $t("RECOMMENDED_PRICE") }}: ${{ recommendedPrice }}
      </div>
      <p v-if="errors[label]" class="error-text m-t-5 font-300" v-html="errors[label]" />
    </div>

    <div class="m-b-20">
      <div class="m-b-5">{{ $t(direction === 'sell' ? "I_WILL_GET" : "I_WILL_PAY") }}</div>
      <ui-text-field
        :value="fields.amount * fields.priceUsd"
        :disabled="true"
      >
        <template #prepend>
          $
        </template>
      </ui-text-field>
    </div>

    <button
      class="btn btn-full"
      :class="['btn', 'btn-medium', 'text-uppercase', {'kzn': 'btn-blue', 'vng': 'btn-yellow', 'srk': 'btn-red'}[symbol]]"
      :disabled="loading || !fields.amount || !fields.priceUsd || (direction === 'sell' && fields.amount > tokenBalance)"
      @click="updateOrder"
    >
      <ui-preloader
        v-if="loading"
        size="small"
        color="white"
      />
      <ui-icon-done
        v-else-if="done"
        fill="#141517"
      />
      <template v-else>
        {{ $t(order ? "SAVE" : "ADD") }}
      </template>
    </button>

    <!-- Ошибки -->
    <ul
      v-if="errors.length"
      class="list list--none m-t-20"
    >
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="error-text m-b-5"
        v-html="error"
      />
    </ul>
  </div>
</template>

<script>
import UiPreloader from "../ui/ui-preloader.global";
import UiIconDone from "../ui/ui-icon-done.global";
import UiTextField from "../ui/ui-text-field.global";
import UiCheck from "../ui/ui-check.global";

export default {
  name: "CreateOrder",
  components: { UiCheck, UiTextField, UiIconDone, UiPreloader },
  props: {
    direction: {
      type: String,
      required: true,
      default: "sell",
      validator (value) {
        return ["sell", "buy"].includes(value);
      }
    },
    order: {
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
      errors: [],
      symbol: "",
      recommendedPrice: 0,
      fields: {
        amount: 0,
        priceUsd: 0
      }
    };
  },
  computed: {
    wallets () {
      const wallets = this.$store.getters.wallets;
      return wallets.filter(w => ["kzn", "vng", "srk"].includes(w.symbol));
    },
    tokenBalance () {
      const balance = this.wallets.find(x => x.symbol === this.symbol)?.amount || 0;
      // Если это редактирование ордера, то в качестве доступного баланса делаем сумму из зарезервированных средств для ордера и свободных
      return this.order
        ? balance + this.order.amount
        : balance;
    },
    /** Текущий курс токена: берем из списка currency */
    currentRate () {
      return this.$store.getters.currency.find(x => x.symbol === this.$symbolCurrencyAddUsdt(this.symbol))?.price ?? 0;
    }
  },
  mounted () {
    const symbol = this.order ? this.order.symbol : this.wallets[0].symbol;
    const amount = this.order ? this.order.amount : this.wallets[0].amount;
    this.onChangeSymbol(symbol, amount);
    this.loadAllOrders();
  },
  methods: {
    /** Обновить/Добавить ордер */
    updateOrder () {
      const fields = {
        userId: this.$store.getters.user._id,
        direction: this.direction,
        symbol: this.symbol,
        ...this.fields
      };
      let params = {};

      if (this.order) { // Если объект ордера есть, то редактируем его
        params = {
          _id: this.order._id,
          symbol: this.symbol,
          ...fields
        };
      } else { // иначе считаем что это новый ордер
        params = { ...fields };
      }

      const confirmMsg = `${this.$t("NEW_LIMIT_ORDER")} ${this.$t(`FOR_${this.direction.toUpperCase()}`)}: ${this.fields.amount} ${this.symbol.toUpperCase()}, ${this.$t("PRICE")} $${this.fields.priceUsd}?`;

      if (confirm(confirmMsg)) {
        this.loading = true;
        this.$API.TokenOrderSave(this.direction, params, (r) => {
          this.exchangeSuccess(r);
          this.$emit("complete");
        }, (e) => {
          console.error("[TokenOrderSave]", e);
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

    /** Загружаем все ордера, чтобы определить рекомендуемую цену */
    loadAllOrders () {
      this.$API.TokenOrderListAll((rows) => {
        const minPrice = Math.min(...rows.filter(x => x.direction === "sell" && x.symbol === this.symbol).map(x => x.priceUsd));
        const maxPrice = Math.max(...rows.filter(x => x.direction === "buy" && x.symbol === this.symbol).map(x => x.priceUsd));

        this.recommendedPrice = this.direction === "sell"
          ? minPrice < this.currentRate ? minPrice : this.currentRate
          : maxPrice > this.currentRate ? maxPrice : this.currentRate;
        /*
         * Установили input рекомендуемую цену:
         * Если редактируем ордер - берем из него
         * Если новый ордер - устанавливаем высчитанную
         */
        this.fields.priceUsd = this.order
          ? this.order.priceUsd
          : this.recommendedPrice;
      }, (e) => {
        console.log("[TokenOrderListAll]", e);
        this.loading = false;
        this.errors = Array.isArray(e?.message) ? this.$t(e?.message.toUpperCase()) : [this.$t(e.message.toUpperCase())];
      });
    },

    /** Изменение токена */
    onChangeSymbol (symbol = "", amount = 0) {
      this.errors = {};
      this.symbol = symbol;
      this.fields.amount = amount;
      this.loadAllOrders();
    },

    /** Сброс полей */
    resetFields () {
      this.fields.amount = this.fields.priceUsd = 0;
    },

    /** Валидация форм */
    inputValidate () {
      this.errors = {};
      if (this.direction === "sell" && this.fields.amount > this.tokenBalance) {
        this.errors.amount = `Max ${this.tokenBalance}`;
      }
      if (this.direction === "sell" && this.fields.priceUsd > this.recommendedPrice) {
        this.errors.priceUsd = this.$t("RECOMMENDED_PRICE_WARN");
      }
    },

    /** Установить максимально допустимое значение */
    setMax () {
      this.fields.amount = this.tokenBalance;
      this.inputValidate();
    },

    /** Метод при успешном обмене монет
     * r - объект response
     */
    exchangeSuccess (r) {
      this.loading = false;
      this.done = true;
      console.log(r);
      // this.$store.dispatch("updateUser", r.user);
      setTimeout(() => {
        this.done = false;
        this.resetFields();
      }, 2000);
    }
  }
};
</script>

<style scoped>

</style>
