<template>
  <div>
   <!-- <h2 class="color-white">
      Изменить баланс пользователя
    </h2>-->

    <div class="m-b-5">
      Выберите валюту
    </div>
    <ui-check
      v-for="token in tokens"
      :key="token"
      :checked="symbol === token"
      :value="token"
      inline
      name="token"
      type="radio"
      class="m-b-20 m-r-20 text-uppercase"
      @change="onChangeSymbol(token)"
    >
      {{ token }}
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
        step="0.01"
        :disabled="!symbol"
        :value="field"
        @input="inputValidate"
      >
        <template
          #append
          v-if="label === 'amount'"
        >
          <div class="display-flex ai--center">
            <div class="text-uppercase m-r-10">
              {{ symbol }}
            </div>
          </div>
        </template>
      </ui-text-field>
      <p v-if="errors[label]" class="error-text m-t-5 font-300" v-html="errors[label]" />
    </div>

    <button
      class="btn btn-full"
      :class="['btn', 'btn-medium', 'text-uppercase', {'kzn': 'btn-blue', 'vng': 'btn-yellow', 'srk': 'btn-red'}[symbol]]"
      :disabled="loading || !fields.amount || !symbol"
      @click="updateBalance"
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
      <template v-else-if="fields.amount < 0">
        Списать
      </template>
      <template v-else>
        Начислить
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
import UiCheck from "../ui/ui-check.global";
import UiTextField from "../ui/ui-text-field.global";
import UiIconDone from "../ui/ui-icon-done.global";
import UiPreloader from "../ui/ui-preloader.global";

export default {
  name: "UpdateUserBalance",
  components: { UiCheck, UiTextField, UiIconDone, UiPreloader },
  props: {
    userId: {
      type: String,
      required: true,
      default: ""
    }
  },
  data () {
    return {
      done: false,
      loading: false,
      errors: [],
      tokens: ["kzn", "vng", "srk"],
      symbol: "",
      fields: {
        amount: 0
      }
    };
  },
  computed: {},
  methods: {
    updateBalance () {
      const params = {
        symbol: this.symbol,
        userId: this.userId,
        ...this.fields
      };

      const type = this.fields.amount > 0 ? "начислить пользователю" : "списать с пользователя";
      const confirmMsg = `Уверены что хотите ${type} ${this.fields.amount} ${this.symbol.toUpperCase()}?`;

      if (confirm(confirmMsg)) {
        this.loading = true;
        this.$API.TokenUpdateBalance(params, (r) => {
          this.exchangeSuccess(r);
        }, (e) => {
          console.error("[TokenUpdateBalance]", e);
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

    /** Изменение токена */
    onChangeSymbol (symbol = "") {
      this.errors = {};
      this.symbol = symbol;
      this.fields.amount = 0;
    },

    /** Сброс полей */
    resetFields () {
      this.fields.amount = 0;
    },

    /** Валидация форм */
    inputValidate () {
      this.errors = {};
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
      this.$emit("complete", r);
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
