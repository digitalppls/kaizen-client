<template>
  <div class="portfolio-indexes balance-info">
    <div class="balance-info__top">
      <p class="font-bold">
        {{ $t("PORTFOLIO_YOUR_INDEXES") }}
      </p>
    </div>

    <vue-good-table
      v-if="rows.length"
      :rows="rows"
      :columns="columns"
      style-class="vgt-table"
      compact-mode
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'name'">
          <nuxt-link :to="localePath({ name: 'my-indexes-id', params: { id: getIndexName(props.row.symbol) } })">
            <strong>
              {{ getIndexName(props.row.symbol).toUpperCase() }}
            </strong>
          </nuxt-link>
        </div>
        <div v-if="props.column.field == 'sum'" class="font-medium">
          {{ props.row.amount.toLocaleString("en-US", $LOCALESTRING_USD()) }}
        </div>
        <div v-if="props.column.field == 'withdraw'">
          <button
            :disabled="false"
            class="btn btn-solid"
            style="font-size: 12px; padding: 8px 14px;"
          >
            {{ $t("WITHDRAW") }}
          </button>
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
    <p v-else class="text-center">
      <nuxt-link :to="localePath('my-indexes')" class="btn btn-solid">
        {{ $t("BUY_INDEXES") }}
      </nuxt-link>
    </p>

    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
      <h2 class="modal-title m-b-40">
        {{ $t("WITHDRAW") }} {{ token.toUpperCase() }}
      </h2>
      <p>
        In developing...
      </p>
    </ui-modal>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "PortfolioIndexes",
  components: { VueGoodTable },
  data () {
    return {
      showModal: false,
      token: "",
      loading: false,
      operations: [],
      columns: [
        {
          label: this.$t("NAME"),
          field: "name",
          width: "12%",
          sortable: false
        },
        {
          label: this.$t("DATE"),
          field: "date",
          width: "12%",
          sortable: false
        },
        {
          label: this.$t("SUM"),
          field: "sum",
          width: "13.6%",
          sortable: false
        },
        {
          label: this.$t("STATUS"),
          field: "status",
          width: "13.6%",
          sortable: false
        },
        {
          label: this.$t("FEE"),
          field: "fee",
          width: "6%",
          sortable: false
        },
        {
          label: this.$t("PERFORMANCE"),
          field: "performance",
          width: "13.6%",
          sortable: false
        },
        {
          label: this.$t("TOTAL_AMOUNT"),
          field: "total_amount",
          width: "15.6%",
          sortable: false
        },
        {
          label: this.$t("WITHDRAWAL_REQUEST"),
          field: "withdraw",
          width: "12.5%",
          sortable: false
        }
      ]
    };
  },
  computed: {
    wallets () {
      return this.$store.getters.wallets || [];
    },
    rows () {
      return this.wallets;
    }
  },
  mounted () {

  },
  methods: {
    /** Открыть модальное окно */
    openModal (modal) {
      this.showModal = true;
      this.modal = modal;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.modal = "";
    },

    /** Получить нормальное имя индекса, без USDT */
    getIndexName (index) {
      return index.split("USDT")[0];
    },

    /** Получаем список операций */
    getOperations () {
      this.$API.OperationList({ offset: 0, limit: 1000 }, (r) => {
        this.operations = r;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/balance-info.scss";

.portfolio-indexes {
  border: 0;
}
</style>
