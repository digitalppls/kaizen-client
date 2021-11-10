<template>
  <div class="buy-index">
    <vue-good-table
      :rows="rows"
      :columns="columns"
      compact-mode
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'name'">
          <nuxt-link :to="localePath({ name: 'my-indexes-id', params: { id: getIndexName(props.row.symbol) } })">
            <strong>
              {{ getIndexName(props.row.symbol) }}
            </strong>
          </nuxt-link>
        </div>
        <div v-if="props.column.field == 'price'" class="font-medium">
          {{ props.row.price.toLocaleString("en-US", $LOCALESTRING_USD()) }}
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
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "AllIndexes",
  components: { VueGoodTable },
  data () {
    return {
      loading: false,
      columns: [
        {
          label: "Name",
          field: "name",
          width: "20%",
          sortable: false
        },
        {
          label: "Market Cap",
          field: "marketcap",
          width: "16%",
          sortable: true
        },
        {
          label: "Price",
          field: "price",
          width: "16%",
          sortable: true
        },
        {
          label: "1 Day",
          field: "day",
          width: "16%",
          sortable: true
        },
        {
          label: "1 Week",
          field: "week",
          width: "16%",
          sortable: true
        },
        {
          label: "1 Month",
          field: "month",
          width: "16%",
          sortable: true
        }
      ]
    };
  },
  computed: {
    currencies () {
      return this.$store.getters.currency.filter(e => e.index);
      // .map(i => [`${i.symbol.split("USDT")[0]}/USDT`, i.price, i.index]);
    },
    rows () {
      return this.currencies;
    }
  },
  methods: {
    getIndexName (index) {
      return index.split("USDT")[0];
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
