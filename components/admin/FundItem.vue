<template>
  <section class="balance-info">
    <div class="balance-info__top">
      <div>
        <h3 class="color-white m-b-5">
          {{ tokenName }}
        </h3>
      </div>
      <!--<div class="m-l-a">
        buttons
      </div>-->
    </div>
    <vue-good-table
      v-if="rounds"
      :columns="columns"
      :rows="rounds"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <template v-if="props.column.field === 'label'">
          <span class="fund-item-color" :style="props.row.style" />
          <b>{{ props.row.label }}</b>
          <span v-if="props.row.isCurrent" class="color-gray m-l-5 font-size-12">&mdash; Активный</span>
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
          ${{ props.row.priceUsd.toLocaleString($i18n.locale, $LOCALESTRING(0, 2)) }}
        </template>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>

    <!-- Окно с переводом средств между фондами -->
    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
     <fund-swap
       :input-fund="selectedFund"
       :funds="rounds"
     />
    </ui-modal>
  </section>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import FundSwap from "./FundSwap";

export default {
  name: "FundItem",
  components: { FundSwap, VueGoodTable },
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
          width: "15%",
          sortable: true
        },
        {
          label: "Всего",
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
      ],
      colors: {
        pre_sale: "#bfea44",
        IDO: "#f0c149",
        owner_fund: "#51eca1",
        reward_fund: "#629cf2",
        public_sale: "#fff"
      }
    };
  },
  computed: {
    rounds () {
      return this.sale
        .sort((a, b) => a.round > b.round ? 1 : -1)
        .map((item) => {
          const e = {...item};
          e.label = this.$nameRoundByType(item.type);
          e.percent = item.maxValue / this.totalSupply;
          e.color = this.colors[item.type];
          e.style = { backgroundColor: this.colors[item.type] };
          e.percent = item.maxValue / this.totalSupply;
          return e;
        });
    },
    symbol () {
      return this.sale?.symbol ?? "";
    },
    /* Активный этап продаж */
    currentSale () {
      return this.sale.find(x => x.isCurrent);
    },
    priceUsd () {
      return this.currentSale?.priceUsd ?? 0;
    },
    tokenName () {
      return this.currentSale?.name ?? "";
    },
    totalSupply () {
      return this.sale.map(x => x.maxValue).reduce((a, b) => a + b, 0);
    },
    /* Чисто для вывода на фронте */
    totalSupplyView () {
      const total = this.sale.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.maxValue).reduce((a, b) => a + b, 0);
      const value = this.rounds.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.v).reduce((a, b) => a + b, 0)
      return total - value;
    },
  },
  methods: {
    /** Клик по строке таблицы
     *  Открывается модального окна с карточкой пользователя
     */
    onRowClick (params) {
      this.selectedFund = params.row;
      this.showModal = true;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.selectedFund = null;
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
