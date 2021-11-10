<template>
  <div class="index-page">
    <div class="index-page__header">
      <div class="index-page__header__l">
        <h1 class="title">
          {{ id }}
        </h1>
      </div>
      <div class="index-page__header__r">
        <button class="btn btn-solid btn-small" @click="openModal('buy')">
          {{ $t("BUY") }}
        </button>
        <button
          class="btn btn-solid btn-small"
          :disabled="disableSell"
          @click="openModal('sell')"
        >
          {{ $t("SELL") }}
        </button>
      </div>
    </div>

    <trading-view
      container-id="tradingview"
      :options="options"
      style="height: 500px;"
    />

    <ui-modal
      v-if="showModal"
      @close="showModal = false"
    >
      <token-swap :prop-index="id" :mode="mode" />
    </ui-modal>
  </div>
</template>

<script>
import TradingView from "~/components/trading-view";
import TokenSwap from "~/components/token-swap";

export default {
  name: "IndexPage",
  components: { TokenSwap, TradingView },
  data () {
    return {
      showModal: false,
      mode: ""
    };
  },
  computed: {
    /** Текущий индекс */
    id () {
      return this.$route.params?.id ?? "";
    },
    /** Формируем символ для графика */
    symbol () {
      if (this.id.toUpperCase() === "BITW") {
        return "FTX:BITWUSD";
      } else if (this.id.toUpperCase() === "CIX100") {
        return "CRYPTOINDEX:CIX100";
      } else if (this.id.toUpperCase() === "DEFI") {
        return "BINANCE:DEFIUSDTPERP";
      } else {
        return "EIGHTCAP:CRYPTO10";
      }
    },
    /** Конфиг графика */
    options () {
      return {
        autosize: true,
        symbol: this.symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: 3,
        locale: this.$i18n.locale,
        toolbar_bg: "#f1f3f6",
        hide_legend: false,
        withdateranges: true,
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false
      };
    },
    /** Блокируем кнопку "Продать" если этой монеты нет в кошельке */
    disableSell () {
      return !this.$store.getters.wallets.find(e => e.symbol.toLowerCase() === this.id.toLowerCase());
    }
  },
  methods: {
    openModal (mode) {
      this.showModal = true;
      this.mode = mode;
    }
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  &__header {
    margin-bottom: 40px;

    @include respond-before("pre-md") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__l {
      padding: 0;

      @include respond-before("pre-md") {
        margin-right: 30px;
      }
    }

    &__r {
      @include respond-before("pre-md") {
        margin-left: auto;
      }
    }

    .title {
      margin-bottom: 20px;

      @include respond-before("pre-md") {
        margin-bottom: 0;
      }
    }
  }
}
</style>
