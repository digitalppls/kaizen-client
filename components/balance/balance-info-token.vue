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
    <vc-donut
      foreground="#EAECEF"
      :size="175"
      :thickness="25"
      has-legend
      legend-placement="right"
      :sections="[
        { label:'Pre-sale', value: 15, color: '#a200dd' },
        { label:'IDO', value: 3, color: '#dd008c' },
        { label:'Кошелек компании', value: 15, color: '#0f00dd' },
        { label:'Фонд вознаграждения', value: 5, color: '#00dd25' },
        { label:'Public sale', value: 62, color: '#dd8500' }
      ]"
    >
      <template #legend>
        <div class="cdc-legend">
          <div
            v-for="(item, idx) in [
              { label:'Pre-sale', value: 15, percent: 15, style: {backgroundColor: '#a200dd'} },
              { label:'IDO', value: 3, percent: 3, style: {backgroundColor: '#dd008c'} },
              { label:'Кошелек компании', value: 15, percent: 15, style: {backgroundColor: '#0f00dd'} },
              { label:'Фонд вознаграждения', value: 5, percent: 6, style: {backgroundColor: '#00dd25'} },
              { label:'Public sale', value: 62, percent: 62, style: {backgroundColor: '#dd8500'} }
            ]"
            :key="idx"
            :title="item.percent"
            class="cdc-legend-item"
          >
            <span class="cdc-legend-item-color" :style="item.styles" />
            <span class="cdc-legend-item-label m-r-5">
              {{ item.label.toUpperCase() }}
            </span>
            <span class="cdc-legend-item-value">
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
.user-wallets {
 &-box {
   @include respond-before("md") {
     display: flex;
     flex-wrap: wrap;
   }

   &__left {
     margin-bottom: 30px;

     @include respond-before("md") {
       width: 35%;
       margin-bottom: 0;
     }
     @include respond-before("xl") {
       width: 45%;
     }
   }

   &__right {
     @include respond-before("md") {
       width: 65%;
     }
     @include respond-before("xl") {
       width: 55%;
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
    margin: 0 0 0 1em;
  }

  &-item {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
    font-size: 15px;
    letter-spacing: -0.02em;
    @include fontTTNorms("medium");

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

</style>

