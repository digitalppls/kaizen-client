<template>
  <div
    v-if="userData"
    class="user-card"
  >
    <h2 class="user-card-name color-white">
      {{ userData.username }}
    </h2>
    <div class="user-card-row">
      <!-- Левая колонка -->
      <div class="user-card-row__left m-b-30">
        <div class="user-card-item m-b-5">
          <span class="font-300">ID:</span>
          <span class="color-white font-400">{{ userData.id }}</span>
        </div>
        <div class="user-card-item m-b-5">
          Регистрация:
          <span class="color-white font-400">{{ $DateText(userData.date, false) }}, {{ $TimeText(userData.date) }}</span>
        </div>
        <div class="user-card-item m-b-5">
          E-mail:
          <span class="color-white font-400">{{ userData.email }}</span>
          <span
            :class="userData.emailVerified ? 'disc-success' : 'disc-danger'"
            :title="userData.emailVerified ? 'Почта подтверждена' : 'Почта не подтверждена'"
          >
            <i />
          </span>
        </div>
        <div
          v-if="fatherId"
          class="user-card-item m-b-5"
        >
          Пригласил:
          <span
            v-if="fatherName"
            class="color-white font-400"
            :title="fatherId"
          >{{ fatherName }}
          </span>
          <small
            v-if="fatherName"
            class="color-gray"
          >(ID: {{ fatherId }})</small>
          <ui-preloader
            v-else
            size="button"
          />
        </div>
      </div>
      <!-- Правая колонка -->
      <div class="user-card-row__right m-b-30">
        <!-- Кошельки Wallet33 -->
        <p class="m-b-10">
          <span class="font-400 color-white">Wallet33 ID:</span>
          <span class="inline-code">{{ userData.wallet33Id }}</span>
        </p>
        <ul v-if="userData.wallet33Assets.length">
          <li
            v-for="(wallet, key) in userData.wallet33Assets"
            :key="key"
            class="m-b-5"
          >
            <span
              class="color-yellow text-uppercase font-400"
              v-text="wallet.network + ': '"
            />
            <span
              class="inline-code"
              v-text="wallet.address"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Ошибки -->
    <ul
      v-if="errors.length"
      class="list list--none m-t-30 m-b-30"
    >
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="error-text m-b-5"
        v-html="error"
      />
    </ul>

    <!-- Балансы -->
    <div>
      <h3 class="color-white">
        Баланс
      </h3>
      <div
        v-if="userData.wallets.length"
        class="user-card-balance"
      >
        <div
          v-for="(wallet, key) in userData.wallets"
          :key="key"
          class="user-card-balance__item"
        >
          <div
            class="user-card-balance__box"
            :title="wallet.amount"
          >
            <div
              class="user-card-balance__token"
              :style="{color: $TokenColors[wallet.symbol]}"
            >
              {{ wallet.symbol.toUpperCase() }}
            </div>
            <div class="user-card-balance__amount">
              {{ wallet.amount.toLocaleString("en-US", $LOCALESTRING(0, 3)) }}
            </div>
            <div
              class="user-card-balance__amount-usd"
              :title="`$${wallet.amountUsd}`"
            >
              ≈ {{ wallet.amountUsd.toLocaleString("en-US", $LOCALESTRING_USD(0, 2)) }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="font-500 color-red"
      >
        Кошелек пользователя пуст.
      </div>
    </div>

    <!-- Реферальная программа -->
    <div class="m-t-30">
      <h3 class="color-white">
        Реферальная программа
      </h3>
      <user-ref-rewards :user-id="userData.id" />
      <h4 class="color-white m-t-20">
        Структура
      </h4>
      <referral-network
        :user="userData"
        admin-mode
      />
    </div>

    <!-- История операций-->
    <div class="m-t-30">
      <h3 class="color-white">
        История операция
      </h3>
      <transactions
        :rows="rows"
        :loading="loading"
        :total-records="rows.length"
        :wallets="userData.wallets"
        @transactions-filter="onFilter"
      />
    </div>

    <!-- Админские права пользователя -->
    <ui-details
      v-if="userData.permissions.length"
      class="m-t-30"
    >
      <template #summary>Доступ к административным функциям</template>
      <ul>
        <li
          v-for="(url, key) in userData.permissions"
          :key="key"
          class="m-b-5 color-white"
          v-text="url"
        />
      </ul>
    </ui-details>

    <!-- Объект пользователя -->
    <ui-details
      v-if="$isDev"
      class="m-t-30"
    >
      <template #summary>UserData</template>
      <pre
        class="color-white"
        v-html="userData"
      />
    </ui-details>
  </div>
  <div v-else>
    Нет данных
  </div>
</template>

<script>
import UiPreloader from "../ui/ui-preloader.global";
import UiDetails from "../ui/ui-details";
import UserRefRewards from "./UserRefRewards";
import ReferralNetwork from "../referral-network";
import Transactions from "../transactions";

export default {
  name: "UserCard",
  components: { Transactions, ReferralNetwork, UserRefRewards, UiDetails, UiPreloader },
  props: {
    userData: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      loadingRef: false,
      fatherName: "",
      errors: [],
      loading: false,
      key: 0,
      // operations history
      rows: [],
      totalRecords: 0,
      offset: 0
    };
  },
  computed: {
    fatherId () {
      return this.userData.fathers.length ? this.userData.fathers[this.userData.fathers.length - 1] : null;
    }
  },
  mounted () {
    if (this.fatherId) {
      this.loadUserRefName();
    }
    this.loadOperations();
  },
  methods: {
    /** Получаем имя пригласившего пользователя */
    loadUserRefName () {
      this.loadingRef = true;
      const ref = this.fatherId;
      this.$API.GetUsername({ ref }, (username) => {
        this.loadingRef = false;
        this.fatherName = username;
      }, (error) => {
        this.loadingRef = false;
        this.errors = Array.isArray(error?.message)
          ? error.message.map(msg => this.$t(msg.replace(/ /g, "_").toUpperCase()))
          : [this.$t(error.message.replace(/ /g, "_").toUpperCase())];
      });
    },

    /** Загрузить транзакции по фильтру */
    onFilter (filters) {
      console.log("on-filter", filters);
      this.loadOperations(filters);
    },

    /** Получить транзакции */
    loadOperations () {
      const filters = {...arguments}[0];
      this.loading = true;
      const params = {
        offset: this.offset,
        limit: 1000, // this.serverParams.perPage,
        userId: this.userData._id,
        type: filters?.type?.value ?? "all"
      };
      if (filters && Object.prototype.hasOwnProperty.call(filters, "symbol") && !!filters.symbol && !["токен", "token"].includes(filters.symbol.toLowerCase())) {
        params.symbol = filters.symbol;
      }
      this.$API.adminOperationList(params, (response) => {
        this.loading = false;
        this.rows = response.operations;
        this.totalRecords = response.length;
      }, (e) => {
        this.loading = false;
        console.error("[adminOperationList]", e);
        if (e.message[0] === "symbol must be a valid enum value") {
          this.errors = ["История операций доступна только по следующим токенам: USDT, BUSD, USDC, BTC, TRX, ETH, BNB, VNG, SRK, KZN"]
        } else {
          this.errors = e?.message ?? [];
        }
      });
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.user-card {
  font-weight: 300;

  &-row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;
    margin-right: -20px;

    &__left,
    &__right {
      padding-left: 20px;
      padding-right: 20px;
    }

    &__left {
      @include respond-before("lg") {
        width: 40%;
      }
      @include respond-before("xl") {
        width: 50%;
      }
    }

    &__right {
      @include respond-before("lg") {
        width: 60%;
      }
      @include respond-before("xl") {
        width: 50%;
      }
    }
  }

  /* Баланс пользователя */
  &-balance {
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;

    &__item {
      width: 50%;
      padding: 5px;

      @include respond-before("xs") {
        width: 50%;
      }
      @include respond-before("sm") {
        width: 33.333%;
      }
      @include respond-before("md") {
        width: 25%;
      }
      @include respond-before("lg") {
        width: 20%;
      }
    }

    &__box {
      background: #242527;
      border: 1px solid #55585f;
      padding: 10px;
    }

    &__token {
      color: var(--col-main);
      font-weight: 400;
      font-size: .95em;
      margin-bottom: 10px;
    }

    &__amount {
      font-weight: 700;
      font-size: 1.25em;
      color: #fff;
      margin-bottom: 5px;
    }

    &__amount-usd {
      font-size: .95em;
    }
  }
}

.inline-code {
  background: rgba(135, 131, 120, 0.15);
  font-family: monospace, monospace;
  color: #fff;
  //color: #EB5757;
  border-radius: 3px;
  font-size: 85%;
  padding: 0.2em 0.4em;
}


</style>
