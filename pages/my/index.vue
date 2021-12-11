<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" />
    <balance-info-token-kzn class="m-b-20" />
    <balance-info-token-vng class="m-b-20" />
    <portfolio-indexes />
  </div>
</template>

<script>
import BalanceInfo from "~/components/balance/balance-info";
import BalanceInfoTokenKzn from "~/components/balance/balance-info-token-kzn";
import PortfolioIndexes from "~/components/balance/portfolio-indexes";
import BalanceInfoTokenVng from "~/components/balance/balance-info-token-vng";
export default {
  name: "MyIndex",
  components: { BalanceInfoTokenVng, PortfolioIndexes, BalanceInfoTokenKzn, BalanceInfo }
};
</script>

<style scoped>

</style>
