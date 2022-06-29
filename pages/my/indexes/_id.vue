<template>
  <div class="index-page">
    <div class="index-page__header m-b-20">
      <div class="index-page__header__l">
        <h1 class="title">
          {{ id }}
        </h1>
      </div>
      <!--      <div class="index-page__header__r">-->
      <!--        <button class="btn btn-blue btn-medium" @click="openModal('buy')">-->
      <!--          {{ $t("BUY") }}-->
      <!--        </button>-->
      <!--        <button-->
      <!--          class="btn btn-red btn-medium"-->
      <!--          :disabled="disableSell"-->
      <!--          @click="openModal('sell')"-->
      <!--        >-->
      <!--          {{ $t("SELL") }}-->
      <!--        </button>-->
      <!--      </div>-->
    </div>

    <div class="index-page__data m-b-30">
      <div class="index-page__data-item m-b-10">
        <div class="font-medium font-size-20 color-main">
          {{ marketCap.toLocaleString("en-US", $LOCALESTRING_USD(0, 0)) }}
        </div>
        <div class="small">
          {{ $t("MARKET_CAP") }}
        </div>
      </div>
      <div class="index-page__data-item m-b-10">
        <div class="font-medium font-size-20 color-main">
          <template v-if="indexData.inception_date">
            {{ indexData.inception_date.toLocaleDateString($i18n.locale, localeDateStringOptions) }}
          </template>
          <template v-else>
            {{ $t("N/A") }}
          </template>
        </div>
        <div class="small">
          {{ $t("INCEPTION_DATE") }}
        </div>
      </div>
    </div>

    <!-- График -->
    <trading-view
      container-id="tradingview"
      :options="options"
      style="height: 500px;"
    />

    <!-- Портфолио -->
    <vue-good-table
      :rows="id === 'CRYPTO100' ? rows100 : rows"
      :columns="columns"
      style-class="vgt-table vgt-table--dark"
      :line-numbers="true"
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'name'">
          <div class="font-500 m-b-10">
            {{ props.row.name }}
          </div>
          <div :style="{width: props.row.weight + '%', backgroundColor: 'var(--col-yellow)', height: '5px'}" />
        </div>
        <div v-else-if="props.column.field == 'weight'">
          {{ props.row.weight.toLocaleString($i18n.locale) }}%
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
    <div v-if="id === 'CRYPTO100' && rows100.length <= 5" class="text-center">
      <button
        class="btn-show-all font-medium"
        @click="showAll"
      >
        {{ $t("SHOW_ALL") }}
      </button>
    </div>

    <!-- Информация -->
    <div class="index-page__info m-t-40">
      <div class="index-page__info-item m-b-10">
        <div class="index-page__info-item__label m-b-5">
          {{ $t("MARKET_PRICE") }}
        </div>
        <div class="index-page__info-item__value font-bold">
          {{ currency.price.toLocaleString("en-US", $LOCALESTRING_USD()) }}
        </div>
      </div>
      <div class="index-page__info-item m-b-10">
        <div class="index-page__info-item__label m-b-5">
          {{ $t("CAPITALIZATION") }}
        </div>
        <div class="index-page__info-item__value font-bold">
          {{ marketCap.toLocaleString("en-US", $LOCALESTRING_USD()) }}
        </div>
      </div>
      <div class="index-page__info-item m-b-10">
        <div class="index-page__info-item__label m-b-5">
          {{ $t("PRICE_CHANGE") }}
        </div>
        <div class="index-page__info-item__value font-bold">
          {{ (priceDiff).toLocaleString("en-US", $LOCALESTRING_USD()) }}
          / {{ (priceDiff / currency.price).toLocaleString("en-US", $LOCALESTRING_PERCENT()) }}
        </div>
      </div>
    </div>

    <!-- Описание -->
    <div v-if="indexData.desc" class="index-page__desc m-t-40">
      <h3 class="color-white m-b-20">
        {{ $t("DESCRIPTION") }}
      </h3>
      <div class="lh-135" v-html="$t(indexData.desc)" />
    </div>

    <!-- Методология -->
    <div v-if="id !== 'DEFI'" class="index-page__methodology m-t-40">
      <h3 class="color-white m-b-20">
        {{ $t("METHODOLOGY") }}
      </h3>
      <div v-if="id === 'KAIZEN'">
        <div class="lh-135" v-html="$t('KAIZEN_METHODOLOGY')" />
        <div class="display-flex ai--center m-t-20">
          <img :src="require('~/assets/images/icon-coins.svg?inline')" alt="" class="m-r-10">
          {{ $t("KAIZEN_METHODOLOGY_ITEM_1") }}
        </div>
        <div class="display-flex ai--center m-t-20">
          <img :src="require('~/assets/images/icon-finance.svg?inline')" alt="" class="m-r-10">
          {{ $t("KAIZEN_METHODOLOGY_ITEM_2") }}
        </div>
        <div class="display-flex ai--center m-t-20">
          <img :src="require('~/assets/images/icon-time.svg?inline')" alt="" class="m-r-10">
          {{ $t("KAIZEN_METHODOLOGY_ITEM_3") }}
        </div>
      </div>
      <div v-else-if="id === 'COIN10'">
        <ul class="list m-b-20">
          <li
            v-for="i in 4"
            :key="i"
          >
            {{ $t(`COIN10_METHODOLOGY_ITEM_${i}`) }}
          </li>
        </ul>
        <div class="lh-135" v-html="$t('COIN10_METHODOLOGY')" />
      </div>
      <div v-else-if="id === 'CRYPTO100'">
        <ul class="list m-t-20">
          <li
            v-for="i in 8"
            :key="i"
          >
            {{ $t(`CRYPTO100_METHODOLOGY_ITEM_${i}`) }}
          </li>
        </ul>
      </div>
      <!-- у Defi не нашел методологию -->
    </div>

    <!-- Модальные окна -->
    <ui-modal
      v-if="showModal"
      @close="showModal = false"
    >
      <token-swap :input-currency="id.toLowerCase()" type="index" :mode="mode" />
    </ui-modal>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import TradingView from "~/components/trading-view";
