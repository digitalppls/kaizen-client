<template>
  <div class="buy-index">
    <ui-preloader v-if="loading" center="true" />

    <vue-good-table
      v-else
      :rows="rows"
      :columns="columns"
      style-class="vgt-table vgt-table--dark"
      compact-mode
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'name'">
          <nuxt-link :to="localePath({ name: 'my-indexes-id', params: { id: getIndexName(props.row.name) } })">
            <strong>
              {{ getIndexName(props.row.name) }}
            </strong>
          </nuxt-link>
        </div>
        <div v-else-if="props.column.field == 'marketcap'">
          {{ getMarketCap(props.row.name).toLocaleString("en-US", $LOCALESTRING_USD(0, 0)) }}
        </div>
        <div v-else-if="props.column.field == 'price'" class="font-medium">
          {{ props.row.price.toLocaleString("en-US", $LOCALESTRING_USD(3, 4)) }}
        </div>
        <div v-else-if="props.column.field == 'day'" :class="(props.row.day / props.row.price) > 0 ? 'color-primary' : 'color-error'">
          <span v-if="(props.row.day / props.row.price) > 0" v-text="'+'" />
          {{ (props.row.day / props.row.price).toLocaleString("en-US", $LOCALESTRING_PERCENT()) }}
        </div>
        <div v-else-if="props.column.field == 'week'" :class="(props.row.week / props.row.price) > 0 ? 'color-primary' : 'color-error'">
          <span v-if="(props.row.week / props.row.price) > 0" v-text="'+'" />
          {{ (props.row.week / props.row.price).toLocaleString("en-US", $LOCALESTRING_PERCENT()) }}
        </div>
        <div v-else-if="props.column.field == 'month'" :class="(props.row.month / props.row.price) > 0 ? 'color-primary' : 'color-error'">
          <span v-if="(props.row.month / props.row.price) > 0" v-text="'+'" />
          {{ (props.row.month / props.row.price).toLocaleString("en-US", $LOCALESTRING_PERCENT()) }}
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
import UiPreloader from "~/components/ui/ui-preloader.global";

export default {
  name: "AllIndexes",
  components: { UiPreloader, VueGoodTable },
  data () {
    return {
      rows: [],
      marketcaps: [],
      loading: true,
      columns: [
        {
          label: this.$t("NAME"),
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
          label: this.$t("PRICE"),
          field: "price",
          width: "16%",
          sortable: true
        },
        {
          label: `1 ${this.$t("DAY")}`,
          field: "day",
          width: "16%",
          sortable: true
        },
        {
          label: `1 ${this.$t("WEEK")}`,
          field: "week",
          width: "16%",
          sortable: true
        },
        {
          label: `1 ${this.$t("MONTH")}`,
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
    }
  },
  async mounted () {
    this.currencies.forEach((index) => {
      this.rows.push({
        name: index.symbol,
        price: index.price,
        marketcap: 0,
        day: 0,
        week: 0,
        month: 0
      });
    });

    await Promise.all(this.rows.map(this.getChangeRate));

    this.$API.getCurrencyMarketCap({ symbols: this.rows.map(e => e.name).join(",") }, (r) => {
      this.marketcaps = r;
      this.loading = false;
    });
  },
  methods: {
    /** Получаем название символа без 'USDT' */
    getIndexName (index) {
      return index ? index.split("USDT")[0] : "";
    },

    getMarketCap (symbol) {
      return this.marketcaps.find(e => e.symbol === symbol)?.value ?? this.$t("N/A");
    },

    /** Получаем изменение цены в USD за последние {d} дней */
    async getChangeRate (item, index) {
      const ourDate = new Date();

      this.$API.getCurrencyHistory({
        symbol: item.name,
        fromTimestamp: ourDate.setDate(ourDate.getDate() - 1)
      }, (r) => {
        item.day = r[r.length - 1].price - r[0].price;
      });

      this.$API.getCurrencyHistory({
        symbol: item.name,
        fromTimestamp: ourDate.setDate(ourDate.getDate() - 7)
      }, (r) => {
        item.week = (r[r.length - 1].price - r[0].price);
      });

      this.$API.getCurrencyHistory({
        symbol: item.name,
        fromTimestamp: ourDate.setDate(ourDate.getDate() - 30)
      }, (r) => {
        item.month = (r[r.length - 1].price - r[0].price);
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      this.loading = false;
      return item;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
