<template>
  <div class="cabinet-history">
    <h2 class="title">
      {{ $t("OPERATIONS") }}
    </h2>
    <ui-select
      v-model="type"
      :options="types"
      class="m-b-20"
      style="max-width: 400px"
      @input="select"
    >
      <template #selected="{ option }">
        {{ $t(option.label) }}
      </template>
      <template #default="{ option }">
        {{ $t(option.label) }}
      </template>
    </ui-select>
    <ui-preloader v-if="loading" center="true" />
    <div v-else-if="transactions.length" class="cabinet-history__body">
      <vue-good-table
        v-if="transactions"
        :columns="columns"
        :rows="transactions"
        style-class="vgt-table vgt-table--dark"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [5, 10, 15],
          dropdownAllowAll: true,
          setCurrentPage: 1,
          nextLabel: '',
          prevLabel: '',
          rowsPerPageLabel: $t('ROWSPERPAGELABEL'),
          ofLabel: $t('OF').toLowerCase(),
          pageLabel: 'page', // for 'pages' mode
          allLabel: $t('ALL'),
        }"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'date'">
            {{ $DateText(props.row.date) }}, {{ $TimeText(props.row.date) }}
          </div>
          <div v-else-if="props.column.field === 'type'">
            {{ $t(`OPERATION_${props.row.type.toUpperCase()}`) }}
            <strong v-if="props.row.type === 'package_buy'">
              {{ getPackageName(props.row.targetId) }}
            </strong>
            <strong v-if="props.row.type === 'package_farming'">
              {{ getUserPackageName(props.row.targetId) }}
            </strong>
            <strong
              v-if="props.row.type === 'product_buy' || props.row.type === 'product_buy_bonus'"
              style="text-transform: capitalize;"
            >
              {{ getUserProductName(props.row.targetId) }}
            </strong>
          </div>
          <div v-else-if="props.column.field === 'amount'">
            <div style="font-weight: 500;">
              {{ props.row.amount.toLocaleString(undefined, $LOCALESTRING_CRYPTO) }} {{
                props.row.symbol.toUpperCase()
              }}
            </div>
            <div class="color-gray-light small">
              ≈ {{ props.row.amountUsd.toLocaleString(undefined, $LOCALESTRING_USD()) }}
            </div>
            <div class="color-gray small">
              ≈ {{ $toUsd(props.row.symbol, props.row.amount).toLocaleString(undefined, $LOCALESTRING_USD()) }}
              {{ $t("AT_CURRENT_RATE").toLowerCase() }}
            </div>
          </div>
          <div v-else>
            {{ props.formattedRow[props.column.field] }}
          </div>
        </template>
        <div slot="emptystate" class="text-center">
          {{ $t("NO_DATA") }}
        </div>
      </vue-good-table>
    </div>
    <div v-else class="text-center" style="padding: 30px;">
      {{ $t("NO_DATA") }}
    </div>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "PageOperations",
  components: { VueGoodTable },
  data () {
    return {
      transactions: [],
      limit: 1000,
      offset: 0,
      page: 1,
      type: {
        label: "OPERATION_ALL",
        value: "all"
      },
      loading: true,
      columns: [
        {
          label: this.$t("DATE"),
          field: "date",
          width: "25%",
          thClass: "min-width-150",
          sortable: true
        },
        {
          label: this.$t("TYPE"),
          field: "type",
          width: "45%",
          thClass: "min-width-180",
          sortable: false
        },
        {
          label: this.$t("AMOUNT"),
          field: "amount",
          width: "30%",
          thClass: "min-width-180",
          sortable: false
        }
      ]
    };
  },

  computed: {
    types () {
      return [
        "all",
        "payment",
        "withdraw",
        "token_swap"
      ].map((e) => {
        return {
          label: `OPERATION_${e.toUpperCase()}`,
          value: e
        };
      });
    }
  },

  mounted () {
    this.getTransactions();
  },

  methods: {
    /** Загрузить транзакции по select'у */
    select () {
      this.getTransactions();
    },

    /** Получить транзакции */
    getTransactions () {
      this.loading = true;
      const params = {
        offset: this.offset,
        limit: this.limit,
        type: this.type.value
      };
      this.$API.OperationList(params, (response) => {
        this.loading = false;
        this.transactions = response.operations;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cabinet-history {
  &__top {
    margin-bottom: 40px;

    @include respond-before("md") {
      display: flex;
      align-items: center;
    }

    &-left {
      @include respond-before("md") {
        width: 100%;
        max-width: 300px;
      }
    }

    &-right {
      @include respond-before("md") {
        flex: 1;
      }
    }
  }
}
</style>
