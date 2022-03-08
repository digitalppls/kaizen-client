<template>
  <section :id="symbol" class="balance-info">
    <div class="balance-info__top">
      <div>
        <h3 class="color-white m-b-5">
          {{ $t("TOKENS") }}

          {{ tokenName }}

          {{ symbol.toUpperCase() }}
        </h3>
      </div>
      <div class="m-l-a">
        <button
          :class="['btn', {'btn-blue': symbol === 'kzn'}, {'btn-yellow': symbol === 'vng'}, {'btn-red': symbol === 'srk'}]"
          @click="openModal('buy')"
        >
          {{ $t("BUY") }}
        </button>
        <button
          disabled
          class="btn btn-solid--secondary btn-small btn_set-opacity"
          @click="openModal('sell')"
        >
          {{ $t("SELL") }}
        </button>
      </div>
    </div>
    <div class="user-wallets-box">
      <div class="user-wallets-box__left">
        <div class="m-b-40">
          <p class="m-b-10 accessed-value">
            {{ $t("PRICE") }}:
          </p>
          <span class="price">${{ priceUsd }}</span>
        </div>
        <div class="m-b-20">
          <p class="m-b-5 accessed-value">
            {{ $t("AVAILABLE") }}:
          </p>
          <span class="color-white font-bold font-size-24">
            {{ available.toLocaleString() }} {{ symbol.toUpperCase() }}
          </span>
        </div>
        <div class="m-b-10 accessed-value">
          {{ $t("BALANCE") }}:
        </div>
        <span class="font-size-24 font-bold color-white m-r-5">
          {{ balance.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO()) }}
          <span class="font-medium">{{ symbol.toUpperCase() }}</span>
        </span>
        <small class="color-white font-size-14">
          <span class="m-r-5">~</span>
          ${{ $toUsd(symbol.toUpperCase(), balance).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
        </small>
      </div>
      <div class="user-wallets-box__right">
        <vc-donut
          background="#1F2124"
          foreground="#EAECEF"
          :size="225"
          :thickness="40"
          has-legend
          legend-placement="right"
          :sections="token[symbol]"
        >
          <template #legend>
            <div class="cdc-legend">
              <div
                v-for="(item, idx) in token[symbol]"
                :key="idx"
                :title="item.percent"
                class="cdc-legend-item"
              >
                <span class="cdc-legend-item-color" :style="item.style" />
                <span class="cdc-legend-item-label m-r-5 color-white">
                  {{ item.label.toUpperCase() }}
                </span>
                <span class="cdc-legend-item-value" :style="{ color: item.style.backgroundColor}">
                  {{ item.value }} %
                </span>
              </div>
            </div>
          </template>
        </vc-donut>
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
    </div>
  </section>
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
      modal: "",
      token: {
        kzn: [
          { label: "Pre-sale", value: 1, percent: 15, style: { backgroundColor: "#BFEA44" } },
          { label: "IDO", value: 3, percent: 3, style: { backgroundColor: "#F0C149" } },
          { label: this.$t("COMPANY_WALLET"), value: 15, percent: 15, style: { backgroundColor: "#51ECA1" } },
          { label: this.$t("REMUNERATION_FUND"), value: 5, percent: 6, style: { backgroundColor: "#629CF2" } },
          { label: "Public sale", value: 62, percent: 62, style: { backgroundColor: "#FFFFFF" } }
        ],
        vng: [
          { label: "Pre-sale", value: 15, percent: 15, style: { backgroundColor: "#BFEA44" } },
          { label: "IDO", value: 3, percent: 3, style: { backgroundColor: "#F0C149" } },
          { label: this.$t("COMPANY_WALLET"), value: 15, percent: 15, style: { backgroundColor: "#51ECA1" } },
          { label: this.$t("REMUNERATION_FUND"), value: 5, percent: 6, style: { backgroundColor: "#629CF2" } },
          { label: "Public sale", value: 62, percent: 62, style: { backgroundColor: "#FFFFFF" } }
        ],
        srk: [
          { label: "Pre-sale", value: 1, percent: 15, style: { backgroundColor: "#BFEA44" } },
          { label: "IDO", value: 0.3, percent: 3, style: { backgroundColor: "#F0C149" } },
          { label: this.$t("COMPANY_WALLET"), value: 15, percent: 15, style: { backgroundColor: "#51ECA1" } },
          { label: this.$t("REMUNERATION_FUND"), value: 5, percent: 6, style: { backgroundColor: "#629CF2" } },
          { label: "Public sale", value: 78.3, percent: 62, style: { backgroundColor: "#FFFFFF" } }
        ]
      }
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
@import "~/assets/scss/components/balance-info.scss";

.user-wallets {
  &-box {
    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__left {
      margin-bottom: 30px;

      @include respond-before("md") {
        width: 35%;
        margin-bottom: 0;
      }
      @include respond-before("xl") {
        width: 30%;
      }
    }

    &__right {
      @include respond-before("md") {
        width: 65%;
      }
      @include respond-before("xl") {
        width: 60%;
      }

      .cdc-container {
        justify-content: left;
      }
    }
  }
}

.cdc-container {
  @include respond-to("md") {
    display: block;
  }
}

.cdc-legend {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  @include respond-before("md") {
    margin: 0 0 0 2em;
  }

  &-item {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
    font-size: 15px;
    letter-spacing: -0.02em;
    min-width: 250px;

    &-color {
      height: .75em;
      width: .75em;
      border-radius: 2px;
      margin-right: 0.5em;
    }

    &-label {
      margin-right: 16px;
    }

    &-value {
      margin-left: auto;
    }
  }
}

.price {
  font-weight: bold;
  font-size: 30px;
  letter-spacing: -0.02em;
  color: #f5cf48;
}

</style>

