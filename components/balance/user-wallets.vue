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
      <div v-if="!hideChart" class="user-wallets-box__right">
        <vc-donut
          foreground="#EAECEF"
          :size="175"
          unit="px"
          :thickness="25"
          has-legend
          legend-placement="right"
          :sections="sections"
          :total="total"
          :auto-adjust-text-size="true"
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
    mode: {
      type: String,
      default: "list",
      validator (value) {
        return ["list", "total"].includes(value);
      }
    },
    hideChart: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      colors: [
        {
          symbol: "usd",
          color: "#27a17a"
        },
        {
          symbol: "eth",
          color: "#627eea"
        },
        {
          symbol: "zlw",
          color: "#F9C910"
        },
        {
          symbol: "icw",
          color: "#000d57"
        },
        {
          symbol: "amc",
          color: "#ed1c27"
        },
        {
          symbol: "btc",
          color: "#f6931a"
        },
        {
          symbol: "doge",
          color: "#b39832"
        },
        {
          symbol: "bnb",
          color: "#e7b00f"
        },
        {
          symbol: "",
          color: "#82bb47"
        }
      ]
    };
  },
  computed: {
    wallets () {
      return this.$store.getters.wallets || [];
    },
    total () {
      return this.$store.getters.wallets.map(x => x.amount).reduce((a, b) => a + b, 0);
    },
    totalUSD () {
      return this.$store.getters.wallets.map(x => x.amountUsd).reduce((a, b) => a + b, 0);
    },
    sections () {
      const tmp = [];
      this.wallets.map((e) => {
        tmp.push({
          label: e.symbol,
          value: e.amount,
          color: this.colors.find(i => i.symbol === e.symbol).color
        });
        return e;
      });
      return tmp;
    },
    legend () {
      return this.sections.map((section, idx) => ({
        label: section.label || `Section ${idx + 1}`,
        value: section.value,
        percent: `${section.value} (${(section.value / this.total) * 100}%)`,
        styles: {
          backgroundColor: section.color
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
    margin: 0.5em;
    font-size: 15px;
    letter-spacing: -0.02em;
    @include fontTTNorms("medium");

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
