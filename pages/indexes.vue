<template>
  <main class="main">
    <div class="indexes-hero-section hero-section section-1">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="coverTitle" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="coverDesc" />
        <nuxt-link
          disabled
          :event="''"
          :to="localePath(hasToken ? 'indexes' : 'auth')"
          class="btn btn-blue animate__animated wow animate__fadeIn"
          data-wow-delay=".5s"
          v-text="$t('START_INVESTING')"
        />
        <br>
        <span class="error" style="color:var(--col-red)">{{ $t("TEMPORARILY_UNAVAILABLE") }}</span>
      </div>
    </div>

    <!-- info chart -->
    <div class="info-chart">
      <div class="container">
        <div class="info-chart__wrap">
          <div class="info-chart__left">
            <div class="h2 m-b-20 color-white">
              {{ $t("INFOCHART_TITLE") }}
            </div>
            <div class="m-b-40 font-300">
              {{ $t("INFOCHART_DESC") }}
            </div>
            <ul class="list color-white font-size-22">
              <li>{{ $t("CRYPTOCURRENCIES") }}</li>
              <li>{{ $t("EXCHANGES") }}</li>
              <li>{{ $t("TOP_COMPANIES") }}</li>
            </ul>
          </div>
          <div class="info-chart__right">
            <img src="~/assets/images/graphic.jpg" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- Indexes -->
    <div id="indexes" class="indexes-section">
      <div class="container">
        <div class="indexes-section__heading">
          <div class="h2 m-b-40 color-white">
            {{ $t("HOME_INDEXES_TITLE") }}
          </div>
        </div>

        <div class="indexes__wrap">
          <div class="indexes" :style="cssVarCountCryptoIndexes">
            <div
              v-for="(index, i) in indexes"
              :key="i"
              :class="['indexes__item', `indexes__item--${index.title.toLowerCase()}`]"
            >
              <div class="index">
                <div class="index__header">
                  <div class="font-bold font-size-22">
                    {{ index.title }}
                  </div>
                  <div v-if="index.symbol" class="small">
                    {{ $t("TOKEN") }} {{ index.symbol }}
                  </div>
                </div>
                <div v-if="index.items.length" class="index__body">
                  <div
                    v-for="(item, idx) in filterdItemsIndex(index.items)"
                    :key="idx"
                    class="index__item"
                    :data-data="1+2 === 2 ? '33%' : ''"
                  >
                    <img
                      :src="require(`~/assets/images/cryptocurrencies/${item.img}?inline`)"
                      :alt="item.name"
                      :title="item.name"
                    >
                  </div>
                </div>
                <div class="index__footer">
                  <div class="index__price">
                    <div class="index__price__l">
                      <div class="small font-300 m-b-10">
                        {{ $t("COST") }}:
                      </div>
                      <ui-preloader v-if="!cryptoIndexes.length" size="small" />
                      <div v-else class="font-bold font-size-36 color-white">
                        {{ getIndexPrice(index.title) }}
                      </div>
                    </div>
                    <div class="index__price__r">
                      <div v-if="index.help_info" v-tooltip.top="index.help_info" class="info-btn">
                        <img :src="require('~/assets/img/icon-i.png')" alt="">
                      </div>
                    </div>
                  </div>
                  <nuxt-link
                    disabled
                    :event="''"
                    :to="localePath('indexes')"
                    :class="['btn', 'btn-outline', 'btn-full']"
                  >
                    <!-- :to="localePath({ name: hasToken ? 'my-indexes-id' : 'auth', params: hasToken ? { id: getIndexName(index.title.toUpperCase()) } : {} })" -->
                    <!--  {{ $t(hasToken ? "BUY" : "JOIN") }}  -->
                    {{ $t("TEMPORARILY_UNAVAILABLE") }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Токеномика -->
    <div class="industry-tokenomic-section tokenomic-section">
      <div class="container">
        <div class="diagram-box">
          <div class="diagram-box__diagram">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M336.522 346.156C312.688 368.42 283.77 384.517 252.289 393.044C220.808 401.571 187.72 402.269 155.907 395.079C124.094 387.888 94.5225 373.027 69.7693 351.789C45.016 330.552 25.8323 303.583 13.8898 273.232C1.94729 242.882 -2.3915 210.072 1.25152 177.661C4.89454 145.249 16.4088 114.221 34.7909 87.2793C53.173 60.3376 77.8651 38.3002 106.715 23.0877C135.566 7.87514 167.698 -0.0509181 200.314 0.000237261L200.235 50.0237C175.778 49.9853 151.682 55.9289 130.047 67.3366C108.413 78.7442 89.897 95.2696 76.1126 115.473C62.3282 135.676 53.6938 158.944 50.962 183.248C48.2302 207.553 51.4838 232.157 60.4392 254.916C69.3947 277.675 83.7802 297.898 102.342 313.824C120.904 329.75 143.079 340.894 166.935 346.286C190.791 351.678 215.604 351.154 239.211 344.76C262.818 338.366 284.503 326.295 302.376 309.6L336.522 346.156Z"
                fill="white"
              />
              <path
                d="M374.448 297.816C364.282 315.945 351.353 332.379 336.126 346.525L302.095 309.894C313.515 299.284 323.212 286.959 330.836 273.362L374.448 297.816Z"
                fill="#629CF2"
              />
              <path
                d="M381.884 116.824C394.98 145.462 401.129 176.789 399.83 208.253C398.53 239.718 389.819 270.431 374.405 297.892L330.804 273.419C342.364 252.823 348.898 229.788 349.872 206.19C350.847 182.592 346.235 159.097 336.413 137.618L381.884 116.824Z"
                fill="#51ECA1"
              />
              <path
                d="M363.141 84.3066C370.429 94.5831 376.729 105.525 381.958 116.987L336.469 137.74C332.547 129.144 327.822 120.937 322.356 113.23L363.141 84.3066Z"
                fill="#F0C149"
              />
              <path
                d="M200 -8.74228e-06C232.019 -1.01419e-05 263.57 7.68768 292.001 22.4167C320.431 37.1457 344.91 58.4854 363.378 84.6417L322.534 113.481C308.682 93.8641 290.323 77.8593 269.001 66.8125C247.678 55.7658 224.014 50 200 50L200 -8.74228e-06Z"
                fill="#BFEA44"
              />
            </svg>

            <div class="number" v-text="'10 000 000 KZN'" />
          </div>
          <div class="diagram-box__legend">
            <ul>
              <li>
                Pre-sale
                <span class="number" v-text="'1%'" />
              </li>
              <li>
                IDO
                <span class="number" v-text="'3%'" />
              </li>
              <li>
                Company Wallet
                <span class="number" v-text="'15%'" />
              </li>
              <li>
                Compensation fund
                <span class="number" v-text="'5%'" />
              </li>
              <li>
                Public sale
                <span class="number" v-text="'62%'" />
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <h2 class="title">
            {{ $t("TOKENOMICS") }}
          </h2>
          <div class="text font-300">
            {{ $t("EMISSION") }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { INDEXES } from "~/global";

export default {
  name: "PageIndexes",
  layout: "public",
  data () {
    return {
      countIndices: 10,
      cryptoIndexes: [],
      cryptoIndexesOrdered: ["CRYPTO100", "COIN10", "DEFI", "KAIZEN"]
    };
  },
  computed: {
    indexes () {
      return INDEXES;
    },
    coverTitle () {
      return this.$t("INDEXES_COVER_TITLE"); // .replace("%{COUNT}", this.countIndices);
    },
    coverDesc () {
      return this.$t("INDEXES_COVER_DESC"); // .replace("%{INDEXNAME}", "CRYPTO10").replaceAll("%{INDEXCNT}", "10");
    },
    hasToken () {
      return this.$store.getters.hasToken;
    },
    cssVarCountCryptoIndexes () {
      return {
        "--count-indexes": this.cryptoIndexes.length
      };
    }
  },
  mounted () {
    // курсы валют
    this.getCurrency();
  },
  methods: {
    /** Получаем название символа без 'USDT' */
    getIndexName (index) {
      return index.split("USDT")[0];
    },

    /** Получаем курсы валют */
    getCurrency () {
      this.$API.getCurrency((r) => {
        this.cryptoIndexes = r.filter(e => e.index).map((x) => {
          return {
            index: x.index,
            price: x.price,
            symbol: this.getIndexName(x.symbol)
          };
        });
      });
    },

    /** Получить курс конкретного индекса */
    getIndexPrice (indexName) {
      const price = this.cryptoIndexes.find(e => e.symbol.toUpperCase() === indexName.toUpperCase())?.price ?? 0;
      return price.toLocaleString("en-US", this.$LOCALESTRING_USD(0, 0));
    },

    /** Отфильтрованные индексы где есть картинки */
    filterdItemsIndex (items) {
      return items.filter(e => e.img.split(".")[1]);
    },

    /** Конфиг графика */
    TWChartConfig (symbol) {
      if (symbol.toUpperCase() === "KAIZEN") {
        symbol = "FTX:BITWUSD";
      } else if (symbol.toUpperCase() === "CRYPTO100") {
        symbol = "CRYPTOINDEX:CIX100";
      } else if (symbol.toUpperCase() === "DEFI") {
        symbol = "BINANCE:DEFIUSDTPERP";
      } else {
        symbol = "EIGHTCAP:CRYPTO10"; // COIN10
      }

      return {
        autosize: true,
        symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: 3,
        locale: this.$i18n.locale,
        toolbar_bg: "#f1f3f6",
        hide_legend: true,
        withdateranges: true,
        hide_top_toolbar: false,
        enable_publishing: false,
        save_image: false
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.indexes-hero-section {
  background-image: url("~/assets/img/indexes-hero.png");
  background-repeat: no-repeat;
  background-size: 160% auto;
  background-position: top right;

  @include respond-before("xs") {
    background-size: 200% auto;
  }
  @include respond-before("sm") {
    background-size: 200% auto;
  }
  @include respond-before("pre-md") {
    background-size: 150% auto;
  }
  @include respond-before("md") {
    background-size: 160% auto;
  }
  @include respond-before("lg") {
    background-size: contain;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
  }

  //&::before {
  //  background: linear-gradient(183.37deg, rgba(18, 18, 18, 0.8) 11.48%, rgba(18, 18, 18, 0) 32.4%),
  //  linear-gradient(0deg, #121212 8.96%, rgba(18, 18, 18, 0) 44.43%), rgba(18, 18, 18, 0.4);
  //}

  .text {
    font-weight: 300;

    @include min(768px) {
      max-width: 560px;
    }
  }
}

.info-chart {
  padding: 60px 0 0;

  &__wrap {
    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &__left {
    margin-bottom: 30px;

    @include respond-before("lg") {
      width: 400px;
      margin-bottom: 0;
    }
  }

  &__right {
    @include respond-before("lg") {
      flex: 1;
      margin-left: 20px;
    }
  }

  // табы
  &::v-deep .ui-tabs {
    &-menu {
      background-color: transparent;
      border: 0;
    }

    &-menu__item {
      font-size: 13px;
      color: #555860;
      border: 1px solid transparent; // #555860;
      background-color: rgba(167, 169, 183, 0.07);
      user-select: none;
      border-radius: 12px;
      padding: 15px 20px;
      width: auto;
      margin-right: 10px;
      margin-bottom: 10px;

      &:last-child {
        margin-right: 0;
      }

      &--active {
        color: var(--base-text-invert);
        background-color: var(--color-primary);
        border: 1px solid transparent;
      }
    }
  }
}

.indexes-section {
  padding-top: 90px;

  &__heading {
    margin: auto;
    text-align: center;
    max-width: 500px;
  }
}

.index {
  $self: &;

  &es {
    @include respond-before("pre-md") {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      //margin-left: -10px;
      //margin-right: -10px;
    }

    &__wrap {
      margin: auto;
      //max-width: 985px;
    }

    &__item {
      margin-bottom: 30px;
      border: 1px solid #47484e;

      @include respond-before("pre-md") {
        //padding-left: 10px;
        //padding-right: 10px;
        width: calc(50% - 14px);
      }
      @include respond-before("lg") {
        width: calc(25% - 15px);
      }
    }
  }

  & {
    background-color: #151618;

    @include respond-before("xl") {
      &:first-child #{$self}__row {
        &:after {
          left: -170px;
        }

        &:before {
          content: attr(data-data);
          position: absolute;
          left: -130px;
          color: #a7a9b7;
          font-weight: 500;
          font-size: 36px;
          text-align: right;
          letter-spacing: -0.02em;
        }
      }

      &:last-child #{$self}__row {
        &:after {
          right: -170px;
        }
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    background-color: #333438;
    padding: 25px 30px;
    text-transform: uppercase;
    color: #fff;
    height: 94px;

    //@include respond-before("md") {
    //  @include respond-to("lg") {
    //    min-height: 110px;
    //  }
    //}
  }

  &__body {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 360px;
    background-color: #242527;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 30px;

    @include respond-before("pre-md") {
      padding: 20px;
    }
    @include respond-before("md") {
      padding: 30px;
    }

    &:after {
      content: "";
      height: 1px;
      //background-image: linear-gradient(to right, #27282b 70%, rgba(255, 255, 255, 0) 0%);
      background-position: bottom;
      background-size: 10px 1px;
      background-repeat: repeat-x;
      left: -38px;
      right: -38px;
      position: absolute;
      top: 100%;
    }

    img {
      max-height: 80px;
    }
  }

  &__footer {
    padding: 20px;
    background-color: #242527;
  }

  &__price {
    display: flex;
    margin: 0 0 30px;
    align-items: flex-end;

    &__l {
      margin-right: 25px;
    }

    &__r {
      margin-left: auto;
    }
  }

  .btn {
    border-color: #fff;
    color: #fff;
    background-color: transparent;
    padding-left: 20px;
    padding-right: 20px;

    @include respond-before("lg") {
      @include respond-to("xl") {
        font-size: 13px;
      }
    }
  }
}

// Common styles for page
.info-btn {
  display: inline-block;
  border: 1px solid #dee0eb;
  border-radius: 12px;
  padding: 10px 12px;
  transition: background-color $transition;
  cursor: help;

  &:hover {
    background-color: #dee0eb;
  }
}
</style>
