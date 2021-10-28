<template>
  <div class="container">
    <h1 class="title">
      {{ $t("REFILL_BALANCE") }}
    </h1>
    <wallet33
      :method="0"
      only-types="bep20usdt,trc20usdt,bep20btc"
    />
  </div>
</template>

<script>
import Wallet33 from "~/components/wallet33";

export default {
  name: "Deposit",
  components: { Wallet33 },
  middleware: ["verify"]
};
</script>

<style lang="scss" scoped>
</style>
