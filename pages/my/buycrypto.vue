<template>
  <div class="container">
    <h1 class="title">
      {{ $t("BUY_CRYPTO") }}
    </h1>

    <ul v-if="wallets.length" class="list m-b-20">
      <li
        v-for="(wallet, idx) in wallets"
        :key="idx"
      >
        <strong>{{ wallet.symbol.toUpperCase() }}:</strong>
        <span style="font-weight: 500;">
          {{ wallet.amount.toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
        </span>
        <small class="color-gray">
          ≈ ${{ $toUsd(wallet.symbol, wallet.amount).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
        </small>
      </li>
    </ul>

    <token-swap />
  </div>
</template>

<script>

import TokenSwap from "~/components/token-swap";
export default {
  name: "Swap",
  components: { TokenSwap },
  middleware: ["verify"],
  data () {
    return {
      coin: "ZLWUSDT"
    };
  },
  computed: {
    balance () {
      return this.$store.getters.wallets.filter(e => e.symbol === this.coin)[0]?.amount || 0;
    },

    wallets () {
      return this.$store.getters.wallets || [];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
