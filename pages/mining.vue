<template>
  <main class="main">
    <div class="mining-hero-section hero-section">
      <div class="bg" />
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="coverTitle" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="coverDesc" />
        <nuxt-link
          :to="localePath(hasToken ? 'my' : 'auth')"
          class="btn btn-yellow animate__animated wow animate__fadeIn"
          data-wow-delay=".5s"
          v-text="`${$t('BUY')} VNG`"
        />
      </div>
    </div>
    <!-- Схема -->
    <div class="mining-scheme-section">
      <div class="container">
        <div class="scheme">
          <div class="scheme__text">
            <span class="accent">
              {{ $t("KAIZEN_REDEEMS_TOKENS") }}
            </span>
            {{ $t("TO_MAINTAIN") }}
          </div>
          <div class="scheme__body">
            <div class="scheme__body-right-line">
              <div class="custom-arrow" />
            </div>
            <div class="scheme__body-left-line">
              <div class="custom-arrow" />
            </div>
            <div class="scheme__blocks">
              <div class="scheme__block scheme__block-1">
                <div class="scheme__card animate__animated wow animate__fadeInUp">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("EXCHANGE_WHERE") }}
                      <span class="accent">
                        {{ `${$t("TOKEN_IS_TRAIDED")} VNG` }}
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      {{ $t("USER_SENDS_TOKENS_TO_EXCHANGE") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-2">
                <div class="scheme__card animate__animated wow animate__fadeInUp">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("BTC_MINING") }}
                      <span class="accent">
                        {{ $t("AND_OTHER_CRYPTOCURRENCIES") }}
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      {{ $t("VANGUARD_DATA_CENTER") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-3">
                <div class="custom-arrow">
                  <span class="custom-arrow__item" />
                </div>
                <span class="accent">
                  {{ $t("VNG") }}
                </span>
              </div>
              <div class="scheme__block scheme__block-4">
                <div class="custom-arrow" />
                <div class="scheme__card animate__animated wow animate__fadeInUp">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("CONVERSION") }}
                      <span class="accent">
                        {{ $t("BTC_TO_USDC") }}
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-5">
                <div class="scheme__card animate__animated wow animate__fadeInUp">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("PERSONAL_ACCOUNT") }}
                      <span class="accent">
                        {{ $t("OF_THE_INVESTOR") }}
                      </span>
                    </h3>
                  </div>
                  <img src="~/assets/img/logo.svg" alt="">
                </div>
              </div>
              <div class="scheme__block scheme__block-6">
                <div class="usdc">
                  <span>
                    USDC
                  </span>
                  <div class="custom-arrow">
                    <div class="custom-arrow__item" />
                  </div>
                </div>
                <div class="vng">
                  <div class="custom-arrow">
                    <div class="custom-arrow__item" />
                  </div>

                  <span class="accent">
                    VNG
                  </span>
                </div>
              </div>
              <div class="scheme__block scheme__block-7">
                <div class="scheme__card animate__animated wow animate__fadeInUp">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("PLATFORM") }}
                      <span class="accent">
                        KAIZEN
                      </span>
                    </h3>
                  </div>
                  <img src="~/assets/img/logo.svg" alt="">
                </div>
              </div>
            </div>
            <div class="scheme__diagrams">
              <div class="scheme__diagram animate__animated wow animate__fadeInLeft">
                <div class="scheme__diagram-img">
                  <div class="progress">
                    <img src="~/assets/img/mining-scheme-diagram-yellow.svg" alt="">
                  </div>
                  <span class="number accent">
                    70%
                  </span>
                </div>
                <div class="scheme__diagram-content">
                  <div class="scheme__diagram-title">
                    {{ $t("LIQUIDITY_POOL") }}
                  </div>
                  <div class="scheme__diagram-text">
                    {{ $t("LIQUIDITY_POOL_FOR") }}
                  </div>
                </div>
              </div>
              <div class="scheme__diagram animate__animated wow animate__fadeInLeft">
                <div class="scheme__diagram-img">
                  <div class="progress">
                    <img src="~/assets/img/mining-scheme-diagram-green.svg" alt="">
                  </div>
                  <span class="number">
                    30%
                  </span>
                </div>
                <div class="scheme__diagram-content">
                  <div class="scheme__diagram-title">
                    {{ $t("TRANSACTION_COSTS") }}
                  </div>
                  <div class="scheme__diagram-text">
                    {{ $t("COMPANY_COSTS") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="mining-data-section">
      <div class="container">
        <div class="content">
          <h2 class="title animate__animated wow animate__fadeInUp" v-html="content.title" />
          <div class="text">
            <p class="animate__animated wow animate__fadeInLeft" v-html="content.text_1" />
            <p class="animate__animated wow animate__fadeInLeft" v-html="content.text_2" />
          </div>
          <div class="text-white animate__animated wow animate__fadeInLeft" v-html="content.text_3" />
        </div>
        <div class="img animate__animated wow animate__fadeInRight">
          <img src="~/assets/img/mining-data.jpg" alt="">
        </div>
      </div>
    </div>

    <!-- Токеномика -->
    <div class="mining-tokenomic-section tokenomic-section">
      <div class="container">
        <div class="diagram-box">
          <div class="diagram-box__diagram animate__animated wow animate__slideInLeft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              class="svg-diagram"
            >
              <circle
                class="svg-diagram__ring"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#fff"
                stroke-width="11.3"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#BFEA44"
                stroke-width="11.3"
                stroke-dasharray="41.79889 236.860378"
                stroke-dashoffset="69.664817"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#F0C149"
                stroke-width="11.3"
                stroke-dasharray="9.359778 269.29949"
                stroke-dashoffset="27.865927"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#51ECA1"
                stroke-width="11.3"
                stroke-dasharray="42.7989 236.8604"
                stroke-dashoffset="19.5061"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#629CF2"
                stroke-width="11.3"
                stroke-dasharray="13.933 264.7263"
                stroke-dashoffset="-22.2927"
              />
            </svg>
            <div class="number" v-text="'10 000 000 VNG'" />
          </div>
          <div class="diagram-box__legend">
            <ul>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".1s">
                Pre-sale
                <span class="number" v-text="'15%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".2s">
                IDO
                <span class="number" v-text="'3%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".3s">
                Company Wallet
                <span class="number" v-text="'15%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".4s">
                Compensation fund
                <span class="number" v-text="'5%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".5s">
                Public sale
                <span class="number" v-text="'62%'" />
              </li>
            </ul>
          </div>
        </div>
        <div class="content animate__animated wow animate__slideInUp">
          <h2 class="title">
            {{ $t("TOKENOMICS") }}
          </h2>
          <div class="amount">
            <span>{{ $t("TOKEN_AMOUNT") }}</span>
            <span class="accent">10 000 000 VNG</span>
          </div>
          <div class="text">
            {{ $t("ISSUANCE") }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: "PageMining",
  layout: "public",
  data () {
    return {
      content: {
        title: this.$t("MINING_CONTENT.TITLE"),
        text_1: this.$t("MINING_CONTENT.TEXT_1"),
        text_2: this.$t("MINING_CONTENT.TEXT_2"),
        text_3: this.$t("MINING_CONTENT.TEXT_3")
      }
    };
  },
  computed: {
    coverTitle () {
      return this.$t("MINING_COVER_TITLE");
    },
    coverDesc () {
      return this.$t("MINING_COVER_DESC");
    },
    hasToken () {
      return this.$store.getters.hasToken;
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) { // On the page mounted In the life cycle Instantiate according to the environment WOW
        // eslint-disable-next-line no-undef
        const { WOW } = require("wowjs");
        new WOW({
          offset: 50
          // mobile: false,
        }).init();
      }
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
