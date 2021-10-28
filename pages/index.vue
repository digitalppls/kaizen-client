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
                v-for="(indice, idx) in cryptoindices"
                :key="idx"
              >
                {{ indice.symbol.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>

        <div class="cover-textbox">
          <h1 class="cover__title m-b-20">
            {{ coverTitle }}
          </h1>
          <div class="cover__desc m-b-40 lh-135">
            {{ $t("COVER_DESC") }}
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

        <div class="tariffs__wrap">
          <div class="tariffs">
            <div class="tariff">
              <div class="tariff__header">
                <div class="tariff__header__icon">
                  <svg width="40" height="29" viewBox="0 0 40 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.5879 0L6.31436 13.5057L18.5879 29H11.0896L0.157859 15.2043L0 12.1386L11.0896 0H18.5879Z"
                      fill="#58C1B9"
                    />
                    <path
                      d="M35.9882 0L23.4778 25.9757H35.9882V29H14.5193L27.0691 3.02429H14.4799V0H35.9882Z"
                      fill="#58C1B9"
                    />
                    <path
                      d="M40 5.42714V29H32.5412V0H40V5.42714Z"
                      fill="#58C1B9"
                    />
                  </svg>
                </div>
                <div class="tariff__header__cnt">
                  <div class="font-bold font-size-22" style="color: #000;">
                    BUZ Crypto
                  </div>
                  <div class="small">
                    {{ $t("TOKEN") }} BUZC
                  </div>
                </div>
              </div>
              <div class="tariff__body">
                <div class="tariff__row" data-data="33%">
                  <img :src="require('~/assets/images/bitcoin.png')" alt="">
                </div>
                <div class="tariff__row" data-data="33%">
                  <img :src="require('~/assets/images/ethereum.png')" alt="">
                </div>
                <div class="tariff__row" data-data="33%">
                  <img :src="require('~/assets/images/ripple.png')" alt="">
                </div>
                <div class="tariff__price">
                  <div class="tariff__price__l">
                    <div class="small">
                      {{ $t("COST") }}:
                    </div>
                    <div class="font-bold font-size-36 color-black">
                      $300
                    </div>
                  </div>
                  <div class="tariff__price__r">
                    <div class="info-btn">
                      <img :src="require('~/assets/img/icon-i.png')" alt="">
                    </div>
                  </div>
                </div>
                <nuxt-link
                  :to="localePath('auth')"
                  class="btn btn-solid btn-full"
                >
                  {{ $t("JOIN") }}
                </nuxt-link>
              </div>
            </div>

            <div class="tariff">
              <div class="tariff__header">
                <div class="tariff__header__icon">
                  <svg width="40" height="29" viewBox="0 0 40 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.5879 0L6.31436 13.5057L18.5879 29H11.0896L0.157859 15.2043L0 12.1386L11.0896 0H18.5879Z"
                      fill="#99C158"
                    />
                    <path
                      d="M35.9882 0L23.4778 25.9757H35.9882V29H14.5193L27.0691 3.02429H14.4799V0H35.9882Z"
                      fill="#99C158"
                    />
                    <path
                      d="M40 5.42714V29H32.5412V0H40V5.42714Z"
                      fill="#99C158"
                    />
                  </svg>
                </div>
                <div class="tariff__header__cnt">
                  <div class="font-bold font-size-22" style="color: #000;">
                    BUZ Blockchain
                  </div>
                  <div class="small">
                    {{ $t("TOKEN") }} BUZB
                  </div>
                </div>
              </div>
              <div class="tariff__body">
                <div class="tariff__row">
                  <img :src="require('~/assets/images/polkadot.png')" alt="">
                </div>
                <div class="tariff__row">
                  <img :src="require('~/assets/images/uniswap.png')" alt="">
                </div>
                <div class="tariff__row">
                  <img :src="require('~/assets/images/pancakeswap.png')" alt="">
                </div>
                <div class="tariff__price">
                  <div class="tariff__price__l">
                    <div class="small">
                      {{ $t("COST") }}:
                    </div>
                    <div class="font-bold font-size-36 color-black">
                      $200
                    </div>
                  </div>
                  <div class="tariff__price__r">
                    <div class="info-btn">
                      <img :src="require('~/assets/img/icon-i.png')" alt="">
                    </div>
                  </div>
                </div>
                <nuxt-link
                  :to="localePath('auth')"
                  class="btn btn-solid btn-solid--secondary btn-full"
                >
                  {{ $t("JOIN") }}
                </nuxt-link>
              </div>
            </div>

            <div class="tariff">
              <div class="tariff__header">
                <div class="tariff__header__icon">
                  <svg width="40" height="29" viewBox="0 0 40 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.5879 0L6.31436 13.5057L18.5879 29H11.0896L0.157859 15.2043L0 12.1386L11.0896 0H18.5879Z"
                      fill="#7358C1"
                    />
                    <path
                      d="M35.9882 0L23.4778 25.9757H35.9882V29H14.5193L27.0691 3.02429H14.4799V0H35.9882Z"
                      fill="#7358C1"
                    />
                    <path
                      d="M40 5.42714V29H32.5412V0H40V5.42714Z"
                      fill="#7358C1"
                    />
                  </svg>
                </div>
                <div class="tariff__header__cnt">
                  <div class="font-bold font-size-22" style="color: #000;">
                    BUZ Real
                  </div>
                  <div class="small">
                    {{ $t("TOKEN") }} BUZR
                  </div>
                </div>
              </div>
              <div class="tariff__body">
                <div class="tariff__row">
                  <img :src="require('~/assets/images/apple.png')" alt="">
                </div>
                <div class="tariff__row">
                  <img :src="require('~/assets/images/google.png')" alt="">
                </div>
                <div class="tariff__row">
                  <img :src="require('~/assets/images/netflix.png')" alt="">
                </div>
                <div class="tariff__price">
                  <div class="tariff__price__l">
                    <div class="small">
                      {{ $t("COST") }}:
                    </div>
                    <div class="font-bold font-size-36 color-black">
                      $100
                    </div>
                  </div>
                  <div class="tariff__price__r">
                    <div class="info-btn">
                      <img :src="require('~/assets/img/icon-i.png')" alt="">
                    </div>
                  </div>
                </div>
                <nuxt-link
                  :to="localePath('auth')"
                  class="btn btn-solid btn-solid--tertiary btn-full"
                >
                  {{ $t("JOIN") }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="container">
      <div class="roadmap-section">
        <div class="roadmap-section__l">
          <div class="h2 m-b-20">
            {{ $t("HOME_ROADMAP_TITLE") }}
          </div>
          <p class="m-b-40 lh-135">
            {{ $t("COVER_DESC") }}
          </p>
        </div>
        <div class="roadmap-section__r">
          <div class="timeline">
            <div
              v-for="(item, idx) in timeline"
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
</template>

<script>

export default {
  name: "Home",
  layout: "public",
  data () {
    return {
      disabled: true,
      countIndices: 9,
      timeline: [
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
        }
      ]
    };
  },
  computed: {
    coverTitle () {
      return this.$t("COVER_TITLE").replace("%{COUNT}", this.countIndices);
    },
    hasToken () {
      return this.$store.getters.hasToken;
    },
    cryptoindices () {
      return this.$store.getters.currency.filter(e => e.index);
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
      font-size: 48px;
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
  padding: 60px 0 80px;

  &__wrap {
    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &__left {
    margin-bottom: 30px;

    @include respond-before("md") {
      width: 400px;
      margin-bottom: 0;
    }
  }

  &__right {
    @include respond-before("md") {
      flex: 1;
      margin-left: 20px;
    }
  }
}

.tariffs-section {
  &__heading {
    margin: auto;
    text-align: center;
    max-width: 500px;
  }
}

.tariff {
  $self: &;

  &s {
    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
    }

    &__wrap {
      margin: auto;
      max-width: 985px;
    }
  }

  & {
    margin-bottom: 30px;

    @include respond-before("md") {
      margin: 0 10px;
      width: 30%;
    }

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
  }

  &__row {
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
    @include respond-before("md") {
      @include respond-to("lg") {
        font-size: 13px;
      }
    }
  }
}

.roadmap-section {
  padding: 160px 0 70px;
  max-width: 1000px;

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
