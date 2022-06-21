<template>
  <section v-if="currentSale" class="balance-info">
    <!-- Шапка -->
    <div class="balance-info__top">
      <div>
        <h3 class="color-white m-b-5">
          {{ currentSale.name }}
          &mdash;
          <span :style="{color: $RoundColors[currentSale.type], cursor: 'help'}" title="Текущий этап продаж">
            {{ $nameRoundByType(currentSale.type) }}
          </span>
        </h3>
        <div class="text-uppercase">
          {{ currentSale.symbol }}
        </div>
      </div>
    </div>
    <!-- Таблица -->
    <vue-good-table
      v-if="funds"
      :columns="columns"
      :rows="funds"
      class="table-funds"
      @on-row-click="onRowClick"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <template v-if="props.column.field === 'label'">
          <span
            class="fund-item-color"
            :style="props.row.style"
          />
          <b>{{ props.row.label }}</b>
          <span
            v-if="props.row.isCurrent"
            class="color-gray m-l-5 font-size-12"
          >&mdash; Активный
          </span>
        </template>
        <template v-else-if="props.column.field === 'value'">
          {{ props.row.value.toLocaleString($i18n.locale, $LOCALESTRING(0, 2)) }}
        </template>
        <template v-else-if="props.column.field === 'percent'">
          {{ props.row.percent.toLocaleString($i18n.locale, $LOCALESTRING_PERCENT(0, 2)) }}
        </template>
        <template v-else-if="props.column.field === 'maxValue'">
          {{ props.row.maxValue.toLocaleString($i18n.locale, $LOCALESTRING(0, 2)) }}
        </template>
        <template v-else-if="props.column.field === 'priceUsd'">
          <template v-if="props.row.priceUsd">
            ${{ props.row.priceUsd.toLocaleString($i18n.locale, $LOCALESTRING(0, 3)) }}
          </template>
          <template v-else>
            &mdash;
          </template>
        </template>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
    <p class="text-right m-t-5"><small class="font-300">Нажмите на название фонда, чтобы изменить его настройки.</small></p>

    <!-- Окно с переводом средств между фондами -->
    <ui-modal
      v-if="showModal"
      max-width="600px"
      @close="closeModal"
    >
      <fund-card
        :selected-fund="selectedFund"
        :funds="funds"
        @updated="closeModal"
      />
    </ui-modal>
  </section>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import FundSwap from "./FundSwap";
import FundCard from "./FundCard";
import UiModal from "../ui/ui-modal.global";

export default {
  name: "FundItem",
  components: { UiModal, FundCard, FundSwap, VueGoodTable },
  props: {
    sale: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      showModal: false,
      modal: "",
      errors: [],
      loading: false,
      selectedFund: null,
      columns: [
        {
          label: "Название",
          field: "label",
          sortable: false
        },
        {
          label: "Доля",
          field: "percent",
          width: "10%",
          sortable: true
        },
        {
          label: "Цена",
          field: "priceUsd",
          width: "10%",
          sortable: true
        },
        {
          label: "Выделено",
          field: "maxValue",
          width: "15%",
          sortable: true
        },
        {
          label: "Продано",
          field: "value",
          width: "15%",
          sortable: true
        }
      ]
    };
  },
  computed: {
    funds () {
      const funds = this.sale
        .sort((a, b) => a.round > b.round ? 1 : -1)
        .map((item) => {
          const e = { ...item };
          e.label = this.$nameRoundByType(item.type);
          e.percent = item.maxValue / this.totalSupply;
          e.color = this.$RoundColors[item.type];
          e.style = { backgroundColor: this.$RoundColors[item.type] };
          e.percent = item.maxValue / this.totalSupply;
          return e;
        });
      // Считаем ИТОГО
      if (funds.length) {
        funds.push({
          label: "ИТОГО",
          round: 0,
          isCurrent: false,
          type: "check",
          priceUsd: 0,
          color: "#444",
          style: { backgroundColor: "#444" },
          value: funds.map(x => x.value).reduce((a, b) => a + b, 0),
          maxValue: funds.map(x => x.maxValue).reduce((a, b) => a + b, 0),
          percent: funds.map(x => x.percent).reduce((a, b) => a + b, 0)
        });
      }
      return funds;
    },
    symbol () {
      return this.sale?.symbol ?? "";
    },
    /* Активный этап продаж */
    currentSale () {
      return this.funds.find(x => x.isCurrent);
    },
    totalSupply () {
      return this.sale.map(x => x.maxValue).reduce((a, b) => a + b, 0);
    },
    /* Чисто для вывода на фронте */
    totalSupplyView () {
      const total = this.sale.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.maxValue).reduce((a, b) => a + b, 0);
      const value = this.funds.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.v).reduce((a, b) => a + b, 0);
      return total - value;
    }
  },
  methods: {
    /**
     * Клик по строке таблицы
     * Открывается модального окна с карточкой фонда
     *
     * @param params Object объект строки
     */
    onRowClick (params) {
      if (params.row.type === "check") {
        return false;
      }
      this.selectedFund = params.row;
      this.modal = "settings";
      this.showModal = true;
    },

    /**
     * Открыть модальное окно
     *
     * @param modal String ['swap', 'addFund']
     * @param row Object Объект выбранного фонда
     */
    openModal (modal = "swap-fund", row = {}) {
      this.selectedFund = row;
      this.modal = modal;
      this.showModal = true;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = this.selectedFund = this.modal = null;
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
@import "/assets/scss/components/balance-info.scss";

.fund-item {
  //display: flex;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid rgba(#fff, .1);
  text-transform: none;

  &--current {
    border-color: rgba(#fff, .4);
  }

  &-color {
    display: inline-block;
    height: 0.75em;
    width: 0.75em;
    border-radius: 2px;
    margin-right: 0.5em;
  }

  &-title {
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.btn-swap {
  width: 100%;
  padding: 5px;
  text-align: center;
  background: transparent;

  svg {
    height: 20px;
    width: 24px;
    display: block;
    margin: auto;
  }

  &:hover {
    svg path {
      fill: white;
    }
  }
}

/*
// Для последней колонки, где одна кнопку Swap
.table-funds::v-deep {
  tr {
    td:last-child {
      padding: 0;
      position: relative;

      .btn-swap {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }
    }
  }
}*/
</style>
