<template>
  <div class="verify-email">
    <button
      v-if="!disabled"
      class="btn btn-yellow"
      @click="verify"
    >
      {{ $t(btnLabel) }}
    </button>
    <ul v-if="errors.length" class="list m-t-20 m-b-20">
      <li v-for="(error, idx) in errors" :key="idx" class="error-text">
        {{ error }}
      </li>
    </ul>
    <template v-if="seconds > 0">
      <p class="m-t-20 color-primary font-medium">
        На вашу почту отправлено письмо со ссылкой для активации аккаунта.
      </p>
      <p class="m-t-20">
        <span class="color-gray">
          {{ $t("RESEND_VIA") }}
        </span>
        {{ timer }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: "VerifyEmail",
  props: {
    btnLabel: {
      type: String,
      default: "ACTIVATE"
    }
  },
  data () {
    return {
      disabled: false,
      errors: [],

      interval: 0,
      duration: 30,
      timer: "00:00",
      seconds: 0
    };
  },
  computed: {
    minutesLeft () {
      return Math.floor(this.seconds / 60);
    },
    secondsLeft () {
      return this.seconds % 60;
    }
  },
  methods: {
    timeDurationToString (duration) {
      return duration > 9
        ? duration
        : "0" + duration;
    },
    verify () {
      this.disabled = true;
      this.errors = [];
      this.$API.UserEmailVerify((data) => {
        if (data) {
          this.startTimer();
        }
      }, (error) => {
        this.disabled = false;
        this.errors.push(this.$t(error.message.toUpperCase()));
      });
    },
    startTimer () {
      this.seconds = this.duration;
      this.timer = `${this.timeDurationToString(this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;

      this.interval = setInterval(() => {
        this.seconds -= 1;

        if (this.seconds === 0) {
          this.disabled = false;
          clearInterval(this.interval);
        }
        this.timer = `${this.timeDurationToString(this.minutesLeft)}:${this.timeDurationToString(this.secondsLeft)}`;
      }, 1000);
    }
  }
};
</script>

<style scoped>

</style>
