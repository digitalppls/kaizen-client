<template>
  <div class="all-currency">
    <transition name="slide">
      <div v-show="show" class="all-currency-collapse">
        <div class="container">
          <div class="all-currency__container">
            <currency-item
              v-for="(currency, idx) in currencies"
              :key="idx"
              :class="['all-currency__item', {'all-currency__item--index': currency.index}]"
            >
              <template #icon>
                {{ currency.symbol }}
              </template>
              <template #value1>
                {{ currency.price.toLocaleString("en-US", $LOCALESTRING_CRYPTO()) }}
              </template>
            </currency-item>
          </div>
        </div>
      </div>
    </transition>
    <button class="all-currency__toggle" @click="toggle">
      {{ $t(show ? "COLLAPSE" : "CURRENCY_QUOTES") }}
    </button>
  </div>
</template>

<script>
import CurrencyItem from "~/components/currency-item";

export default {
  name: "AllCurrency",
  components: { CurrencyItem },
  data () {
    return {
      show: false
    };
  },
  computed: {
    currencies () {
      return this.$store.getters.currency;
      // .filter(e => !["AMCUSDT", "OROUSDT", "BUSDUSDT", "ALLWINUSDT", "FCOINUSDT", "FCASHUSDT", "USDTUSDT", "USDCUSDT", "USDUSDT", "USDTRUB"].includes(e.symbol))
      // .map(i => [`${i.symbol.split("USDT")[0]}/USDT`, i.price, i.index]);
    }
  },
  methods: {
    toggle () {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss" scoped>
.all-currency {
  $self: &;
  margin-top: -60px;
  margin-bottom: 50px;
  position: relative;

  &__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
  }

  &__item {
    width: 33.333%;
    padding: 10px 15px;

    @include respond-before("xs") {
      padding: 10px 15px;
    }
    @include respond-before("sm") {
      padding: 15px;
    }
    @include respond-before("pre-md") {
      width: 25%;
    }
    @include respond-before("md") {
      width: 16.6666%;
    }
    @include respond-before("lg") {
      width: 12.5%;
    }

    &--index {
      &::v-deep .currency-item__icon {
        color: var(--color-tertiary);
      }
    }
  }

  &-collapse {
    background-color: #f8f8fb;
  }

  &__toggle {
    margin: auto;
    display: block;
    position: relative;
    width: 140px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    z-index: 1;
    background-color: darken(#f8f8fb, 0%);
    @include fontTTNorms("medium");

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      z-index: -1;
      border-radius: 0 0 10px 10px;
      background-color: darken(#f8f8fb, 0%);
    }

    &:before {
      transform: skew(-25deg);
      left: 25px;
    }

    &:after {
      transform: skew(25deg);
      right: 25px;
      left: auto;
    }
  }
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
