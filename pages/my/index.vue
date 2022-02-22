<template>
  <div class="cabinet-index">
    <balance-info class="m-b-20" />
    <balance-info-token symbol="kzn" class="m-b-20" />
    <balance-info-token symbol="vng" class="m-b-20" />
    <balance-info-token symbol="srk" class="m-b-20" />
    <portfolio-indexes />
  </div>
</template>

<script>
import BalanceInfo from "~/components/balance/balance-info";
import BalanceInfoToken from "~/components/balance/balance-info-token";
import PortfolioIndexes from "~/components/balance/portfolio-indexes";
export default {
  name: "MyIndex",
  components: { PortfolioIndexes, BalanceInfoToken, BalanceInfo }
};
</script>

<style scoped>

</style>
