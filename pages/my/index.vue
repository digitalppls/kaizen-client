<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" />
    <balance-info-token
      symbol="kzn"
      :sale="sales.filter(x => x.symbol === 'kzn')"
      class="m-b-20"
    />
    <balance-info-token
      symbol="vng"
      :sale="sales.filter(x => x.symbol === 'vng')"
      class="m-b-20"
    />
    <balance-info-token
      symbol="srk"
      :sale="sales.filter(x => x.symbol === 'srk')"
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
      this.sales = sales?.list ?? [];
    });

    this.$API.UserWalletWithdrawalList((r) => {
      this.$store.commit("setWithdrawalList", r);
    })
  }
};
</script>

<style scoped>

</style>
