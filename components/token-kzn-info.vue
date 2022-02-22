<template>
  <div class="info-items m-b-40" style="justify-content: space-around; align-items: center">
    <div class="info-item" style="padding: 10px">
      <div class="info-item__label">
        {{ $t("DATE_OF_FOUNDATION") }}
      </div>
      <div class="info-item__value">
        Декабрь 2017
      </div>
    </div>
    <div class="info-item" style="padding: 10px">
      <div class="info-item__label">
        {{ $t("TOKEN") }}
      </div>
      <div class="info-item__value" style="align-items: center; display: flex">
        <img :src="require('~/assets/img/tokens/kzn.svg?inline')" alt="KZN">
        KZN
      </div>
    </div>
    <div class="info-item" style="padding: 10px">
      <div class="info-item__label">
        {{ $t("TOKEN_VALUE") }}
      </div>
      <div class="info-item__value">
        $ {{ priceUsd }}
      </div>
    </div>
    <div class="info-item" style="padding: 10px">
      <div class="info-item__label">
        {{ $t("VALUE_OF_ALL_FUND_ASSETS") }}
      </div>
      <div class="info-item__value">
        $ 85.7M
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TokenKznInfo",
  data () {
    return {
      sale: null
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
  // eslint-disable-next-line vue/return-in-computed-property
  mounted () {
    this.$API.TokenSaleList(this.symbol, (sale) => {
      this.sale = !sale?.list ? null : sale.list.find(x => x.isCurrent === true);
    });
  }

};
</script>
