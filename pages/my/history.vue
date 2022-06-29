<template>
  <div class="cabinet-history">
    <h2 class="color-white">
      {{ $t("OPERATIONS") }}
    </h2>

    <div class="m-t-40">
      <transactions
        :rows="rows"
        :loading="loading"
        :total-records="rows.length"
        :wallets="$store.getters.user.wallets"
        @transactions-filter="onFilter"
      />
    </div>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import Transactions from "../../components/transactions";

export default {
  name: "PageHistory",
  components: { Transactions, VueGoodTable },
  data () {
    return {
      rows: [],
      limit: 1000,
      offset: 0,
      loading: false
    };
  },

  mounted () {
    this.loadOperations();
  },

  methods: {
    /** Загрузить транзакции по фильтру */
    onFilter (filters) {
      console.log("on-filter", filters);
      this.loadOperations(filters);
    },

    /** Получить транзакции */
    loadOperations () {
      this.loading = true;
      const filters = { ...arguments }[0];
      console.log(filters);
      const params = {
        offset: this.offset,
        limit: this.limit,
        type: filters?.type?.value ?? "all"
      };
      if (filters && Object.prototype.hasOwnProperty.call(filters, "symbol") && !!filters.symbol && !["токен", "token"].includes(filters.symbol.toLowerCase())) {
        params.symbol = filters.symbol;
      }
      this.$API.OperationList(params, (response) => {
        this.loading = false;
        this.rows = response.operations;
      });
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
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

  a:hover {
    color: white;
  }
}
</style>
