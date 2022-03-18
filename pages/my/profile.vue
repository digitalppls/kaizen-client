<template>
  <div class="userprofile">
    <!-- Реферальная ссылка -->
    <referral-link-bar :label="$t('YOUR_INVITE_LINK')" class="m-b-20" />

    <!-- Статистика по реферальной программе -->
    <section class="balance-info m-b-20">
      <div class="balance-info__top">
        <div>
          <h3 class="color-white m-b-5">
            {{ $t("REFERRAL_PROGRAM") }}
          </h3>
        </div>
      </div>
      <referral-stats />
    </section>

    <!-- Данные пользователя -->
    <section class="balance-info m-b-20">
      <div class="balance-info__top">
        <div>
          <h3 class="color-white m-b-5">
            {{ $t("MY_DATA") }}
          </h3>
        </div>
      </div>

      <table>
        <tr>
          <td>ID:</td>
          <td>{{ user._id }}</td>
        </tr>
        <tr>
          <td>{{ $t("NAME") }}:</td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td>E-mail:</td>
          <td>
            {{ user.email }}
            <span
              style="display: inline-block; margin-left: 5px;"
              :title="$t(verify ? 'CONFIRMED' : 'NOT_CONFIRMED')"
            >
              <ui-icon-done class="icon-check" :fill="colorIcon" />
            </span>

            <verify-email
              v-if="!verify"
              btn-label="CONFIRM_EMAIL"
              class="userprofile-verify"
            />
          </td>
        </tr>
      </table>
    </section>

    <!-- Сброс пароля -->
    <section class="balance-info m-b-20">
      <div class="balance-info__top">
        <div>
          <h3 class="color-white m-b-5">
            {{ $t("AUTH.FIELDS.PASSWORD") }}
          </h3>
        </div>
      </div>

      <ul v-if="infos.length" class="list list--none m-b-20">
        <li
          v-for="(info, idx) in infos"
          :key="idx"
          class="color-white font-300"
          v-html="info"
        />
      </ul>
      <p v-if="seconds" class="m-b-20">
        <span class="color-gray">
          {{ $t("RESEND_VIA") }}
        </span>
        {{ timer }}
      </p>
      <button
        :disabled="seconds > 0"
        class="btn btn-yellow"
        style="padding: 15px 20px; font-size: 14px;"
        @click="recoveryPasswordHandle"
      >
        {{ $t("SET_NEW_PASSWORD") }}
      </button>
    </section>
  </div>
</template>

<script>
import ReferralLinkBar from "~/components/referral-link-bar";
import VerifyEmail from "~/components/verify-email";
import ReferralStats from "~/components/referral-stats";

export default {
  name: "PageProfile",
  components: { ReferralStats, ReferralLinkBar, VerifyEmail },
  data () {
    return {
      interval: 0,
      duration: 30,
      timer: "00:00",
      seconds: 0,

      loading: false,
      errors: [],
      infos: []
    };
  },
  i18n: {
    messages: {
      ru: {
        NAME: "Имя",
        CONFIRMED: "E-mail подтверждён",
        NOT_CONFIRMED: "E-mail не подтверждён"
      },
      en: {
        NAME: "Name",
        CONFIRMED: "E-mail confirmed",
        NOT_CONFIRMED: "E-mail not confirmed"
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    verify () {
      return this.user?.emailVerified ?? false;
    },
    colorIcon () {
      return this.verify ? "var(--col-accent)" : "var(--col-gray)";
    },
    minutesLeft () {
      return Math.floor(this.seconds / 60);
    },
    secondsLeft () {
      return this.seconds % 60;
    }
  },
  methods: {
    recoveryPasswordHandle () {
      this.errors = [];
      this.infos = [];

      this.$API.UserPasswordRecovery({ email: this.user.email }, (data) => {
        if (data) {
          this.infos.push(this.$t("PASSWORD_RECOVERY_SEND")
            .replace("%{EMAIL}",
              `<strong class="color-success">${this.user.email}</strong>`));
          this.startTimer();
        }
      }, (error) => {
        this.loading = false;
        this.errors = [];
        this.infos = [];
        switch (error.message) {
          case "conditions_not_met":
            this.errors.push(this.$t("USER_NOT_FOUND"));
            break;
          case "unauthorized":
            this.errors.push(this.$t("EMAIL_NOT_FOUND"));
            break;
          default:
            this.errors.push(error.message);
        }
      });
    },

    timeDurationToString (duration) {
      return duration > 9
        ? duration
        : "0" + duration;
    },

    startTimer () {
      this.seconds = this.duration;
      this.timer = `${this.timeDurationToString(
        this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;

      this.interval = setInterval(() => {
        this.seconds -= 1;

        if (this.seconds === 0) {
          this.disabled = false;
          this.infos = [];
          clearInterval(this.interval);
        }
        this.timer = `${this.timeDurationToString(
          this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/balance-info.scss";

table {
  width: 100%;

  tr {
    td {
      padding: 10px 5px;

      &:first-child {
        width: 70px;

        @include respond-before("md") {
          width: 90px;
        }
      }

      &:last-child {
        color: var(--col-main);
      }
    }
  }
}

svg.icon-check {
  width: 20px;
  display: inline-block;
  vertical-align: middle;
}

.userprofile-verify {
  margin-top: 20px;

  &::v-deep .btn {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>
