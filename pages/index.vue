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
            <div>
              <span
                v-for="indice in cryptoindices"
                :key="indice"
              >
                {{ indice.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>

        <div class="cover-textbox">
          <h1 class="cover__title m-b-20">
            {{ $t(coverTitle) }}
          </h1>
          <div class="cover__desc m-b-40 lh-135">
            {{ $t("COVER_DESC") }}
          </div>
          <div class="cover__action">
            <nuxt-link
              :to="localePath(hasToken ? 'cabinet' : 'login')"
              class="btn btn-solid"
            >
              {{ $t(hasToken ? "CABINET" : "START_INVESTING") }}
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
              {{ $t("COVER_DESC") }}
            </div>
            <ul class="list font-bold">
              <li>{{ $t("CRYPTOCURRENCIES").toUpperCase() }}</li>
              <li>{{ $t("EXCHANGES").toUpperCase() }}</li>
              <li>{{ $t("TOP_COMPANIES").toUpperCase() }}</li>
            </ul>
          </div>
          <div class="info-chart__right">
            <div style="overflow: hidden; border-radius: 40px;">
              <img src="~/assets/images/graphic.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tariffs -->
    <div class="tariffs-section">
      <div class="container">
        <div class="tariffs-section__heading">
          <div class="h2 m-b-20">
            {{ $t("HOME_TARIFFS_TITLE") }}
          </div>
          <p class="m-b-40 lh-135">
            {{ $t("COVER_DESC") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data () {
    return {
      disabled: true,
      countIndices: 9,
      cryptoindices: ["kznc", "kznb", "kznr"]
    };
  },
  computed: {
    coverTitle () {
      return this.$t("COVER_TITLE").replace("%{COUNT}", this.countIndices);
    },
    hasToken () {
      return this.$store.getters.hasToken;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-home {
}

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
      font-size: 24px;
      color: var(--color-primary);
      @include fontTTNorms("bold");

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.cover-textbox {
  max-width: 563px;
  margin-left: 40px;
  margin-top: 60px;
}

.cover {
  margin-top: -60px;
  padding-top: 60px;
  padding-bottom: 100px;
  background: url("~/assets/images/cover.png") no-repeat 100% 50%;
  background-size: auto 110%;

  &__title {
    color: #1f2024;
    font-size: 48px;
    line-height: 54px;
    letter-spacing: -0.02em;
    font-weight: 600;
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
  padding: 60px 0;

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__left {
    width: 400px;
  }

  &__right {
    flex: 1;
    margin-left: 20px;
  }
}

.tariffs-section {
  &__heading {
    margin: auto;
    text-align: center;
    max-width: 500px;
  }
}

.h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.125em;
  color: #1F2024;
}
</style>
