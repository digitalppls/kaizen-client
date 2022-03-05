<template>
  <main class="main">
    <div class="industry-hero-section hero-section section-1">
      <div class="bg" />
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="coverTitle" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="coverDesc" />
        <nuxt-link
          :to="localePath(hasToken ? 'my' : 'auth')"
          class="btn btn-yellow animate__animated wow animate__fadeIn"
          data-wow-delay=".5s"
          v-text="`${$t('BUY')} SRK`"
        />
      </div>
    </div>
    <!-- Схема -->
    <div class="industry-scheme-section">
      <div class="container">
        <div class="scheme">
          <div class="scheme__body">
            <div class="scheme__blocks">
              <div class="scheme__block scheme__block-1">
                <div class="scheme__text">
                  {{ $t("SRK_REDEMPTION") }}
                </div>
                <div class="arrows">
                  <div class="custom-arrow white" />
                  <div class="red-line">
                    <div class="custom-arrow" />
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-2">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("EXCHANGE_WHERE") }}
                      <span class="accent">
                        {{ `${$t("TOKEN_IS_TRAIDED")} SRK` }}
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      {{ $t("USER_SENDS_TOKENS_TO_EXCHANGE") }}
                    </div>
                  </div>
                </div>
                <div class="arrows">
                  <div class="custom-arrow white" />
                  <div class="custom-arrow" />
                </div>
              </div>
              <div class="scheme__block scheme__block-3">
                <div class="scheme__card animate__animated wow animate__fadeIn">
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
              <div class="scheme__block scheme__block-4">
                <div class="arrows">
                  <div class="usdc">
                    <span>
                      USDC
                    </span>
                    <div class="custom-arrow white">
                      <div class="custom-arrow__item" />
                    </div>
                  </div>

                  <div class="vng">
                    <div class="custom-arrow">
                      <div class="custom-arrow__item" />
                    </div>
                    <span class="accent">
                      SRK
                    </span>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-5">
                <div class="scheme__card animate__animated wow animate__fadeIn">
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
              <div class="scheme__block scheme__block-6">
                <div class="scheme__text">
                  {{ $t("PRODUCTION_TEXT_1") }}
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-7">
                <div class="arrows">
                  <div class="custom-arrow" />
                  <div class="custom-arrow white" />
                </div>
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("CONVERSION") }} USDT
                      <span class="accent">
                        {{ $t("TO_FIAT_CURRENCY") }}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-8">
                <div class="custom-arrow" />
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("MANUFACTURING") }}
                      <span class="accent">
                        {{ $t("ENTERPRISE") }}
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-9">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      {{ $t("ACCUMULATION") }}
                      <span class="accent">
                        {{ $t("IN_FIAT_CURRENCY") }}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-10">
                <div class="red-line">
                  <div class="custom-arrow" />
                </div>
                <div class="scheme__text">
                  {{ $t("PART_OF_THE_FUNDS") }},
                  <span class="accent">
                    {{ $t("FOR_CONVERSION") }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="industry-data-section">
      <div class="container">
        <div id="story" :class="['story', {'hidden': storyHidden}]">
          <div class="story__text">
            <p class="animate__animated wow animate__fadeIn">
              {{ $t("PRODUCTION_TEXT_2")}}
            </p>
            <p class="animate__animated wow animate__fadeIn">
              {{ $t("PRODUCTION_TEXT_3")}}
            </p>
            <p class="animate__animated wow animate__fadeIn">
              {{ $t("PRODUCTION_TEXT_4")}}
            </p>
            <div class="story__hidden" :class="{ 'show_story': !storyHidden}">
              <p class="animate__animated wow animate__fadeIn">
                {{ $t("PRODUCTION_TEXT_5")}}
              </p>
              <p class="animate__animated wow animate__fadeIn">
                {{ $t("PRODUCTION_TEXT_6")}}
              </p>
            </div>
            <div class="story__new">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officia, atque soluta in minima qui
                vero explicabo labore
                adipisci est! Tempora quas, sit commodi in odit mollitia! Officiis sit obcaecati vel quos totam id
                eveniet porro hic deserunt in
                repudiandae vero aperiam voluptate doloremque dicta animi, earum, similique corporis? Optio.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis maxime iusto, sint iure perferendis
                illum quod nihil deserunt
                fugiat porro laborum voluptatibus alias, consectetur quae explicabo debitis numquam beatae earum ea
                possimus! Quasi, ipsum
                temporibus?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero facere delectus dignissimos officia
                quaerat repudiandae dolorum
                eveniet dolores non quod?
              </p>
            </div>
          </div>
          <button
            v-if="storyHidden"
            id="show_story"
            class="btn story__btn"
            @click="storyHidden = false"
          >
            {{ $t("READ_ALL") }}
          </button>
        </div>
        <div class="text animate__animated wow animate__fadeIn">
          {{ $t("PRODUCTION_TEXT_7")}}
        </div>
      </div>
    </div>

    <!-- Токеномика -->
    <div class="industry-tokenomic-section tokenomic-section">
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
                stroke-dasharray="2.7866 275.8727"
                stroke-dashoffset="69.6648"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#F0C149"
                stroke-width="11.3"
                stroke-dasharray="0.836 277.8233"
                stroke-dashoffset="66.8782"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#51ECA1"
                stroke-width="11.3"
                stroke-dasharray="41.7989 236.8604"
                stroke-dashoffset="66.022"
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
                stroke-dashoffset="24.2434"
              />
            </svg>
            <div class="number" v-text="'100 000 000 SRK'" />
          </div>
          <div class="diagram-box__legend">
            <ul>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".1s">
                Pre-sale
                <span class="number" v-text="'1%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".2s">
                IDO
                <span class="number" v-text="'0.3%'" />
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
                <span class="number" v-text="'78.3%'" />
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
            <span class="accent">100 000 000 SRK</span>
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
      storyHidden: true
    };
  },
  computed: {
    coverTitle () {
      return "SARY-ARKA INDUSTRY";
    },
    coverDesc () {
      return this.$t("PARTICIPATE_IN");
    },
    hasToken () {
      return this.$store.getters.hasToken;
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   if (process.browser) { // On the page mounted In the life cycle Instantiate according to the environment WOW
    //     // eslint-disable-next-line no-undef
    //     const { WOW } = require("wowjs");
    //     new WOW({
    //       offset: 50
    //       // mobile: false,
    //     }).init();
    //   }
    // });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

.story {
  &.hidden {
    .story__new p {
      font-size: 0 !important;
      margin: 0;
    }
  }

  &__hidden {
    &.show_story {
      -webkit-text-fill-color: unset;
    }
  }

  &__text p {
    font-size: 16px;
    line-height: 187%;
    margin-bottom: 40px;
  }

  &__new p {
    -webkit-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
  }
}


</style>
