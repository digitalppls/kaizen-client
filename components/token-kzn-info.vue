<template>
  <div class="info info-section">
    <div class="container">
      <div class="info-items">
        <div class="info-item">
          <div class="info-item__label">
            {{ $t("DATE_OF_FOUNDATION") }}
          </div>
          <div class="info-item__value">
            {{ $t("DECEMBER") }} 2017
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__label">
            {{ $t("TOKEN") }}
          </div>
          <div class="info-item__value">
            KZN
          </div>
        </div>
        <div class="info-item">
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
      <div v-if="infoBlocks.length" class="info-blocks">
        <div
          v-for="(item, key) in infoBlocks"
          :key="key"
          :class="['info-block', `info-block--${item.id}`]"
        >
          <div class="info-block__icon">
            <img :src="item.img" alt="">
          </div>
          <div class="info-block__cnt">
            <p class="m-b-5 font-bold font-size-22">
              {{ $t(`HOME_INFO_BLOCK_H_${item.id}`) }}
            </p>
            <p class="font-size-14 color-gray" style="font-weight: 300;">
              {{ $t(`HOME_INFO_BLOCK_T_${item.id}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TokenKznInfo",
  data () {
    return {
      symbol: "kzn",
      sale: null,
      infoBlocks: [
        {
          id: 1,
          img: require("~/assets/images/icon-chart-show.png")
        },
        {
          id: 2,
          img: require("~/assets/images/icon-calc.png")
        },
        {
          id: 3,
          img: require("~/assets/images/icon-graph.png")
        }
      ]
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

<style scoped lang="scss">
.info-section {
  padding: 50px 0;
}

.info-item {
  padding: 10px;

  &s {
    margin: 0 auto 40px;

    @include respond-before("xs") {
      display: flex;
      flex-wrap: wrap;
    }
    @include respond-before("sm") {
      max-width: 500px;
    }
    @include respond-before("md") {
      align-items: center;
    }
    @include respond-before("lg") {
      max-width: 1000px;
    }
  }

  & {
    margin-bottom: 20px;

    @include respond-before("xs") {
      margin: 0 0 20px;
      width: 50%;
    }
    @include respond-before("lg") {
      margin: 0;
      width: 25%;
    }

    &__label {
      font-weight: 300;
      margin-bottom: 10px;
      color: var(--col-gray);

      @include respond-before("xs") {
        @include respond-to("sm") {
          font-size: 14px;
        }
      }
    }

    &__value {
      color: var(--col-main);
      font-size: 26px;

      @include respond-before("xs") {
        @include respond-to("sm") {
          font-size: 22px;
        }
      }
    }
  }
}

.info-block {
  $self: &;

  display: flex;
  flex: 1 1 auto;
  background: #1f2124;
  color: #fff;
  box-shadow: 0 4px 16px rgba(68, 68, 89, 0.16);
  padding: 20px 25px;
  align-items: center;
  margin: 0 auto 25px;

  @include respond-before("sm") {
    max-width: 500px;
  }

  @include respond-before("lg") {
    margin: 0 10px;
    flex: 1;
    width: 33.333%;
  }

  &s {
    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      max-width: 1090px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &--2 {
    @include respond-before("lg") {
      transform: scale(1.07);

      #{$self}__icon,
      #{$self}__cnt {
        transform: scale(0.93);
      }
    }
  }

  &__icon {
    width: 40px;
    color: #a6b4bf;
    font-weight: 600;
    margin-right: 25px;
  }

  &__cnt {
    flex: 1;
  }
}

</style>
