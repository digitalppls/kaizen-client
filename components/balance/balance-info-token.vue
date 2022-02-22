<template>
  <div class="balance-info">
    <div class="balance-info__top">
      <p class="font-bold m-r-5">
        {{ $t("TOKENS") }}
      </p>
      <p class=" m-r-5">
        {{ tokenName }}
      </p>
      <p class="font-bold m-r-10">
        {{ symbol.toUpperCase() }}
      </p>
      <p class="font-light">
        {{ $t("PRICE") }} ≈ ${{ priceUsd }}
      </p>
      <div class="m-l-a">
        <button
          :disabled="!balance"
          class="btn btn-solid btn-small"
          @click="openModal('buy')"
        >
          {{ $t("BUY") }}
        </button>
        <button
          disabled
          class="btn btn-solid--secondary btn-small"
          @click="openModal('sell')"
        >
          {{ $t("SELL") }}
        </button>
      </div>
    </div>
    <div class="m-b-20">
      <p>Available</p>
      {{ available.toLocaleString() }} {{ symbol.toUpperCase() }}
    </div>
    <div>
      {{ $t("BALANCE") }}:
    </div>
    <span class="font-size-30 font-bold">
      {{ balance.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO()) }}
      <span class="font-medium font-size-14">{{ symbol.toUpperCase() }}</span>
    </span>
    <small class="color-gray">
      ≈ ${{ $toUsd(symbol.toUpperCase(), balance).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
    </small>

    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
      <!--      <h2 class="modal-title m-b-40">-->
      <!--        {{ $t(modal.toUpperCase()) }} {{ symbol.toUpperCase() }}-->
      <!--      </h2>-->

      <token-swap :input-currency="symbol.toUpperCase()" type="token" :mode="modal" />
    </ui-modal>
  </div>
</template>

<script>
export default {
  name: "BalanceInfoToken",
  props: {
    symbol: {
      default: "",
      type: String
    }
  },
  data () {
    return {
      sale: null,
      showModal: false,
      modal: ""
    };
  },
  computed: {
    tokenName () {
      return this.sale?.name ?? "";
    },
    priceUsd () {
      return this.sale?.priceUsd ?? 0;
    },
    available () {
      return ((this.sale?.maxValue ?? 0) - (this.sale?.value ?? 0));
    },
    balance () {
      return this.$store.getters.wallets.find(e => e.symbol === this.symbol)?.amount ?? 0;
    }
  },
  mounted () {
    this.$API.TokenSaleList(this.symbol, (sale) => {
      this.sale = !sale?.list ? null : sale.list.find(x => x.isCurrent === true);
    });
  },
  methods: {
    /** Открыть модальное окно */
    openModal (modal) {
      this.showModal = true;
      this.modal = modal;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.modal = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/balance-info.scss";
</style>
