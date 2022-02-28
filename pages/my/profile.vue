<template>
  <div class="userprofile">
    <section>
      <h1 class="m-b-30">
        {{ $t("MY_DATA") }}
      </h1>

      <table>
        <tr class="small">
          <td>ID:</td>
          <td>{{ user._id }}</td>
        </tr>
        <tr>
          <td>Имя:</td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td>E-mail:</td>
          <td>
            {{ user.email }}
            <span style="display: inline-block; margin-left: 5px;" :title="verify ? 'Подтвержден' : 'Не подтвержден'">
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

    <section class="m-t-60">
      <h2 class="m-b-30">
        {{ $t("AUTH.FIELDS.PASSWORD") }}
      </h2>
      <ul v-if="infos.length" class="list m-b-20">
        <li v-for="(info, idx) in infos" :key="idx" class="color-primary" v-html="info" />
      </ul>
      <p v-if="seconds" class="m-b-20">
        <span class="color-gray">
          {{ $t("RESEND_VIA") }}
        </span>
        {{ timer }}
      </p>
      <button
        :disabled="seconds > 0"
        class="btn btn-solid"
        @click="recoveryPasswordHandle"
      >
        {{ $t("SET_NEW_PASSWORD") }}
      </button>
    </section>
  </div>
</template>

<script>
import VerifyEmail from "~/components/verify-email";

export default {
  name: "PageProfile",
  components: { VerifyEmail },
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
  computed: {
    user () {
      return this.$store.getters.user;
    },
    verify () {
      return this.user?.emailVerified ?? false;
    },
    colorIcon () {
      return this.verify ? "#58C1B9" : "#ccc";
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
          this.infos.push(this.$t("PASSWORD_RECOVERY_SEND").replace("%{EMAIL}", `<strong>${this.user.email}</strong>`));
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
      this.timer = `${this.timeDurationToString(this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;

      this.interval = setInterval(() => {
        this.seconds -= 1;

        if (this.seconds === 0) {
          this.disabled = false;
          this.infos = [];
          clearInterval(this.interval);
        }
        this.timer = `${this.timeDurationToString(this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  tr {
    td {
      padding: 10px 5px;

      &:first-child {
        width: 70px;
        color: var(--color-gray);

        @include respond-before("md") {
          width: 90px;
        }
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
