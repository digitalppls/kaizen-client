<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" :sales="sales" />
    <balance-info-token symbol="kzn" class="m-b-20" :sale="sales.find(x => x.symbol==='kzn' && x.isCurrent === true)" />
    <balance-info-token symbol="vng" class="m-b-20" :sale="sales.find(x => x.symbol==='vng' && x.isCurrent === true)" />
    <balance-info-token symbol="srk" class="m-b-20" :sale="sales.find(x => x.symbol==='srk' && x.isCurrent === true)" />
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
