<template>
  <div class="buy-crypto">
    <h1 class="title">
      {{ $t("BUY_CRYPTO") }}
    </h1>

    <ul v-if="$isDev && wallets.length" class="list wallet-list m-b-20">
      <li
        v-for="(wallet, idx) in wallets"
        :key="idx"
        class="wallet-list__item"
      >
        <strong class="wallet-list__item-label">{{ wallet.symbol.toUpperCase() }}:</strong>
        <span class="wallet-list__item-value">
          <span style="font-weight: 500;">
            {{ wallet.amount.toLocaleString("en-US", $LOCALESTRING_CRYPTO()) }}
          </span>
          <small class="color-gray">
            ≈ ${{ $toUsd(wallet.symbol, wallet.amount).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
          </small>
        </span>
      </li>
    </ul>

    <token-swap style="max-width: 500px;" />
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
.wallet-list {
  @include respond-before("pre-md") {
    max-width: 320px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin: 0.5em;
    @include fontTTNorms("medium");

    @include respond-to("pre-md") {
      padding-left: 0;

      &:before {
        display: none;
      }
    }

    &-label {
    }

    &-value {
      margin-left: auto;
    }
  }
}
</style>
