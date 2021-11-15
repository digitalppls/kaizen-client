<template>
  <div class="page-home">
    <!-- Cover -->
    <div class="cover">
      <div class="container">
        <!-- Криптоиндексы -->
        <div class="cryptoindices">
          <div class="cryptoindices__logo">
            <svg width="101" height="42" viewBox="0 0 101 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40.6135 0L23.0219 19.56L40.6135 42H29.8662L14.1978 22.02H10.6907V42H0V0H10.6907V17.58H13.9715L29.8662 0H40.6135Z"
                fill="#58C1B9"
              />
              <path d="M65.5533 0L47.6223 37.62H65.5533V42H34.7821L52.7697 4.38H34.7255V0H65.5533Z" fill="#58C1B9" />
              <path d="M90.3658 0H101V42H90.3658V19.8L71.3035 7.86V42H60.6127V0H71.3035L90.3658 12V0Z" fill="#58C1B9" />
            </svg>
          </div>
          <div class="cryptoindices__cnt">
            <div class="font-medium">
              {{ $t("CRYPTOINDICES").toUpperCase() }}
            </div>
            <div v-if="cryptoIndexesOrdered.length">
              <span
                v-for="(cindex, idx) in cryptoIndexesOrdered"
                :key="idx"
              >
                {{ cindex }}
              </span>
            </div>
          </div>
        </div>

        <div class="cover-textbox">
          <h1 class="cover__title m-b-20">
            {{ coverTitle }}
          </h1>
          <div class="cover__desc m-b-40 lh-135">
            {{ coverDesc }}
          </div>
          <div class="cover__action">
            <nuxt-link
              :to="localePath(hasToken ? 'my' : 'auth')"
              class="btn btn-solid"
            >
              {{ $t(hasToken ? "DASHBOARD" : "START_INVESTING") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Information -->
    <div class="info info-section">
      <div class="container">
        <div class="info-items m-b-40">
          <div class="info-item">
            <div class="info-item__label">
              {{ $t("DATE_OF_FOUNDATION") }}
            </div>
            <div class="info-item__value">
              Декабрь 2017
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__label">
              {{ $t("TOKEN") }}
            </div>
            <div class="info-item__value">
              <img :src="require('~/assets/img/tokens/kzn.svg?inline')" alt="KZN">
              KZN
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__label">
              {{ $t("TOKEN_VALUE") }}
            </div>
            <div class="info-item__value">
              $ 4.595
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__label">
              {{ $t("VALUE_OF_ALL_FUND_ASSETS") }}
            </div>
            <div class="info-item__value">
              $ 85.7M
            </div>
          </div>
        </div>

        <div class="info-blocks">
          <div class="info-block">
            <div class="info-block__icon">
              <img :src="require('~/assets/images/icon-chart-show.png')" alt="">
            </div>
            <div class="info-block__cnt">
              <p class="m-b-5 font-bold font-size-22">
                {{ $t("HOME_INFO_BLOCK_H_1") }}
              </p>
              <p class="font-secondary font-size-14">
                {{ $t("HOME_INFO_BLOCK_T_1") }}
              </p>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__icon">
              <img :src="require('~/assets/images/icon-calc.png')" alt="">
            </div>
            <div class="info-block__cnt">
              <p class="m-b-5 font-bold font-size-22">
                {{ $t("HOME_INFO_BLOCK_H_2") }}
              </p>
              <p class="font-secondary font-size-14">
                {{ $t("HOME_INFO_BLOCK_T_2") }}
              </p>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__icon">
              <img :src="require('~/assets/images/icon-graph.png')" alt="">
            </div>
            <div class="info-block__cnt">
              <p class="m-b-5 font-bold font-size-22">
                {{ $t("HOME_INFO_BLOCK_H_3") }}
              </p>
              <p class="font-secondary font-size-14">
                {{ $t("HOME_INFO_BLOCK_T_3") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- info chart -->
    <div class="info-chart">
      <div class="container">
        <div class="info-chart__wrap">
          <div class="info-chart__left">
            <div class="h2 m-b-20">
              {{ $t("INFOCHART_TITLE") }}
            </div>
            <div class="m-b-40 lh-135">
              {{ $t("INFOCHART_DESC") }}
            </div>
            <ul class="list font-bold">
              <li>{{ $t("CRYPTOCURRENCIES").toUpperCase() }}</li>
              <li>{{ $t("EXCHANGES").toUpperCase() }}</li>
              <li>{{ $t("TOP_COMPANIES").toUpperCase() }}</li>
            </ul>
          </div>
          <div class="info-chart__right">
            <ui-tabs class="info-chart-tabs">
              <ui-tab name="TOTAL_FUND_CAPITALIZATION" :selected="true">
                <div style="overflow: hidden; border-radius: 40px;">
                  <img src="~/assets/images/graphic.jpg" alt="">
                </div>
              </ui-tab>
              <ui-tab name="TOTAL_VOLUME">
                <div style="overflow: hidden; border-radius: 40px;">
                  <img src="~/assets/images/graphic.jpg" alt="">
                </div>
              </ui-tab>
              <ui-tab name="COIN10">
                <trading-view
                  container-id="tradingview_crypto10"
                  :options="{autosize: true, symbol: 'EIGHTCAP:CRYPTO10',interval: 'D', timezone: 'Etc/UTC', theme: 'light', style: 3, locale: 'ru', toolbar_bg: '#f1f3f6', enable_publishing: false, hide_top_toolbar: true, save_image: false}"
                  style="height: 500px; padding: 10px;"
                />
              </ui-tab>
              <ui-tab name="DEFI">
                <div style="overflow: hidden; border-radius: 40px; min-height: 510px;">
                  <trading-view
                    container-id="tradingview_defi"
                    :options="{autosize: true, symbol: 'BINANCE:DEFIUSDTPERP',interval: 'D', timezone: 'Etc/UTC', theme: 'light', style: 3, locale: 'ru', toolbar_bg: '#f1f3f6', enable_publishing: false, hide_top_toolbar: true, save_image: false}"
                    style="height: 500px; padding: 10px;"
                  />
                </div>
              </ui-tab>
              <ui-tab name="CRYPTO100">
                <div style="overflow: hidden; border-radius: 40px; min-height: 510px;">
                  <trading-view
                    container-id="tradingview_cix100"
                    :options="{autosize: true, symbol: 'CRYPTOINDEX:CIX100',interval: 'D', timezone: 'Etc/UTC', theme: 'light', style: 3, locale: 'ru', toolbar_bg: '#f1f3f6', enable_publishing: false, hide_top_toolbar: true, save_image: false}"
                    style="height: 500px; padding: 10px;"
                  />
                </div>
              </ui-tab>
              <ui-tab name="KAIZEN">
                <trading-view
                  container-id="tradingview_bitw"
                  :options="{autosize: true, symbol: 'FTX:BITWUSD',interval: 'D', timezone: 'Etc/UTC', theme: 'light', style: 3, locale: 'ru', toolbar_bg: '#f1f3f6', enable_publishing: false, hide_top_toolbar: true, save_image: false}"
                  style="height: 500px; padding: 10px;"
                />
              </ui-tab>
            </ui-tabs>
          </div>
        </div>
      </div>
    </div>

    <!-- Indexes -->
    <div id="indexes" class="indexes-section">
      <div class="container">
        <div class="indexes-section__heading">
          <div class="h2 m-b-40">
            {{ $t("HOME_INDEXES_TITLE") }}
          </div>
        </div>

        <div class="indexes__wrap">
          <div class="indexes" :style="cssVarCountCryptoIndexes">
            <div
              v-for="(index, i) in indexes"
              :key="i"
              class="indexes__item"
            >
              <div class="index">
                <div class="index__header">
                  <div class="index__header__icon">
                    <svg width="40" height="29" viewBox="0 0 40 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.5879 0L6.31436 13.5057L18.5879 29H11.0896L0.157859 15.2043L0 12.1386L11.0896 0H18.5879Z"
                        :fill="index.color"
                      />
                      <path
                        d="M35.9882 0L23.4778 25.9757H35.9882V29H14.5193L27.0691 3.02429H14.4799V0H35.9882Z"
                        :fill="index.color"
                      />
                      <path
                        d="M40 5.42714V29H32.5412V0H40V5.42714Z"
                        :fill="index.color"
                      />
                    </svg>
                  </div>
                  <div class="index__header__cnt">
                    <div class="font-bold font-size-22" style="color: #000;">
                      {{ index.title.toUpperCase() }}
                    </div>
                    <div v-if="index.symbol" class="small">
                      {{ $t("TOKEN") }} {{ index.symbol }}
                    </div>
                  </div>
                </div>
                <div class="index__body">
                  <div v-if="index.items.length" class="index__items">
                    <div
                      v-for="(item, idx) in index.items"
                      :key="idx"
                      class="index__item"
                      :data-data="1+2 === 2 ? '33%' : ''"
                    >
                      <img :src="require(`~/assets/images/${item.img}?inline`)" :alt="item.name" :title="item.name">
                    </div>
                  </div>
                  <div class="index__price">
                    <div class="index__price__l">
                      <div class="small">
                        {{ $t("COST") }}:
                      </div>
                      <ui-preloader v-if="!cryptoIndexes.length" size="small" />
                      <div v-else class="font-bold font-size-36 color-black">
                        {{ getIndexPrice(index.title) }}
                      </div>
                    </div>
                    <div class="index__price__r">
                      <div v-if="index.desc" v-tooltip.top="index.desc" class="info-btn">
                        <img :src="require('~/assets/img/icon-i.png')" alt="">
                      </div>
                    </div>
                  </div>
                  <!-- , query: hasToken ? {index: index.title.toUpperCase()} : null -->
                  <nuxt-link
                    :to="localePath({ name: hasToken ? 'my-indexes-id' : 'auth', params: hasToken ? { id: getIndexName(index.title.toUpperCase()) } : {} })"
                    :class="['btn', 'btn-solid', 'btn-full', {'btn-solid--secondary': index.id === 2}, {'btn-solid--tertiary': index.id === 3}]"
                  >
                    {{ $t(hasToken ? "BUY" : "JOIN") }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Token KZN -->
    <div class="about-token">
      <div class="container">
        <div class="h2 m-b-40 text-center">
          {{ $t("TOKEN") }} KZN
        </div>
        <div class="about-token-section">
          <div class="about-token-section__l">
            <img :src="require('~/assets/images/kzn.svg?inline')" alt="KZN">
          </div>
          <div class="about-token-section__r">
            <p class="about-token-txt-box lh-135 m-b-20 font-medium">
              {{ $t("TOKEN_KZN_DESC") }}
            </p>
            <p class="m-b-20">
              <nuxt-link
                :to="localePath({ name: hasToken ? 'my-indexes-id' : 'auth', params: hasToken ? { id: 'KAIZEN' } : {} })"
                :class="['btn', 'btn-solid']"
              >
                {{ $t("BUY") }} KZN
              </nuxt-link>
            </p>
            <p>
              <a href="#" class="font-medium">White Paper</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Advantages -->
    <div class="advantages">
      <div class="container">
        <h2 class="m-b-40 text-center">
          {{ $t("ADVANTAGES_FUND_TITLE") }}
        </h2>

        <div class="advantages-list">
          <div
            v-for="(item, idx) in advantages"
            :key="idx"
            class="advantages-list__item"
          >
            <div class="advantages-item">
              <div v-if="item.icon" class="advantages-item__icon">
                <img :src="require(`~/assets/images/${item.icon}?inline`)" alt="">
              </div>
              <div v-if="item.title" class="advantages-item__title" v-html="item.title" />
              <div v-if="item.desc" class="advantages-item__desc" v-html="item.desc" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="container">
      <div class="roadmap-section">
        <div class="roadmap-section__l">
          <div class="roadmap-section__txt">
            <div class="h2 m-b-20">
              {{ $t("HOME_ROADMAP_TITLE") }}
            </div>
            <p class="m-b-40 lh-135">
              {{ $t("HOME_ROADMAP_DESC") }}
            </p>
          </div>
        </div>
        <div class="roadmap-section__r">
          <div class="roadmap">
            <div class="timeline">
              <div
                v-for="(item, idx) in roadmap"
                :key="idx"
                class="timeline-item"
              >
                <p
                  class="font-size-22 font-bold color-black m-b-5"
                  v-html="$t(item.title).toUpperCase()"
                />
                <p v-html="$t(item.desc)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tokenomics -->
    <div class="container">
      <div class="tokenomics-section">
        <div class="tokenomics-section__l">
          <div class="h2 m-b-20">
            {{ $t("HOME_TOKENOMICS_TITLE") }}
          </div>
          <p class="m-b-10">
            {{ $t("TOKENOMICS_TOTAL_INITIAL") }}
          </p>
          <div class="m-b-10 lh-135 tokenomics-section__highlight">
            {{ tokenomicsTotal.toLocaleString() }} KZN
          </div>
          <p
            class="m-b-40"
            v-html="$t('TOKENOMICS_TOTAL_STABLECOIN').replace('%{TOTAL}', '<strong>100 000 000</strong>')"
          />
          <vc-donut
            foreground="#EAECEF"
            :size="320"
            :thickness="30"
            has-legend
            legend-placement="left"
            :sections="tokenomicsSections"
          >
            <strong class="cdc-total">
              {{ tokenomicsTotal.toLocaleString() }} KZN
            </strong>

            <template #legend>
              <div class="cdc-legend">
                <div
                  v-for="(item, idx) in legend"
                  :key="idx"
                  :title="item.percent"
                  class="cdc-legend-item"
                >
                  <span class="cdc-legend-item-color" :style="item.styles" />
                  <span class="cdc-legend-item-label">
                    {{ item.percent.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO(0, 0)) }} - {{ item.label }}
                    <small>({{ item.value.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO(0, 0)) }} KZN)</small>
                  </span>
                  <span v-if="false" class="cdc-legend-item-value">
                    {{ item.value.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO(0, 0)) }}
                  </span>
                </div>
              </div>
            </template>
          </vc-donut>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UiTabs from "~/components/ui-tabs/ui-tabs";
import UiTab from "~/components/ui-tabs/ui-tab";
import TradingView from "~/components/trading-view";
import { INDEXES } from "~/global";
import UiPreloader from "~/components/ui/ui-preloader.global";

export default {
  name: "Home",
  components: { UiPreloader, TradingView, UiTab, UiTabs },
  layout: "public",
  data () {
    return {
      disabled: true,
      countIndices: 10,
      cryptoIndexes: [],
      roadmap: [
        {
          title: "TIMELINE_1_TITLE",
          desc: "TIMELINE_1_DESC"
        },
        {
          title: "TIMELINE_2_TITLE",
          desc: "TIMELINE_2_DESC"
        },
        {
          title: "TIMELINE_3_TITLE",
          desc: "TIMELINE_3_DESC"
        },
        {
          title: "TIMELINE_4_TITLE",
          desc: "TIMELINE_4_DESC"
        },
        {
          title: "TIMELINE_5_TITLE",
          desc: "TIMELINE_5_DESC"
        }
        // {
        //   title: "TIMELINE_6_TITLE",
        //   desc: "TIMELINE_6_DESC"
        // }
      ],
      cryptoIndexesOrdered: ["CRYPTO100", "COIN10", "DEFI", "KAIZEN"],
      tokenomics: [
        // {
        //   label: "Private Sale I",
        //   value: 1000000
        // },
        // {
        //   label: "Private Sale II",
        //   value: 1000000
        // },
        {
          label: "Pre-Sale",
          value: 2500000
        },
        {
          label: "IDO",
          value: 300000
        },
        {
          label: this.$t("TOKENOMICS_COMPANY_WALLET"),
          value: 2000000
        },
        {
          label: this.$t("TOKENOMICS_PUBLIC_SELLING"),
          value: 5200000
        }
      ],
      advantages: [
        {
          icon: "1.svg",
          title: this.$t("ADVANTAGES_ITEMS_1_TITLE"),
          desc: this.$t("ADVANTAGES_ITEMS_1_DESC")
        },
        {
          icon: "2.svg",
          title: this.$t("ADVANTAGES_ITEMS_2_TITLE"),
          desc: this.$t("ADVANTAGES_ITEMS_2_DESC")
        },
        {
          icon: "3.svg",
          title: this.$t("ADVANTAGES_ITEMS_3_TITLE"),
          desc: this.$t("ADVANTAGES_ITEMS_3_DESC")
        }
      ],
      defaultColors: [
        "#ff6384", "#36a2eb", "#ffce56", "#f58231", "#46f0f0", "#d2f53c", "#911eb4", "#f032e6",
        "#3cb44b", "#ffe119", "#e6194b", "#fabebe", "#008080", "#e6beff", "#0082c8", "#aa6e28",
        "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000080", "#808080", "#000"
      ]
    };
  },
  computed: {
    indexes () {
      return INDEXES;
    },
    coverTitle () {
      return this.$t("COVER_TITLE"); // .replace("%{COUNT}", this.countIndices);
    },
    coverDesc () {
      return this.$t("COVER_DESC"); // .replace("%{INDEXNAME}", "CRYPTO10").replaceAll("%{INDEXCNT}", "10");
    },
    hasToken () {
      return this.$store.getters.hasToken;
    },
    cssVarCountCryptoIndexes () {
      return {
        "--count-indexes": this.cryptoIndexes.length
      };
    },
    tokenomicsTotal () {
      return this.tokenomics.map(x => x.value).reduce((a, b) => a + b, 0);
    },
    tokenomicsSections () {
      const tmp = [];
      this.tokenomics.map((e) => {
        tmp.push({
          label: e.label,
          value: parseInt(((e.value / this.tokenomicsTotal) * 100).toFixed(0), 10) // в процентах
        });
        return e;
      });
      return tmp;
    },
    legend () {
      let currentDefaultColorIdx = 0;
      return this.tokenomicsSections.map((section, idx) => ({
        label: section.label || `Section ${idx + 1}`,
        value: (section.value * this.tokenomicsTotal) / 100, // обратно преодразовываем из процентов в кол-во токенов
        percent: `${section.value.toLocaleString()}%`, // (${((section.value * this.total) / 100).toLocaleString(this.$i18n.locale, this.$LOCALESTRING_CRYPTO())})`,
        styles: {
          backgroundColor: this.defaultColors[currentDefaultColorIdx++]
        }
      }));
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
    }
  }
};
</script>

<style lang="scss" scoped>
.cryptoindices {
  background-color: #f8f8fb;
  border-radius: 20px;
  padding: 25px;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;

  &__logo {
    margin-right: 25px;
  }

  &__cnt {

    span {
      display: inline-block;
      margin-right: 15px;
      font-size: 18px;
      color: var(--color-primary);
      @include fontTTNorms("bold");

      @include respond-before("xs") {
        font-size: 16px;
      }
      @include respond-before("md") {
        font-size: 18px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.cover-textbox {
  max-width: 563px;
  margin-top: 60px;

  @include respond-before("lg") {
    margin-left: 40px;
  }
}

.cover {
  margin-top: -60px;
  padding-top: 60px;
  overflow: hidden;
  padding-bottom: 100px;
  background-image: url("~/assets/images/cover.png");
  background-repeat: no-repeat;
  background-position: right 50% center;
  background-size: auto 40%;

  @include respond-before("xs") {
    background-position: right 50% center;
    background-size: auto 70%;
  }
  @include respond-before("md") {
    background-position: right 60% center;
    background-size: auto 60%;
  }
  @include respond-before("lg") {
    background-position: right 60% center;
    background-size: auto 80%;
  }
  @include respond-before("xl") {
    background-position: right center;
    background-size: auto 110%;
  }

  &__title {
    color: #1f2024;
    font-size: 36px;
    line-height: 1.125em;
    letter-spacing: -0.02em;
    font-weight: 600;

    @include respond-before("xs") {
      font-size: 46px;
    }
  }
}

.info-section {
  background: #f8f8fb;
  padding: 50px 0;
}

.info-item {
  &s {
    @include respond-before("xs") {
      display: flex;
      flex-wrap: wrap;
    }
    @include respond-before("md") {
      align-items: center;
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
      @include fontGothamPro();
      margin-bottom: 5px;

      @include respond-before("xs") {
        @include respond-to("sm") {
          font-size: 14px;
        }
      }
    }

    &__value {
      color: #000;
      @include fontTTNorms("bold");
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
  &s {
    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
    }
  }

  display: flex;
  flex: 1 1 auto;
  //height: 100%;
  background: #fff;
  box-shadow: 0 4px 16px rgba(162, 162, 175, 0.16);
  border-radius: 20px;
  padding: 20px 25px;
  align-items: center;
  margin-bottom: 25px;

  @include respond-before("lg") {
    margin: 0 10px;
    flex: 1;
    width: 33.333%;
  }

  &__icon {
    width: 40px;
    color: #a6b4bf;
    font-weight: 600;
    margin-right: 25px;
  }

  &__cnt {
    flex: 1;
    color: #000;
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
      margin-left: -10px;
      margin-right: -10px;
    }

    &__wrap {
      margin: auto;
      //max-width: 985px;
    }

    &__item {
      margin-bottom: 30px;

      @include respond-before("pre-md") {
        padding-left: 10px;
        padding-right: 10px;
        width: calc(100% / (var(--count-indexes) / 2));
      }
      @include respond-before("lg") {
        width: calc(100% / var(--count-indexes));
      }
    }
  }

  & {
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
    background-color: #f0f2fb;
    padding: 20px 25px;
    border-radius: 20px 20px 0 0;

    @include respond-before("md") {
      @include respond-to("lg") {
        min-height: 110px;
      }
    }

    &__icon {
      margin-right: 25px;
    }
  }

  &__body {
    background-color: #f8f8fb;
    border-radius: 0 0 20px 20px;
    padding: 0 30px 30px;

    @include respond-before("pre-md") {
      padding: 0 20px 20px;
    }
    @include respond-before("md") {
      padding: 0 30px 30px;
    }
  }

  &__items {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 360px;
  }

  &__item {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    @include respond-before("xl") {
      &:after {
        content: "";
        height: 1px;
        background-image: linear-gradient(to right, #d8dae5 33%, rgba(255, 255, 255, 0) 0%);
        background-position: bottom;
        background-size: 10px 1px;
        background-repeat: repeat-x;
        left: -38px;
        right: -38px;
        position: absolute;
        top: 100%;
      }
    }

    img {
      max-width: 170px;
    }

  }

  &__price {
    display: flex;
    margin: 30px 0;
    align-items: flex-end;

    &__l {
      margin-right: 25px;
    }

    &__r {
      margin-left: auto;
    }
  }

  .btn {
    @include respond-before("lg") {
      @include respond-to("xl") {
        font-size: 13px;
      }
    }
  }
}

.about-token {
  margin: 50px auto;
  padding: 50px 0;

  &__logo {
    margin-bottom: 30px;

    @include respond-before("md") {
      margin-bottom: 0;
    }
  }

  &-section {
    text-align: center;
    max-width: 1000px;
    margin: auto;

    @include respond-before("md") {
      display: flex;
      text-align: left;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      &__l {
        flex: 1;
        max-width: 300px;
        text-align: center;
      }

      &__r {
        width: 570px;
        padding-left: 40px;
        overflow-y: auto;
        max-height: 630px;
      }
    }
  }

  &-txt-box {
    font-size: 18px;

    @include respond-before("md") {
      font-size: 22px;
    }
  }
}

.advantages {
  background: #f8f8fb;
  padding: 50px 0;
  margin: 80px auto 50px;

  &-list {
    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__item {
      @include respond-to("md") {
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      @include respond-before("md") {
        padding-left: 20px;
        padding-right: 20px;
        width: calc(100% / 3);
      }
    }
  }

  &-item {
    text-align: center;

    &__icon {
      margin: 0 auto 20px;
      width: 100px;

      img {
        max-width: 100%;
      }
    }

    &__title {
      margin-bottom: 10px;
      @include fontTTNorms("bold");
    }

    &__desc {
      margin: auto;
      max-width: 300px;
    }
  }
}

.roadmap-section {
  padding: 100px 0 70px;
  max-width: 1000px;

  @include respond-before("lg") {
    margin-left: 84px;
  }

  @include respond-before("md") {
    display: flex;
    flex-wrap: wrap;

    &__l {
      flex: 1;
      max-width: 480px;
    }

    &__r {
      margin-left: auto;
      width: 400px;
      padding-left: 40px;
      //overflow-y: auto;
      //max-height: 630px;
    }

    &__txt {
      position: sticky;
      top: 100px;
    }
  }

  @include respond-before("lg") {
    max-width: 1000px;
    margin-left: 84px;
  }
}

.timeline {
  position: relative;
  padding-left: 30px;
  margin: 70px 0;

  @include respond-before("md") {
    padding-left: 50px;
    margin: 0;
  }

  &:before {
    content: "";
    position: absolute;
    width: 2px;
    background-image: linear-gradient(#d8dae5 50%, rgba(255, 255, 255, 0) 0%);
    background-position: right;
    background-size: 2px 22px;
    background-repeat: repeat-y;
    left: 0;
    top: -4%;
    bottom: -4%;
  }

  &-item {
    position: relative;
    background: #f3f4fa;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 40px;

    @include respond-before("md") {
      margin-bottom: 80px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:before {
      content: "";
      position: absolute;
      height: 14px;
      width: 14px;
      background: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 0L14 7L7 14L0 7L7 0Z' fill='%2358C1B9'/%3E%3C/svg%3E%0A") no-repeat;
      top: 50%;
      transform: translateY(-50%);
      left: -36px;

      @include respond-before("md") {
        left: -56px;
      }
    }
  }
}

.tokenomics-section {
  padding: 160px 0 70px;

  @include respond-before("lg") {
    margin-left: 84px;
  }

  &__highlight {
    font-size: 30px;
    display: inline-block;
    color: #fff;
    padding: 0 20px;
    @include fontTTNorms("bold");
    background: var(--color-primary);

    @include respond-before("md") {
      font-size: 39px;
    }
  }

  &::v-deep .cdc {
    @include respond-to("xs") {
      width: 270px !important;
      padding-bottom: 270px !important;
    }

    @include respond-before("lg") {
      width: 400px !important;
      padding-bottom: 400px !important;
    }

    @include respond-to("md") {
      margin: auto;
    }

    &-container {
      justify-content: flex-start;

      @include respond-to("md") {
        display: block;
      }
    }

    &-total {
      font-size: 20px;

      @include respond-before("xs") {
        font-size: 26px;
      }
    }

    &-legend {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;

      @include respond-before("md") {
        margin: 0 1em 0 0;
        order: -1;
      }

      &-item {
        display: flex;
        align-items: center;
        margin: 0.5em 0;
        letter-spacing: -0.02em;
        @include fontTTNorms("medium");

        &-color {
          height: .75em;
          width: .75em;
          min-width: .75em;
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
