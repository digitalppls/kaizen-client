<template>
  <div class="token-swap">
    <h2 class="m-b-10 color-white">
      {{ inputFund.name }}
    </h2>
    <div class="m-b-40">
      Попополнить <span :style="{color: $RoundColors[inputFund.type]}">{{ inputFund.label }}</span>
    </div>
    <div class="m-b-20">
      <!-- Доступно -->
      <div style="display: flex;" class="m-b-10">
        <div>
          Из фонда:
        </div>
        <div
          v-if="sendFund"
          class="small m-l-a"
        >
          <span class="font-300">{{ $t("AVAILABLE") }}:</span>
          <span class="font-medium color-white">
            {{ sendFundAvailable.toLocaleString($i18n.locale, $LOCALESTRING(0, 5)) }}
          </span>
          <span class="color-white text-uppercase">
            {{ sendFund.symbol }}
          </span>
        </div>
      </div>
      <!-- С какого фонда попоплняем -->
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
              v-model="sendFund"
              :options="sendFundList"
              style="text-transform: uppercase"
              @input="sendSelect"
            >
              <template #default="{ option }">
                {{ option.label }}
              </template>
            </ui-select>
          </div>
        </template>
      </ui-text-field>
      <p
        v-if="errorSendValidate"
        class="error-text m-t-5 font-300"
        v-html="errorSendValidate"
      />
    </div>

    <!-- Кнопка "ПЕРЕВЕСТИ" -->
    <div class="m-t-20">
      <button
        :class="['btn', 'btn-full', 'btn-medium', 'text-uppercase', {'kzn': 'btn-blue', 'vng': 'btn-yellow', 'srk': 'btn-red'}[inputFund.symbol]]"
        :disabled="loading || !!errorSendValidate || !sendInput"
        @click="onExchange"
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
          Перевести
        </template>
      </button>
    </div>
    <ul
      v-if="errors.length"
      class="list list--none m-t-20"
    >
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

import UiTextField from "../ui/ui-text-field.global";
import UiSelect from "../ui/ui-select.global";
import UiIconDone from "../ui/ui-icon-done.global";
import UiPreloader from "../ui/ui-preloader.global";
export default {
  name: "FundSwap",
  components: { UiPreloader, UiIconDone, UiSelect, UiTextField },
  props: {
    inputFund: { // фонд, который нужно пополнить
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    funds: { // Список фондов
      type: Array,
      required: true,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      done: false,
      loading: false,
      sendInput: "",
      sendFundList: [],
      sendFundAvailable: -1,
      sendFund: "",
      getFund: "",
      errors: [],
      errorSendValidate: "",
    };
  },
  mounted () {
    this.Update();
  },
  methods: {
    /** Устанавливаем значения списков по умолчанию */
    Update () {
      // Список отдаваемых монет
      this.getFund = this.inputFund;
      // Список получаемых монет
      this.sendFundList = this.funds.filter(e => ![this.inputFund.type].includes(e.type));
      this.sendFund = this.sendFundList[0];
      this.sendFundAvailable = this.sendFund.maxValue - this.sendFund.value;
    },

    /** Слушатель события ввода отдаваемых монет */
    onSendInput () {
      this.inputValidate();
    },

    /** Обмен токенов */
    onExchange () {
      const confirmMsg = `Подтверждаете пополнение ${this.inputFund.label} из ${this.sendFund.label} на сумму ${this.sendInput.toLocaleString(this.$i18n.locale, this.$LOCALESTRING(0, 5))} ${this.inputFund.symbol.toUpperCase()}?`;

      if (confirm(confirmMsg)) {
        this.loading = true;
        this.exchangeSuccess();
      }
    },

    /** Метод при успешном обмене монет
     * @param response - объект response
     */
    exchangeSuccess (response) {
      this.loading = false;
      this.done = true;
      setTimeout(() => {
        this.done = false;
        this.clearFields();
        this.Update();
      }, 2000);
    },

    /** Выбор типа отправляемой монеты */
    sendSelect (token) {
      this.sendFund = token;
      this.sendFundAvailable = this.sendFund.maxValue - this.sendFund.value;
      this.clearFields();
    },

    /** Очистка полей формы и данных */
    clearFields () {
      this.sendInput = this.errorSendValidate = null;
    },

    /** Установить max значение в поле */
    setMax () {
      this.sendInput = this.sendFundAvailable;
      this.onSendInput();
    },

    /** Валидация формы */
    inputValidate () {
      this.errorSendValidate = this.sendInput > this.sendFundAvailable
        ? `Max ${this.sendFundAvailable.toLocaleString("en-US", this.$LOCALESTRING(1, 16))}`
        : "";
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>

</style>
