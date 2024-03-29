<template>
  <div class="user-wallets">
    <div class="user-wallets-box">
      <div :class="[{ 'user-wallets-box__left': !hideChart }]">
        <div class="m-b-40">
          <p class="accessed-value m-b-5">
            {{ $t("ASSESSED_VALUE") }}:
          </p>
          <p class="font-size-30 font-bold total__balance">
            {{ totalUSD.toLocaleString($i18n.locale, $LOCALESTRING(2, 3)) }}
            <span class="font-medium font-size-20">USDT</span>
          </p>
        </div>
        <ul class="list list--none">
          <li
            v-for="(wallet, idx) in wallets"
            :key="idx"
          >
            <!--            <img-->
            <!--              v-if="false"-->
            <!--              :src="require(`~/assets/img/tokens/icon-${wallet.symbol}.svg?inline`)"-->
            <!--              :alt="wallet.symbol.toUpperCase()"-->
            <!--              :title="wallet.symbol.toUpperCase()"-->
            <!--              style="height: 21px; display: inline-block; vertical-align: middle; margin-right: 3px;"-->
            <!--            >-->
            <span style="display: inline-block; vertical-align: middle;">
              <strong class="font-size-14 color-orange m-r-10">{{ wallet.symbol.toUpperCase() }}:</strong>
              <span class="font-medium font-size-14 color-white m-r-5">
                {{ wallet.amount.toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
              </span>
              <small class="font-size-14 color-white">
                <span class="m-r-5">~</span>
                ${{ $toUsd(wallet.symbol, wallet.amount).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
              </small>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="!hideChart && total" class="user-wallets-box__right">
        <vc-donut
          :background="'#151618'"
          :foreground="'#EAECEF'"
          :size="225"
          :thickness="40"
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
                <span class="cdc-legend-item-label color-white">
                  {{ item.label.toUpperCase() }}
                </span>
                <span class="cdc-legend-item-value" :style="{ color: item.styles.backgroundColor}">
                  {{ item.value.toLocaleString($i18n.locale, $LOCALESTRING()) }}
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
    },
    sales: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      tokenColors: {
        kzn: "#44f3ff",
        vng: "#ffdc82",
        srk: "#ff434e",
        usdt: "#099169",
        usd: "#099169",
        btc: "#f69014"
      },
      defaultColors: [
        // "#bfea44", "#f0c149", "#fff", "#f58231", "#46f0f0", "#d2f53c", "#911eb4", "#f032e6",
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
      const sections = [];
      let currentDefaultColorIdx = 0;

      this.wallets.map((e) => {
        let color = this.defaultColors[currentDefaultColorIdx++];
        for (const symbol in this.$TokenColors) {
          if (e.symbol === symbol) {
            if (Object.hasOwnProperty.call(this.$TokenColors, symbol)) {
              color = this.$TokenColors[symbol];
            }
          }
        }

        sections.push({
          label: e.symbol,
          value: (e.amount / this.total) * 100, // в процентах
          color
        });
        return e;
      });
      return sections;
    },
    legend () {
      // let currentDefaultColorIdx = 0;
      return this.sections.map((section, idx) => ({
        label: section.label || `Section ${idx + 1}`,
        value: (section.value * this.total) / 100, // обратно преодразовываем из процентов в кол-во токенов
        percent: `${section.value.toLocaleString()}%`, // (${((section.value * this.total) / 100).toLocaleString(this.$i18n.locale, this.$LOCALESTRING())})`,
        styles: { backgroundColor: section.color /* this.defaultColors[currentDefaultColorIdx++] */ }
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
      align-items: center;
    }

    &__left {
      margin-bottom: 30px;

      @include respond-before("md") {
        width: 35%;
        margin-bottom: 0;
      }
      @include respond-before("xl") {
        width: 30%;
      }
    }

    &__right {
      @include respond-before("md") {
        width: 65%;
      }
      @include respond-before("xl") {
        width: 60%;
        margin-left: 10%;
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
    margin: 0 0 0 2em;
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
      //margin-left: auto;
    }
  }
}

.total {
  &__balance {
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
    letter-spacing: -0.02em;
    color: #f5cf48;
  }
}

.color-orange {
  color: #f5cf48;
}
</style>
