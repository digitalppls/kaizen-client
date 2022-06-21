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
      v-if="funds"
      :columns="columns"
      :rows="funds"
      class="table-funds"
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
        <template v-else-if="props.column.field === 'swap'">
          <button
            title="Пополнить с другого счета"
            class="btn-swap"
            @click.stop="openModal(props.row)"
          >
            <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.99979 4.00014V32.0006H35.9997L36 4.00014H3.99979ZM1.9999 0H38.0001C38.5305 0 39.0394 0.210601 39.4144 0.585938C39.7894 0.96094 40 1.46957 40 1.99989V34.0006C40 34.531 39.7894 35.0396 39.4144 35.4146C39.0394 35.7899 38.5305 36.0005 38.0001 36.0005H1.9999C1.46954 36.0005 0.960606 35.7899 0.585603 35.4146C0.210601 35.0396 0 34.531 0 34.0006V1.99989C0 1.46953 0.210601 0.96094 0.585603 0.585938C0.960606 0.210601 1.46949 0 1.9999 0V0ZM26 7.99993L33.0002 14L26 20V15.9999H18.0001V12.0001H26V7.99993ZM14 28.0006L6.99981 22.0006L14 16.0005V20.0007H21.9999V24.0008L14 24.0005V28.0006Z" fill="#56585F"/>
            </svg>
          </button>
        </template>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
    <p class="text-right m-t-5"><small class="font-300">Кликните на название фонда, чтобы изменить его настройки.</small></p>

    <!-- Окно с переводом средств между фондами -->
    <ui-modal
      v-if="showModal"
      max-width="600px"
      @close="closeModal"
    >
      <fund-swap
        v-if="modal === 'swap'"
        :input-fund="selectedFund"
        :funds="funds"
      />
      <fund-card
        v-else
        :selected-fund="selectedFund"
        :funds="funds"
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
      modal: "", // ["settings", "swap"]
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
        },
        {
          label: "",
          field: "swap",
          width: "5%",
          sortable: false
        }
      ]
    };
  },
  computed: {
    funds () {
      return this.sale
        .sort((a, b) => a.round > b.round ? 1 : -1)
        .map((item) => {
          const e = {...item};
          e.label = this.$nameRoundByType(item.type);
          e.percent = item.maxValue / this.totalSupply;
          e.color = this.$RoundColors[item.type];
          e.style = { backgroundColor: this.$RoundColors[item.type] };
          e.percent = item.maxValue / this.totalSupply;
          return e;
        });
    },
    symbol () {
      return this.sale?.symbol ?? "";
    },
    /* Активный этап продаж */
    currentSale: {
      get () {
        return this.funds.find(x => x.isCurrent);
      },
      set (value) {
        console.log("set current sale", value);
      }
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
      const value = this.funds.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.v).reduce((a, b) => a + b, 0)
      return total - value;
    },
  },
  methods: {
    /** Клик по строке таблицы
     *  Открывается модального окна с карточкой пользователя
     */
    onRowClick (params) {
      this.selectedFund = params.row;
      this.modal = "settings";
      this.showModal = true;
    },
    openModal (row) {
      this.selectedFund = row;
      this.modal = "swap";
      this.showModal = true;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = this.selectedFund = this.modal = null;
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
}
</style>
