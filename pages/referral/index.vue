<template>
  <div class="">
    <section class="m-b-60">
      <p class="m-b-10">
        <span class="color-gray">{{ $t("INVITED") }}</span>
        <ui-preloader v-if="loading" size="small" />
        <template v-else>
          <strong>{{ invitedUsers }}</strong> {{ $declOfNum(invitedUsers, $t("CASE_USERS")) }}
        </template>
      </p>
      <p class="m-b-10">
        <span class="color-gray">{{ $t("EARNED") }}:</span>
        <ui-preloader v-if="loading" size="small" />
        <template v-else>
          <strong>{{ earned.toLocaleString("en-US", $LOCALESTRING_USD()) }}</strong>
        </template>
      </p>
    </section>

    <ui-preloader v-if="loading" center="true" />
    <section v-if="packages.length" class="m-b-60">
      <h1 class="sub-title">
        {{ $t("PURCHASED_PACKAGES") }}
      </h1>

      <div class="tariffs m-b-40">
        <div
          v-for="(item, index) in packages"
          :key="index"
          class="tariffs__col"
        >
          <div class="tariffs__item">
            <div class="tariffs__row">
              <nuxt-link :to="localePath('referral-packages')" class="sub-title" :title="$t('ABOUT_PACKAGE')">
                {{ item.package.name }}
              </nuxt-link>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("INVESTED_AMOUNT") }}:
              </div>
              <div class="tariffs__item-value">
                {{ item.farmedAmountUsd.toLocaleString("en-US", $LOCALESTRING_USD()) }}
              </div>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("FARMED_AMOUNT") }}:
              </div>
              <div class="tariffs__item-value">
                {{ item.farmedAmountUsd.toLocaleString("en-US", $LOCALESTRING_USD()) }}
              </div>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("WITHDRAWN_AMOUNT") }}:
              </div>
              <div class="tariffs__item-value">
                {{ item.withdrawnAmountUsd.toLocaleString("en-US", $LOCALESTRING_USD()) }}
              </div>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("WITHDRAWN_DATE") }}:
              </div>
              <div class="tariffs__item-value">
                <template v-if="item.date === item.withdrawnDate">
                  ----
                </template>
                <template v-else>
                  {{ $DateText(item.withdrawnDate) }}, {{ $TimeText(item.withdrawnDate) }}
                </template>
              </div>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("WITHDRAWN_DATE_NEXT") }}:
              </div>
              <div class="tariffs__item-value">
                {{ $DateText(nextWithdrawnDate(item.withdrawnDate, item.package.withdrawIntervalDays)) }}, {{ $TimeText(nextWithdrawnDate(item.withdrawnDate, item.package.withdrawIntervalDays)) }}
              </div>
            </div>
            <div class="tariffs__row">
              <div class="tariffs__item-label">
                {{ $t("PURCHASE_DATE_PACKAGE") }}:
              </div>
              <div class="tariffs__item-value">
                <small>{{ $DateText(item.date) }}, {{ $TimeText(item.date) }}</small>
              </div>
            </div>
            <div class="tariffs__row">
              <button
                :class="['btn', 'btn-solid', 'btn-full']"
                :disabled="!item.canWithdraw"
                @click="withdrawConfirm(item._id)"
              >
                <ui-preloader v-if="loadingWithdraw && withdrawPackageId === item._id" size="small" color="black" />
                <template v-else-if="done && withdrawPackageId === item._id">
                  <ui-icon-done />
                </template>
                <template v-else>
                  {{ $t("WITHDRAW") }}
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UiPreloader from "~/components/ui/ui-preloader.global";

export default {
  name: "ReferralIndex",
  components: { UiPreloader },
  data () {
    return {
      invitedUsers: 0,
      earned: 0,
      loading: true,
      done: false,
      loadingWithdraw: false,
      intervalUpdate: 0,
      withdrawPackageId: null,
      packages: []
    };
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  beforeDestroy () {
    window.clearInterval(this.intervalUpdate);
  },
  mounted () {
    this.getUserRefList();
    this.loading = true;
    this.getUserRefInfo();
    this.loading = true;
    this.getUserPackagesList();
    this.intervalUpdate = window.setInterval(this.Update, 5000);
  },
  methods: {
    /** Обновляем данные */
    Update () {
      this.getUserPackagesList();
    },

    /** Получаем список приглашенных пользователей и считаем их */
    getUserRefList () {
      this.$API.UserRefList({ _id: this.user.id, line: 1 }, (r) => {
        this.loading = false;
        this.invitedUsers = r.users.length;
      });
    },

    /** Получаем сумму всех заработанных средств */
    getUserRefInfo () {
      this.$API.UserRefInfo((r) => {
        this.loading = false;
        this.earned = r.sumUsd;
      });
    },

    /** Получаем список приобретенных пользователем пакетов */
    getUserPackagesList () {
      this.$API.getUserPackageList((r) => {
        this.loading = false;
        this.packages = r.list;
      });
    },

    /** Окно подтверждения вывода средств с бизнес-пакета */
    withdrawConfirm (_id) {
      if (confirm(this.$t("CONFIRM_WITHDRAWAL"))) {
        this.loadingWithdraw = true;
        this.withdrawPackageId = _id;
        this.withdraw();
      }
    },

    /** Вывод средств с бизнес-пакета */
    withdraw () {
      this.$API.PackageWithdraw({ _id: this.withdrawPackageId }, (r) => {
        this.loadingWithdraw = false;
        this.done = true;
        setTimeout(() => {
          this.done = false;
          this.withdrawPackageId = null;
        }, 2000);
        console.log(r); // userPackage & user
      }, (error) => {
        this.loadingWithdraw = false;
        this.withdrawPackageId = null;
        this.done = false;
        alert(this.$t(error.message.toUpperCase()));
      });
    },

    /** Рассчитываем дату следующего вывода средств */
    nextWithdrawnDate (date, days) {
      date = new Date(date);
      date.setDate(date.getDate() + days);
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
.tariffs {
  @include respond-before("md") {
    display: flex;
    flex-flow: wrap;
    margin-left: -10px;
    margin-right: -10px;
  }

  &__col {
    margin-bottom: 20px;

    @include respond-before("md") {
      padding: 0 10px;
      width: 50%;
    }
    @include respond-before("lg") {
      width: 33.333%;
    }
  }

  &__item {
    background: #1e1e1e;
    padding: 30px;
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    transition: background-color $transition;

    &-label {
      font-size: 14px;
      margin-bottom: 5px;
      color: var(--color-gray-light);
    }

    &-value {
      font-size: 16px;

      @include respond-before("xs") {
        font-size: 18px;
      }
    }

    &:hover {
      background-color: var(--color-dark);
    }
  }

  &__row {
    margin-bottom: 30px;

    //@include respond-before("md") {
    //  @include respond-to("lg") {
    //    min-height: 67px;
    //  }
    //}

    &:last-child {
      margin-bottom: 0;
    }
  }
}

details {
  border: 1px solid var(--color-gray);
  border-radius: 12px;
  padding: 15px 15px 0;

  &[open] {
    padding: 15px;

    summary {
      border-bottom: 1px solid var(--color-gray);
      margin-bottom: .5em;
    }
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    margin: -15px -15px 0;
    padding: 15px;
  }
}
</style>
