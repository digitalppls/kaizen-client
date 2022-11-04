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

    <ui-tabs>
      <ui-tab
        name="Баланс"
        selected
      >
        <div
          v-if="userData.wallets.length"
          class="user-card-balance m-t-20"
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
          class="font-500 color-red m-t-20"
        >
          Кошелек пользователя пуст.
        </div>
        <ui-details class="m-t-30">
          <template #summary>Изменить баланс пользователя</template>
          <update-user-balance
            :user-id="userData._id"
            :wallets="userData.wallets"
            @complete="onUpdateUserBalance"
          />
        </ui-details>
      </ui-tab>
      <ui-tab name="История операций">
        <div class="m-t-20">
          <div class="text-right">
            <button
              class="btn btn-medium btn-outline display-i-flex ai--center"
              style="font-size: 14px; background-color:#242527;"
              title="Обновить историю"
              @click="loadOperations"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.08108 8H0C0.000145905 6.33899 0.517209 4.71921 1.47945 3.36538C2.44169 2.01155 3.80141 0.990788 5.36995 0.444722C6.93849 -0.101345 8.63808 -0.145643 10.2329 0.317971C11.8278 0.781586 13.2388 1.73013 14.2703 3.032V1.8373H15.3514V5.62141H11.5676V4.54024H13.9917C13.3839 3.48889 12.5104 2.61583 11.4587 2.00859C10.4071 1.40135 9.21433 1.08128 8 1.08047C4.18486 1.08047 1.08108 4.18453 1.08108 8ZM14.9189 8C14.9189 11.8155 11.8151 14.9195 8 14.9195C6.78567 14.9187 5.59289 14.5986 4.54127 13.9914C3.48964 13.3842 2.61612 12.5111 2.00829 11.4598H4.43243V10.3786H0.648649V14.1627H1.72973V12.968C2.76118 14.2699 4.17221 15.2184 5.76706 15.682C7.36192 16.1456 9.06151 16.1013 10.6301 15.5553C12.1986 15.0092 13.5583 13.9885 14.5205 12.6346C15.4828 11.2808 15.9999 9.66101 16 8H14.9189Z" fill="var(--col-gray)"/>
              </svg>
            </button>
          </div>
          <transactions
            :rows="rows"
            :loading="loading"
            :total-records="rows.length"
            :wallets="userData.wallets"
            @transactions-filter="onFilter"
          />
        </div>
      </ui-tab>
      <ui-tab name="Реферальная программа">
        <div class="m-t-30">
          <user-ref-rewards
            :user-id="userData.id"
            class="m-t-20"
          />
          <h4 class="color-white m-t-20">
            Структура
          </h4>
          <referral-network
            :user="userData"
            admin-mode
          />
        </div>
      </ui-tab>
    </ui-tabs>

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
import UiTabs from "../ui-tabs/ui-tabs";
import UiTab from "../ui-tabs/ui-tab";
import UpdateUserBalance from "./UpdateUserBalance";

export default {
  name: "UserCard",
  components: { UpdateUserBalance, UiTab, UiTabs, Transactions, ReferralNetwork, UserRefRewards, UiDetails, UiPreloader },
  props: {
    user: {
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
      userData: null, // обёект пользователя
      // operations history
      rows: [],
      totalRecords: 0,
      offset: 0
    };
  },
  computed: {
    fatherId () {
      const fathers = this.userData?.fathers ?? [];
      return fathers.length
        ? fathers[fathers.length - 1]
        : null;
    }
  },
  mounted () {
    this.userData = this.user;

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
      this.loadOperations(filters);
    },

    /** Получить транзакции */
    loadOperations () {
      const filters = { ...arguments }[0];
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
          this.errors = ["История операций доступна только по следующим токенам: USDT, BUSD, USDC, BTC, TRX, ETH, BNB, VNG, SRK, KZN"];
        } else {
          this.errors = e?.message ?? [];
        }
      });
    },

    /** Баланс пользователя обновлен */
    onUpdateUserBalance (user) {
      this.userData = user;
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
