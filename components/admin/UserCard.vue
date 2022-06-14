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
        <div v-if="fatherId" class="user-card-item m-b-5">
          Пригласил:
          <span v-if="fatherName" class="color-white font-400" :title="fatherId">{{ fatherName }}</span>
          <small v-if="fatherName" class="color-gray">(ID: {{ fatherId }})</small>
          <ui-preloader v-else size="button" />
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
    <ul v-if="errors.length" class="list list--none m-b-20">
      <li v-for="(error, idx) in errors" :key="idx" class="error-text m-b-5" v-html="error" />
    </ul>

    <!-- Балансы -->
    <div
      v-if="userData.wallets.length"
      class="user-card-balance m-b-30"
    >
      <div
        v-for="(wallet, key) in userData.wallets"
        :key="key"
        class="user-card-balance__item"
        @click="selectWallet(wallet)"
      >
        <div :class="['user-card-balance__box', {'user-card-balance__box--active': wallet.symbol === selectedSymbol}]" :title="wallet.amount">
          <div class="user-card-balance__token" :style="{color: colors[wallet.symbol]}">
            {{ wallet.symbol.toUpperCase() }}
          </div>
          <div class="user-card-balance__amount">
            {{ wallet.amount.toLocaleString("en-US", $LOCALESTRING(0, 3)) }}
          </div>
          <div class="user-card-balance__amount-usd" :title="`$${wallet.amountUsd}`">
            ≈ {{ wallet.amountUsd.toLocaleString("en-US", $LOCALESTRING_USD(0, 2)) }}
          </div>
        </div>
      </div>

    </div>

    <!-- Список операций по выбранному токену -->
    <user-transactions
      v-if="selectedSymbol"
      :key="key"
      :user-id="userData.id"
      :symbol="selectedSymbol"
    />

    <!-- Админские права пользователя -->
    <details v-if="userData.permissions.length" class="m-b-30">
      <summary>Доступ к административным функциям</summary>
      <div>
        <ul>
          <li
            v-for="(url, key) in userData.permissions"
            :key="key"
            class="m-b-5 color-white"
            v-text="url"
          />
        </ul>
      </div>

    </details>

    <!-- Объект пользователя -->
    <details v-if="$isDev">
      <summary>UserData</summary>
      <div>
        <pre class="color-white" v-html="userData" />
      </div>
    </details>
  </div>
  <div v-else>
    Нет данных
  </div>
</template>

<script>
import UiPreloader from "../ui/ui-preloader.global";
import UserTransactions from "./UserTransactions";
export default {
  name: "UserCard",
  components: { UserTransactions, UiPreloader },
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
      colors: {
        kzn: "#44f3ff",
        vng: "#fedb81",
        srk: "#ff424e",
        usdt: "#099169"
      },
      loading: true,
      columns: [
        {
          label: "Регистрация",
          field: "date",
          width: "16%",
          sortable: false
        },
        {
          label: "Имя",
          field: "username",
          width: "20%",
          sortable: false
        },
        {
          label: "E-mail",
          field: "email",
          width: "25%",
          sortable: false
        },
        {
          label: "Баланс кошелька",
          field: "invited",
          // width: "50%",
          // thClass: "min-width-180",
          sortable: false
        }
      ],
      rows: [],
      totalRecords: 0,
      page: 1,
      offset: 0,
      perPageDropdown: [30, 50],
      serverParams: {
        columnFilters: {},
        page: 1,
        perPage: 30
      },
      key: 0,
      selectedSymbol: ""
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

    /** Выбор кошелька, чтобы посмотреть движение по нему
     * Информация доступна только по токенам:
     * ["usdt","busd","usdc","btc","trx","eth","bnb","vng","srk","kzn"]
     */
    selectWallet (wallet) {
      this.key++;
      this.selectedSymbol = null;
      this.selectedSymbol = wallet.symbol;
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
    }
    &__right {
      @include respond-before("lg") {
        width: 60%;
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
      cursor: pointer;

      &--active {
        background: #151618;
      }
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

/* А-ля спойлер */
details {
  border: 1px solid #55585f;

  summary {
    background: #242527;
    cursor: pointer;
    font-weight: 400;
    color: #fff;
    padding: .5rem 1rem;

    > * {
      display: inline;
    }
  }

  > div {
    margin-top: 0;
    padding: 1rem;
  }
}


</style>
