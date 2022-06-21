<template>
  <div v-if="selectedFund" class="font-300">
    <h2 class="color-white">
      {{ selectedFund.name }}
      <span style="font-size: .8em; font-weight: 400;">
        &mdash;
        <span :style="{color: $RoundColors[selectedFund.type]}">{{ selectedFund.label }}</span>
      </span>
    </h2>

    <!-- Ошибки -->
    <ul
      v-if="errors.length"
      class="list list--none m-b-20"
    >
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="error-text m-b-5"
        v-html="error"
      />
    </ul>

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
        />
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
      required: true,
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
    },
    /** Фильтруем только те параметры, которые можно редактировать */
    editableFieldsCurrentSale: {
      get () {
        return this.currentSale ?
          Object.keys(this.currentSale)
            .filter(attr => ["holdDays", "label", "priceUsd"].includes(attr))
            .reduce((obj, key) => {
              obj[key] = this.currentSale[key];
              return obj;
            }, {}) : {};
      },

      set (value) {
        console.log("set new value", value);
      }
    }
  },
  mounted () {
    this.paramsFieldsCurrentSale = Object.keys(this.selectedFund)
      .filter(attr => ["isCurrent", "holdDays", "label", "priceUsd"].includes(attr))
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
        ...this.paramsFieldsCurrentSale
      };
      this.loading = true;
      this.$API.TokenSaleSave(params, (r) => {
        console.log("save sale", params, r);
        this.loading = false;
        this.done = true;
        this.$nuxt.$emit("update-fund"); // Фоном обновляем данные
        setTimeout(() => (this.done = false), 2000);
      }, (e) => {
        this.loading = false;
        this.errors = Array.isArray(e?.message)
          ? this.$t(e?.message.toUpperCase())
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
          return "Цена, в долларах";
        case "isCurrent":
          return "Сделать активным";
        default :
          return key;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
