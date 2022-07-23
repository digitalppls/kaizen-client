<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" />
    <balance-info-token
      v-if="sales.find(x => x.symbol === 'kzn' && x.isCurrent)"
      :sale="sales.filter(x => x.symbol === 'kzn')"
      symbol="kzn"
      class="m-b-20"
    />
    <balance-info-token
      v-if="sales.find(x => x.symbol === 'vng' && x.isCurrent)"
      :sale="sales.filter(x => x.symbol === 'vng')"
      symbol="vng"
      class="m-b-20"
    />
    <balance-info-token
      v-if="sales.find(x => x.symbol === 'srk' && x.isCurrent)"
      :sale="sales.filter(x => x.symbol === 'srk')"
      symbol="srk"
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
