<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" />
    <balance-info-token
      symbol="kzn"
      :sale="sales.find(x => x.symbol==='kzn' && x.isCurrent === true)"
      class="m-b-20"
    />
    <balance-info-token
      symbol="vng"
      :sale="sales.find(x => x.symbol==='vng' && x.isCurrent === true)"
      class="m-b-20"
    />
    <balance-info-token
      symbol="srk"
      :sale="sales.find(x => x.symbol==='srk' && x.isCurrent === true)"
      class="m-b-20"
    />
    <portfolio-indexes />
  </div>
</template>

<script>
import BalanceInfo from "~/components/balance/balance-info";
import BalanceInfoToken from "~/components/balance/balance-info-token";
import PortfolioIndexes from "~/components/balance/portfolio-indexes";

export default {
  name: "MyIndex",
  components: { PortfolioIndexes, BalanceInfoToken, BalanceInfo },
  data () {
    return {
      sales: []
    };
  },
  mounted () {
    this.$API.TokenSaleList("all", (sales) => {
      this.sales = sales.list;
    });
  }
};
</script>

<style scoped>

</style>