import TokenSwap from "~/components/token-swap";
import { INDEXES } from "~/global";

export default {
  name: "IndexPage",
  components: { TokenSwap, TradingView, VueGoodTable },
  data () {
    return {
      showModal: false,
      mode: "",
      loading: false,
      marketCap: 0,
      columns: [
        {
          label: this.$t("NAME"),
          field: "name",
          sortable: false
        },
        {
          label: this.$t("WEIGHT"),
          field: "weight",
          sortable: false
        }
      ],
      rows100: [],
      priceDiff: 0,
      localeDateStringOptions: { year: "numeric", month: "short", day: "numeric" }
    };
  },
  computed: {
    /** Текущий индекс */
    id () {
      return this.$route.params?.id ?? "";
    },

    /** Формируем символ для графика */
    symbol () {
      if (this.id.toUpperCase() === "KAIZEN") {
        return "FTX:BITWUSD";
      } else if (this.id.toUpperCase() === "CRYPTO100") {
        return "CRYPTOINDEX:CIX100";
      } else if (this.id.toUpperCase() === "DEFI") {
        return "BINANCE:DEFIUSDTPERP";
      } else {
        return "EIGHTCAP:CRYPTO10"; // COIN10
      }
    },

    /** Конфиг графика */
    options () {
      return {
        autosize: true,
        symbol: this.symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: 3,
        locale: this.$i18n.locale,
        toolbar_bg: "#f1f3f6",
        hide_legend: true,
        withdateranges: true,
        hide_top_toolbar: false,
        enable_publishing: false,
        save_image: false
      };
    },

    /** Блокируем кнопку "Продать" если этой монеты нет в кошельке */
    disableSell () {
      return !this.$store.getters.wallets.find(e => e.symbol.toLowerCase() === this.id.toLowerCase());
    },

    /** Статичные данные из конфига для текущего индекса */
    indexData () {
      return INDEXES.find(e => e.title.toUpperCase() === this.id.toUpperCase());
    },

    /** Формируем данные для таблицы с корзиной проектов */
    rows () {
      return this.indexData?.items;
    },

    /** Получаем текущий курс */
    currency () {
      return this.$store.getters.currency.find(e => e.symbol === `${this.id.toUpperCase()}USDT`);
    }
  },
  mounted () {
    const ourDate = new Date();

    this.rows100 = this.id === "CRYPTO100" ? this.indexData?.items.slice(0, 5) : [];

    this.$API.getCurrencyMarketCap({ symbols: `${this.id}USDT` }, (r) => {
      this.marketCap = r[0].value;
    });

    this.$API.getCurrencyHistory({
      symbol: `${this.id}USDT`,
      fromTimestamp: ourDate.setDate(ourDate.getDate() - 1)
    }, (r) => {
      this.priceDiff = r[r.length - 1].price - r[0].price;
    });
  },
  methods: {
    /** Открыть модальное окно */
    openModal (mode) {
      this.showModal = true;
      this.mode = mode;
    },

    /** Показать все проекты в портфолио */
    showAll () {
      this.rows100 = this.indexData.items;
    }
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  &__header {
    @include respond-before("pre-md") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__l {
      padding: 0;

      @include respond-before("pre-md") {
        margin-right: 30px;
      }
    }

    &__r {
      @include respond-before("pre-md") {
        margin-left: auto;
      }
    }

    .title {
      margin-bottom: 20px;

      @include respond-before("pre-md") {
        margin-bottom: 0;
      }
    }
  }

  // Данные
  &__data {
    display: flex;
    flex-wrap: wrap;

    &-item {
      padding: 0;
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  // Informatoin
  &__info {
    display: flex;
    flex-wrap: wrap;

    &-item {
      padding: 0;
      margin-right: 30px;

      @include respond-before("md") {
        width: 25%;
      }

      &:last-child {
        margin-right: 0;
      }

      &__label {
        font-weight: 300;
        //text-transform: uppercase;
      }

      &__value {
        text-align: center;
        font-size: 16px;
        padding: 8px 20px;
        color: #fff;
        background: #1F2124;
        border-radius: 3px;
      }
    }
  }

  .btn-show-all {
    background: linear-gradient(#f4f5f8, #f1f3f6);
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #dcdfe6;
    border-top: 0;
  }
}
</style>
