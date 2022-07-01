<template>
  <div>
    <!-- Ошибки -->
    <ul
      v-if="errors.length"
      class="list list--none m-t-30 m-b-30"
    >
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="color-red font-500 m-b-5"
        v-html="error"
      />
    </ul>
    <div class="stats-row">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="stats-row__col"
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
  </div>
</template>

<script>
import CircleData from "../../pages/circleData";
import UiPreloader from "../ui/ui-preloader.global";

export default {
  name: "UserRefRewards",
  components: { UiPreloader, CircleData },
  props: {
    userId: {
      type: String,
      required: true,
      default: ""
    }
  },
  data () {
    return {
      loading: false,
      errors: [],
      items: []
    };
  },
  mounted () {
    this.getRefList();
    this.getTransactions();
  },
  methods: {
    /** Получаем список приглашенных пользователей и считаем их */
    getRefList () {
      this.loading = true;
      this.$API.RefListAll({ _id: this.userId, line: 1 }, (r) => {
        this.loading = false;
        this.items.push({
          label: "Пользователей приглашено",
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
        type: "token_ref_bonus",
        userId: this.userId
      };
      ["kzn", "vng", "srk"].forEach((symbol) => {
        params.symbol = symbol;
        this.loading = true;
        this.$API.adminOperationList(params, (r) => {
          this.loading = false;
          const list = r.operations;
          this.items.push({
            label: `Заработано ${symbol.toUpperCase()}`,
            symbol,
            value: list.filter(item => item.symbol === symbol).map(item => item.amount).reduce((a, b) => a + b, 0)
          });
        }, (error) => {
          this.errors = Array.isArray(error?.message)
            ? error.message
            : [error.message];
        });
      });
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.stats-row {
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
</style>
