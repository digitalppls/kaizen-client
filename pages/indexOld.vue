<template>
  <div v-if="false" class="page-home">
    <!-- Cover -->
    <div class="cover">
      <div class="container">
        <!-- Криптоиндексы -->
        <div class="cryptoindices">
          <div class="cryptoindices__logo">
            <img :src="require('~/assets/images/kzn.svg?inline')" alt="KZN">
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
        <token-kzn-info />
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
              <ui-tab name="CRYPTO100">
                <div style="overflow: hidden; border-radius: 40px; min-height: 510px;">
                  <trading-view
                    container-id="tradingview_1"
                    :options="TWChartConfig('CRYPTOINDEX:CIX100')"
                    style="height: 500px; padding: 10px;"
                  />
                </div>
              </ui-tab>
              <ui-tab name="COIN10">
                <trading-view
                  container-id="tradingview_2"
                  :options="TWChartConfig('EIGHTCAP:CRYPTO10')"
                  style="height: 500px; padding: 10px;"
                />
              </ui-tab>
              <ui-tab name="DEFI">
                <div style="overflow: hidden; border-radius: 40px; min-height: 510px;">
                  <trading-view
                    container-id="tradingview_3"
                    :options="TWChartConfig('BINANCE:DEFIUSDTPERP')"
                    style="height: 500px; padding: 10px;"
                  />
                </div>
              </ui-tab>
              <ui-tab name="KAIZEN">
                <trading-view
                  container-id="tradingview_4"
                  :options="TWChartConfig('FTX:BITWUSD')"
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
              :class="['indexes__item', `indexes__item--${index.title.toLowerCase()}`]"
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
                      v-for="(item, idx) in filterdItemsIndex(index.items)"
                      :key="idx"
                      class="index__item"
                      :data-data="1+2 === 2 ? '33%' : ''"
                    >
                      <img :src="require(`~/assets/images/cryptocurrencies/${item.img}?inline`)" :alt="item.name" :title="item.name">
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
                      <div v-if="index.help_info" v-tooltip.top="index.help_info" class="info-btn">
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
                :to="localePath('my')"
                :class="['btn', 'btn-solid']"
              >
                {{ $t("BUY") }} KZN
              </nuxt-link>
            </p>
            <p>
              <a :href="WHITEPAPER" target="_blank" class="font-medium">
                White Paper
              </a>
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

          <div class="m-t-30">
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
  </div>
</template>

<script>
import UiTabs from "~/components/ui-tabs/ui-tabs";
import UiTab from "~/components/ui-tabs/ui-tab";
import TradingView from "~/components/trading-view";
import { INDEXES, WHITEPAPER } from "~/global";
import UiPreloader from "~/components/ui/ui-preloader.global";
import TokenKznInfo from "~/components/token-kzn-info";

export default {
  name: "PageHomeOld",
  components: { TokenKznInfo, UiPreloader, TradingView, UiTab, UiTabs },
  layout: "public",
  data () {
    return {
      WHITEPAPER,
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

</style>
