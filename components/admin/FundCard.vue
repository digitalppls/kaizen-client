<template>
  <div v-if="selectedFund" class="font-300">
    <h2 class="color-white">
      {{ selectedFund.name }}
      <span style="font-size: .8em; font-weight: 400;">
        &mdash;
        <span :style="{color: $RoundColors[selectedFund.type]}">{{ selectedFund.label }}</span>
      </span>
    </h2>

    <div
      v-for="(field, label, key) in paramsFieldsCurrentSale"
      :key="key"
      class="m-b-20"
    >
      <ui-check
        v-if="typeof field === 'boolean'"
        v-model="paramsFieldsCurrentSale[label]"
        :checked="field"
        :value="field"
      >
        {{ fieldName(label) }}
      </ui-check>
      <template v-else>
        <div class="m-b-5">{{ fieldName(label) }}</div>
        <ui-text-field
          v-model="paramsFieldsCurrentSale[label]"
          :value="field"
          @input="errors = []"
        >
          <template #prepend v-if="label === 'priceUsd'">
            $
          </template>
        </ui-text-field>
      </template>
    </div>

    <button
      class="btn btn-full"
      :class="['btn', 'btn-medium', 'text-uppercase', {'btn-blue': selectedFund.symbol === 'kzn'}, {'btn-yellow': selectedFund.symbol === 'vng'}, {'btn-red': selectedFund.symbol === 'srk'}]"
      :disabled="loading"
      @click="saveSale"
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
        Сохарнить
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
  <div v-else class="text-center">
    Нет данных
  </div>
</template>

<script>
import UiPreloader from "../ui/ui-preloader.global";
import UiIcon from "../ui/ui-icon.global";
import UiIconDone from "../ui/ui-icon-done.global";
import UiCheck from "../ui/ui-check.global";
import UiSelect from "../ui/ui-select.global";
import UiTextField from "../ui/ui-text-field.global";

export default {
  name: "FundCard",
  components: { UiTextField, UiSelect, UiCheck, UiIconDone, UiIcon, UiPreloader },
  props: {
    selectedFund: {
      type: Object,
      required: false,
      default () {
        return {};
      }
    },
    funds: {
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
      errors: [],
      paramsFieldsCurrentSale: {} // сюда записываются поля для передачи в API для сохранения
    };
  },
  computed: {
    currentSale () {
      return this.funds.find(x => x.isCurrent);
    }
  },
  mounted () {
    this.paramsFieldsCurrentSale = Object.keys(this.selectedFund)
      .filter((attr) => {
        if (["reward_fund", "owner_fund"].includes(this.selectedFund.type)) {
          return ["maxValue"].includes(attr);
        }
        return ["isCurrent", "name", "maxValue", "holdDays", "priceUsd"].includes(attr);
      })
      .reduce((obj, key) => {
        obj[key] = this.selectedFund[key];
        return obj;
      }, {});
  },
  methods: {
    /** Сохранить настройки */
    saveSale () {
      const params = {
        _id: this.selectedFund._id,
        // symbol: this.selectedFund.symbol,
        ...this.paramsFieldsCurrentSale
      };
      params.priceUsd = +params.priceUsd;
      params.maxValue = +params.maxValue;
      console.log("save sale", params);
      this.loading = true;
      this.$API.TokenSaleSave(params, (r) => {
        this.loading = false;
        this.done = true;
        this.$nuxt.$emit("update-fund", r.list); // Фоном обновляем данные
        setTimeout(() => {
          this.done = false;
          this.$emit("updated"); // закрываем окно
        }, 1000);
      }, (e) => {
        this.loading = false;
        this.errors = Array.isArray(e?.message)
          ? e?.message
          : [this.$t(e.message.toUpperCase())];
        console.log("[TokenSaleSave]", e);
      });
    },

    /**
     * По ключу Label выдать человекопонятное название
     * @param key String - кодовое имя параметра
     * @return String - название на русском
     */
    fieldName (key) {
      switch (key) {
        case "label":
          return "Название фонда";
        case "name":
          return "Название";
        case "holdDays":
          return "Сколько дней нельзя выводить";
        case "priceUsd":
          return "Цена";
        case "isCurrent":
          return "Сделать активным";
        case "maxValue":
          return "Выделено";
        default :
          return key;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
