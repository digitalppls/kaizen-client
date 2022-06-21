<template>
  <section
    :id="symbol"
    class="balance-info"
  >
    <div class="balance-info__top">
      <div>
        <h3 class="color-white m-b-5">
          {{ tokenName }}

          <template v-if="symbol !== 'vng'">
            {{ symbol.toUpperCase() }}
          </template>
        </h3>
      </div>
      <div class="m-l-a">
        <button
          :class="['btn', {'btn-blue': symbol === 'kzn'}, {'btn-yellow': symbol === 'vng'}, {'btn-red': symbol === 'srk'}]"
          :disabled="!isCurrent"
          @click="openModal('buy')"
        >
          {{ $t("BUY") }}
        </button>
        <button
          :disabled="!isCurrent"
          class="btn btn-dark btn-small btn_set-opacity"
          @click="openModal('sell')"
        >
          {{ $t("SELL") }}
        </button>
      </div>
    </div>
    <div class="user-wallets-box">
      <div class="user-wallets-box__left">
        <div class="m-b-40">
          <p class="m-b-10 accessed-value">
            {{ $t("PRICE") }}:
          </p>
          <span class="price">
            <span class="price__item">${{ priceUsd }}</span>
            <span class="price__item small" style="color: #898b8c;">{{ (priceUsd * btcPerUsd).toFixed(7) }} BTC</span>
            <span class="price__item small" style="color: #898b8c;">{{ (priceUsd * bnbPerUsd).toFixed(7) }} BNB</span>
          </span>
        </div>
        <div class="m-b-20">
          <p class="m-b-10 accessed-value">
            {{ $t("AVAILABLE") }}:
          </p>
          <span class="color-white font-bold font-size-24">
            {{ totalSupplyView.toLocaleString($i18n.locale) }} {{ symbol.toUpperCase() }}
          </span>
        </div>
        <div class="m-b-20">
          <div class="m-b-10 accessed-value">
            {{ $t("BALANCE") }}:
          </div>
          <span class="font-size-24 font-bold color-white m-r-5">
            {{ balance.toLocaleString($i18n.locale, $LOCALESTRING()) }}
            <span class="font-medium font-size-14">{{ symbol.toUpperCase() }}</span>
          </span>
          <small class="color-white font-size-14">
            <span class="m-r-5">~</span>
            ${{ $toUsd(symbol.toUpperCase(), balance).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
          </small>
        </div>

        <!-- Доля токенов -->
        <div>
          <div class="m-b-10 accessed-value">
            {{ $t("YOUR_SHARE_OF_TOKEN") }} {{ symbol.toUpperCase() }}:
          </div>
          <span class="font-size-24 font-bold color-white m-r-5">
            {{ mySharePercent.toLocaleString($i18n.locale, $LOCALESTRING_PERCENT(1, 8)) }}
          </span>
        </div>
      </div>
      <div class="user-wallets-box__right">
        <vc-donut
          :background="'#151618'"
          :foreground="'#EAECEF'"
          :size="225"
          :thickness="40"
          has-legend
          legend-placement="right"
          :sections="rounds"
        >
          <template #legend>
            <div class="cdc-legend">
              <div
                v-for="(item, idx) in rounds"
                :key="idx"
                :title="item.percent"
                class="cdc-legend-item"
              >
                <span
                  class="cdc-legend-item-color"
                  :style="item.style"
                />
                <span
                  class="cdc-legend-item-label m-r-5 color-white"
                  style="text-transform: uppercase;"
                >
                  {{ item.label }}
                </span>
                <span
                  class="cdc-legend-item-value"
                  :style="{ color: item.style.backgroundColor}"
                >
                  {{ item.percent.toLocaleString($i18n.locale, $LOCALESTRING_PERCENT(0, 2)) }}
                </span>
              </div>
            </div>
          </template>
        </vc-donut>
        <ui-modal
          v-if="showModal"
          @close="closeModal"
        >
          <token-swap
            type="token"
            :input-currency="symbol"
            :sale="currentSale"
            :mode="modal"
          />
        </ui-modal>
      </div>
    </div>
  </section>
</template>

<script>
import TokenSwap from "../token-swap";
import UiModal from "../ui/ui-modal.global";

export default {
  name: "BalanceInfoToken",
  components: { UiModal, TokenSwap },
  props: {
    symbol: {
      type: String,
      default: ""
    },
    sale: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      showModal: false,
      modal: ""
    };
  },
  computed: {
    rounds () {
      return this.sale
        .sort((a, b) => a.round > b.round ? 1 : -1)
        .map((item) => {
          const e = {...item};
          e.label = this.$nameRoundByType(item.type);
          e.percent = item.maxValue / this.totalSupply;
          e.color = this.$RoundColors[item.type];
          e.style = { backgroundColor: this.$RoundColors[item.type] };
          e.v = item.value;
          e.value = item.maxValue / this.totalSupply * 100;
          return e;
        });
    },
    /* Доля моих токенов */
    mySharePercent () {
      if (!this.balance || !this.totalSupply) {
        return 0;
      }
      return this.balance / this.totalSupply;
    },
    /* Активный этап продаж */
    currentSale () {
      return this.sale.find(x => x.isCurrent);
    },
    tokenName () {
      return this.currentSale?.name ?? "";
    },
    priceUsd () {
      return this.currentSale?.priceUsd ?? 0;
    },
    /* Активны ли продажи?
     * Если нет - блокируем кнопки покупки/продажи
     */
    isCurrent () {
      return this.currentSale?.isCurrent ?? false;
    },
    totalSupply () {
      return this.sale.map(x => x.maxValue).reduce((a, b) => a + b, 0);
    },
    /* Чисто для вывода на фронте */
    totalSupplyView () {
      const total = this.sale.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.maxValue).reduce((a, b) => a + b, 0);
      const value = this.rounds.filter(e => !["owner_fund", "reward_fund"].includes(e.type)).map(x => x.v).reduce((a, b) => a + b, 0)
      return total - value;
    },
    value () {
      return this.currentSale?.value ?? 0;
    },
    balance () {
      return this.$store.getters.wallets.find(e => e.symbol === this.symbol)?.amount ?? 0;
    },
    btcPerUsd () {
      const n = this.$store.getters.currency.filter(e => e.symbol === "BTCUSDT")[0]?.price || "...";
      return n !== "..." ? (1 / n) : n;
    },
    bnbPerUsd () {
      const n = this.$store.getters.currency.filter(e => e.symbol === "BNBUSDT")[0]?.price || "...";
      return n !== "..." ? (1 / n) : n;
    }
  },
  methods: {
    /** Открыть модальное окно */
    openModal (modal) {
      this.showModal = true;
      this.modal = modal;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.modal = "";
    },
  }
};
</script>

<style
  lang="scss"
  scoped
>
@import "/assets/scss/components/balance-info.scss";

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
    min-width: 250px;

    @include respond-before("md") {
      @include respond-to("xl") {
        font-size: 12px;
        min-width: 200px;
      }
    }

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

.price {
  font-weight: bold;
  font-size: 30px;
  letter-spacing: -0.02em;
  color: #f5cf48;
  display: flex;
  flex-direction: column;

  &__item {
    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &.small {
      font-weight: normal;
      font-size: 0.7em;
    }
  }
}

</style>

