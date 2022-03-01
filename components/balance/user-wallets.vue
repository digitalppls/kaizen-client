<template>
  <div class="user-wallets">
    <div class="user-wallets-box">
      <div :class="[{ 'user-wallets-box__left': !hideChart }]">
        <div class="total m-b-20">
          <div>
            {{ $t("ASSESSED_VALUE") }}:
          </div>
          <div class="font-size-30 font-bold">
            {{ totalUSD.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO()) }}
            <span class="font-medium font-size-14">USDT</span>
          </div>
        </div>
        <ul class="list list--none">
          <li
            v-for="(wallet, idx) in wallets"
            :key="idx"
          >
            <img
              v-if="false"
              :src="require(`~/assets/img/tokens/icon-${wallet.symbol}.svg?inline`)"
              :alt="wallet.symbol.toUpperCase()"
              :title="wallet.symbol.toUpperCase()"
              style="height: 21px; display: inline-block; vertical-align: middle; margin-right: 3px;"
            >
            <span style="display: inline-block; vertical-align: middle;">
              <strong>{{ wallet.symbol.toUpperCase() }}:</strong>
              <span class="font-medium">
                {{ wallet.amount.toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
              </span>
              <small class="color-gray">
                ≈ ${{ $toUsd(wallet.symbol, wallet.amount).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
              </small>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="!hideChart && total" class="user-wallets-box__right">
        <vc-donut
          background="#1F2124"
          foreground="transparent"
          :size="175"
          :thickness="25"
          has-legend
          legend-placement="right"
          :sections="sections"
        >
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
                  {{ item.label.toUpperCase() }}
                </span>
                <span class="cdc-legend-item-value">
                  {{ item.value.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO()) }}
                </span>
              </div>
            </div>
          </template>
        </vc-donut>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserWallets",
  props: {
    hideChart: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultColors: [
        "#ff6384", "#36a2eb", "#ffce56", "#f58231", "#46f0f0", "#d2f53c", "#911eb4", "#f032e6",
        "#3cb44b", "#ffe119", "#e6194b", "#fabebe", "#008080", "#e6beff", "#0082c8", "#aa6e28",
        "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000080", "#808080", "#000"
      ]
    };
  },
  computed: {
    wallets () {
      return this.$store.getters.wallets || [];
    },
    total () {
      return this.$store.getters.wallets.map(x => x.amount).reduce((a, b) => a + b, 0); // +1 нужен для корректного отображения графика
    },
    totalUSD () {
      return this.$store.getters.wallets.map(x => this.$toUsd(x.symbol, x.amount)).reduce((a, b) => a + b, 0);
    },
    sections () {
      const tmp = [];
      let currentDefaultColorIdx = 0;
      this.wallets.map((e) => {
        tmp.push({
          label: e.symbol,
          value: (e.amount / this.total) * 100, // в процентах
          color: this.defaultColors[currentDefaultColorIdx++]
        });
        return e;
      });
      return tmp;
    },
    legend () {
      let currentDefaultColorIdx = 0;
      return this.sections.map((section, idx) => ({
        label: section.label || `Section ${idx + 1}`,
        value: (section.value * this.total) / 100, // обратно преодразовываем из процентов в кол-во токенов
        percent: `${section.value.toLocaleString()}%`, // (${((section.value * this.total) / 100).toLocaleString(this.$i18n.locale, this.$LOCALESTRING_CRYPTO())})`,
        styles: {
          backgroundColor: this.defaultColors[currentDefaultColorIdx++]
        }
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.user-wallets {
  &-box {
    @include respond-before("md") {
      display: flex;
      flex-wrap: wrap;
    }

    &__left {
      margin-bottom: 30px;

      @include respond-before("md") {
        width: 35%;
        margin-bottom: 0;
      }
      @include respond-before("xl") {
        width: 45%;
      }
    }

    &__right {
      @include respond-before("md") {
        width: 65%;
      }
      @include respond-before("xl") {
        width: 55%;
      }

      .cdc-container {
        justify-content: left;
      }
    }
  }
}

.cdc-container {
  @include respond-to("md") {
    display: block;
  }
}

.cdc-legend {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  @include respond-before("md") {
    margin: 0 0 0 1em;
  }

  &-item {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
    font-size: 15px;
    letter-spacing: -0.02em;

    &-color {
      height: .75em;
      width: .75em;
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

</style>
