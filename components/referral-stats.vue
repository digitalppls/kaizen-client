<template>
  <div class="referral-stats">
    <!-- Условия реферальной программы -->
    <div class="font-300 color-white m-b-30">
      <p class="m-b-20" v-html="$t('REF_INFO')" />
      <ul
        v-if="tokenBonusList.length"
        class="list list--none font-300"
      >
        <li
          v-for="item in tokenBonusList"
          :key="item._id"
          v-text="`${item.symbol.toUpperCase()} - ${item.percent}%`"
        />
      </ul>
    </div>

    <!-- Статистика -->
    <div class="stats-info-row">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="stats-info-row__col"
      >
        <circle-data :symbol="item.symbol">
          <template #value>
            <ui-preloader
              v-if="item.value === -1"
              size="small"
              color="gray"
            />
            <template v-else>
              {{ item.value.toLocaleString($i18n.locale) }}
            </template>
          </template>
          <template #label>
            {{ item.label }}
          </template>
        </circle-data>
      </div>
    </div>

    <!-- Кто пригласил -->
    <div
      v-if="fatherId"
      class="m-t-30"
    >
      <ui-preloader
        v-if="loading"
        size="button"
        color="primary"
      />
      <template v-else-if="invitedYou">
        <span class="font-300">
          {{ $t("INVITED_YOU") }}
        </span>
        <span
          class="font-500 color-main"
          v-text="invitedYou"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UiPreloader from "./ui/ui-preloader.global";
import CircleData from "../pages/circleData";

export default {
  name: "ReferralStats",
  components: { CircleData, UiPreloader },
  data () {
    return {
      loading: true,
      invitedYou: null,
      tokenBonusList: [],
      items: [],
      errors: []
    };
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    /* ID пригласившего пользователя */
    fatherId () {
      return this.user.fathers[0] ?? false;
    }
  },
  mounted () {
    if (this.fatherId) {
      this.loadUserRefName(this.fatherId);
    }
    this.getRefList();
    this.getTransactions();
    // this.getTokenBonusList();
  },
  methods: {
    /** Получаем список приглашенных пользователей */
    getTokenBonusList () {
      this.$API.TokenBonusList((r) => {
        this.loading = false;
        this.tokenBonusList = r?.list ?? [];
      });
    },

    /** Получаем список приглашенных пользователей и считаем их */
    getRefList () {
      this.$API.RefList({ _id: this.user.id, line: 1 }, (r) => {
        this.loading = false;
        this.items.push({
          label: this.$t("INVITED_USERS"),
          symbol: "",
          value: r.users.length
        });
      }, (error) => {
        this.errors = Array.isArray(error?.message)
          ? error.message
          : [error.message];
      });
    },

    /** Получить транзакции */
    getTransactions () {
      const params = {
        offset: 0,
        limit: 1000,
        type: "token_ref_bonus"
      };

      ["kzn", "vng", "srk"].forEach((symbol) => {
        this.items.push({
          label: `${this.$t("EARNED")} ${symbol.toUpperCase()}`,
          symbol,
          value: -1
        });
      });
      this.loading = true;
      this.$API.OperationList(params, (r) => {
        this.loading = false;
        const list = r.operations;
        this.items.map((x) => {
          x.value = list.filter(item => item.symbol === x.symbol).map(item => item.amount).reduce((a, b) => a + b, 0);
          return x;
        });
      }, (error) => {
        this.errors = Array.isArray(error?.message)
          ? error.message
          : [error.message];
      });
    },

    /** Получаем имя пригласившего пользователя */
    loadUserRefName (ref) {
      this.$API.GetUsername({ ref }, (r) => {
        this.loading = false;
        this.invitedYou = r;
      }, (error) => {
        this.loading = false;
        this.invitedYou = null;
        this.errors = Array.isArray(error?.message)
          ? error.message.map(msg => this.$t(msg.replace(/ /g, "_").toUpperCase()))
          : [this.$t(error.message.replace(/ /g, "_").toUpperCase())];
      });
    }
  }
};
</script>

<style
  scoped
  lang="scss"
>
.stats-info-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  @include respond-before("sm") {
    margin: 0 -10px;
  }
  @include respond-before("md") {
    margin: 0 -15px;
  }

  &__col {
    width: 50%;
    padding: 0 15px;
    margin-bottom: 30px;

    @include respond-before("sm") {
      width: 25%;
      padding: 0 10px;
      margin-bottom: 0;
    }
    @include respond-before("md") {
      padding: 0 15px;
      width: 150px;
    }
  }
}

.stats-info {
  $self: &;
  margin: auto;
  text-align: center;

  @include respond-before("md") {
    margin-bottom: 0;
  }

  &[data-token="kzn"] #{$self}__circle {
    border-color: var(--col-blue);
  }

  &[data-token="vng"] #{$self}__circle {
    border-color: var(--col-yellow);
  }

  &[data-token="srk"] #{$self}__circle {
    border-color: var(--col-red);
  }

  &__circle {
    border-radius: 50%;
    border: 5px solid var(--col-accent);
    position: relative;

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }

  &__value {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
  }

  &__label {
    font-weight: 300;
    margin-top: 10px;

    @include respond-before("sm") {
      @include respond-to("md") {
        font-size: 11px;
      }
    }
  }
}
</style>
