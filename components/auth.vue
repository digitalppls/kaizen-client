<template>
  <div class="auth__box" :key="updateKey">
    <div class="auth__header">
      <div
        :class="['auth__header-item', { 'auth__header-item--active' : mode === 'sign_up' }]"
        @click="changeTab('sign_up')"
      >
        {{ $t("SIGN_UP") }}
      </div>
      <div
        :class="['auth__header-item', { 'auth__header-item--active' : mode === 'sign_in' }]"
        @click="changeTab('sign_in')"
      >
        {{ $t("SIGN_IN") }}
      </div>
    </div>
    <div class="auth__content">
      <ul v-if="errors.length" class="list list--none m-b-20">
        <li v-for="(error, idx) in errors" :key="idx" class="error-text" v-html="error" />
      </ul>
      <ul v-if="infos.length" class="list list--none m-b-20">
        <li v-for="(info, idx) in infos" :key="idx" class="color-success" v-html="info" />
      </ul>
      <p v-if="seconds" class="m-b-20">
        <span class="color-gray">
          {{ $t("RESEND_VIA") }}
        </span>
        {{ timer }}
      </p>

      <!-- Регистрация -->
      <form v-if="mode === 'sign_up'" @submit.prevent="registerHandle">
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="ref"
            autocomplete="off"
            autofocus="off"
            type="text"
            :required="false"
            :disabled="loading"
            :label="$t('AUTH.FIELDS.REF')"
            @input="onKeydown"
          >
            <template #append>
              <ui-preloader v-if="loadingRef" size="small" color="gray" />
            </template>
          </ui-text-field>
        </div>
        <p v-if="referralUsername && !!ref" class="m-t-5 m-b-30 small font-300">
          {{ $t("INVITED_YOU") }}:
          <span class="color-white">{{ referralUsername }}</span>
        </p>
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="username"
            autocomplete="off"
            autofocus="off"
            type="text"
            required=""
            :disabled="loading"
            :label="$t('AUTH.FIELDS.NAME')"
            @input="onKeydown"
          />
        </div>
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="email"
            autocomplete="off"
            autofocus="off"
            type="email"
            required=""
            :disabled="loading"
            :label="$t('AUTH.FIELDS.EMAIL')"
            @input="onKeydown"
          />
        </div>
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="password"
            autocomplete="off"
            autofocus="off"
            :type="viewPassword ? 'text' : 'password'"
            required=""
            :disabled="loading"
            :label="$t('AUTH.FIELDS.PASSWORD')"
            @input="onKeydown"
          >
            <template #append>
              <div
                :class="['ui-form__password-view', {'ui-form__password-view--visible': viewPassword }]"
                @click="passwordViewToggle"
              >
                <img :src="require(`../assets/img/password-${viewPassword ? 'hide' : 'show'}.svg`)" alt="">
              </div>
            </template>
          </ui-text-field>
        </div>
        <div class="ui-form__fieldset m-t-40">
          <button :disabled="disabled" type="submit" class="btn btn-accent btn-full">
            {{ $t("CREATE_ACCOUNT") }}
          </button>
        </div>
      </form>

      <!-- Авторизация -->
      <form v-else-if="mode === 'sign_in' && !isRecoveryPassword" @submit.prevent="loginHandle">
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="email"
            autocomplete="off"
            autofocus="off"
            type="email"
            required=""
            :disabled="loading"
            :label="$t('AUTH.FIELDS.EMAIL')"
            @input="onKeydown"
          />
        </div>
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="password"
            autocomplete="off"
            autofocus="off"
            :type="viewPassword ? 'text' : 'password'"
            required=""
            :disabled="loading"
            :label="$t('AUTH.FIELDS.PASSWORD')"
            @input="onKeydown"
          >
            <template #append>
              <div
                :class="['ui-form__password-view', {'ui-form__password-view--visible': viewPassword }]"
                @click="passwordViewToggle"
              >
                <img :src="require(`../assets/img/password-${viewPassword ? 'hide' : 'show'}.svg`)" alt="">
              </div>
            </template>
          </ui-text-field>
        </div>
        <div class="ui-form__fieldset m-t-20">
          <div role="button" class="font-300" @click="recoveryToggle">
            {{ $t("AUTH.FORGOT_PASSWORD") }}
          </div>
        </div>
        <div class="ui-form__fieldset m-t-40">
          <button
            type="submit"
            class="btn btn-accent btn-full"
            :disabled="loading || !email || !password"
            v-text="loading ? $t('LOADING') : $t('LOGIN')"
          />
        </div>
      </form>

      <!-- Восстановление пароля -->
      <form v-else @submit.prevent="recoveryPasswordHandle">
        <div class="ui-form__fieldset">
          <ui-text-field
            v-model="email"
            autocomplete="off"
            autofocus="off"
            type="email"
            required=""
            :disabled="loading || seconds > 0"
            :label="$t('AUTH.FIELDS.EMAIL')"
            @input="onKeydown"
          />
        </div>
        <div class="ui-form__fieldset m-t-20">
          <div role="button" class="font-300" @click="recoveryToggle">
            {{ $t("AUTH.ALREADY_REGISTERED") }}
            <span class="color-main">
              {{ $t("LOGIN") }}
            </span>
          </div>
        </div>
        <div class="ui-form__fieldset m-t-40">
          <button :disabled="!email || seconds > 0" type="submit" class="btn btn-accent btn-full">
            {{ $t("RECOVERY_PASSWORD") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginAuth",
  props: {
    mode: {
      type: String,
      default: "sign_up"
    }
  },
  data () {
    return {
      username: "",
      email: "",
      password: "",
      viewPassword: false,
      loading: false,
      loadingRef: false,
      disabled: true,
      isRecoveryPassword: false,
      errors: [],
      infos: [],
      delayTimer: null,
      referralUsername: null,
      updateKey: 0,

      interval: 0,
      duration: 30,
      timer: "00:00",
      seconds: 0
    };
  },
  computed: {
    ref: {
      get () {
        const ref = this.$store.getters.ref;
        if (ref) {
          this.loadUserRefName(ref);
        }
        return ref;
      },
      set (link) {
        // Example referral link
        // https://localhost:80/r/614897460e97bfe53915c46b
        this.errors = [];
        this.infos = [];
        const value = link.split("/").reverse()[0].trim();
        this.$store.dispatch("setRef", value);
        if (link) {
          this.loadUserRefName(value);
        }
      }
    },
    user () {
      return this.$store.getters.user;
    },
    authInfo () {
      return this.$store.getters.authInfo;
    },
    minutesLeft () {
      return Math.floor(this.seconds / 60);
    },
    secondsLeft () {
      return this.seconds % 60;
    }
  },
  watch: {
    user (newValue, oldValue) {
      if (Object.prototype.hasOwnProperty.call(newValue, "wallet") && (!oldValue || !oldValue.wallet)) {
        // this.$toast.clear();
        this.$router.push(this.localePath("my"));
      }
    },
    authInfo (newValue) {
      if (newValue === "USER_NOT_FOUND") {
        this.$store.dispatch("authInfo", newValue);
        this.errors.push(this.$t("AUTH.INFO.USER_NOT_FOUND"));
      }
    }
  },
  beforeDestroy () {
    document.querySelector("body").classList.remove("page-login");
  },
  mounted () {
    document.querySelector("body").classList.add("page-login");
  },
  methods: {
    /** Смена вкладки */
    changeTab (tab) {
      this.errors = [];
      this.infos = [];
      this.updateKey++;
      this.$emit("change-tab", tab);
    },

    /** Слушатель ввода текста в поле */
    onKeydown () {
      this.disabled = (!this.username || !this.email || !this.password) || this.loadingRef;
      if (this.$store.getters.authInfo === "USER_NOT_FOUND") {
        this.$store.dispatch("authInfo", null);
        this.errors = [];
        this.infos = [];
      }
    },

    /** Проверка занятости логина */
    loginDetect () {
      this.$API.UserLoginDetect(this.username, (response) => {

      }, (error) => {
        console.error('[login detect]', error);
        this.errors = error.message;
      });
    },

    /** Переключатель на окно восстановления пароля */
    recoveryToggle (event) {
      event.preventDefault();
      this.isRecoveryPassword = !this.isRecoveryPassword;
    },

    /** Переключатель видимости пароля */
    passwordViewToggle () {
      this.viewPassword = !this.viewPassword;
    },

    /** Валидация Email */
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    /** Регистрация */
    registerHandle () {
      this.errors = [];
      this.infos = [];

      if (!this.email) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_EMPTY"));
      } else if (!this.validEmail(this.email)) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_NO_VALID"));
      }

      if (!this.password) {
        this.errors.push(this.$t("AUTH.INFO.PASSWORD_EMPTY"));
      }

      if (!this.errors.length) {
        const params = {
          email: this.email,
          username: this.username,
          password: this.$base64.encode(this.password),
          ref: this.ref,
          language_code: this.$i18n.locale
        };

        this.$API.UserRegister(params, (data) => {
          if (data.access_token) {
            this.$store.dispatch("register", {
              token: data.access_token,
              expiresToken: data.expires_in,
              user: data.user
            });
            this.$router.push(this.localePath("my"));
          }
        }, (error) => {
          if (typeof error.message === "string") {
            this.errors.push(this.$t(error.message.replace(/ /g, "_").toUpperCase()));
          } else {
            this.errors.push(error.message.map(msg => this.$t(msg.replace(/ /g, "_").toUpperCase())));
          }
        });
      }
    },

    /** Авторизация */
    loginHandle () {
      this.errors = [];
      this.infos = [];

      if (!this.email) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_EMPTY"));
      } else if (!this.validEmail(this.email)) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_NO_VALID"));
      }

      if (!this.password) {
        this.errors.push(this.$t("AUTH.INFO.PASSWORD_EMPTY"));
      }

      if (!this.errors.length) {
        const params = {
          email: this.email,
          password: this.$base64.encode(this.password)
        };

        this.loading = true;
        this.$API.UserLogin(params, (data) => {
          this.loading = false;
          if (data.access_token) {
            this.$store.dispatch("login", {
              token: data.access_token,
              expiresToken: data.expires_in,
              user: data.user
            });
            this.$router.push(this.localePath("my"));
          }
        }, (error) => {
          this.loading = false;
          switch (error.message) {
            case "conditions_not_met":
              this.errors.push(this.$t("USER_NOT_FOUND"));
              break;
            case "unauthorized":
              this.errors.push(this.$t("UNAUTHORIZED"));
              break;
            default:
              this.errors.push(error.message);
          }
        });
      }
    },

    /** Восстановление пароля */
    recoveryPasswordHandle () {
      this.errors = [];
      this.infos = [];

      if (!this.email) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_EMPTY"));
      } else if (!this.validEmail(this.email)) {
        this.errors.push(this.$t("AUTH.INFO.EMAIL_NO_VALID"));
      }

      if (!this.errors.length) {
        this.$API.UserPasswordRecovery({ email: this.email }, (data) => {
          if (data) {
            this.infos.push(this.$t("PASSWORD_RECOVERY_SEND").replace("%{EMAIL}", `<strong>${this.email}</strong>`));
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
      }
    },

    /** Получаем имя пригласившего пользователя */
    loadUserRefName (ref) {
      this.loadingRef = true;
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.disabled = true;
        this.$API.GetUsername({ ref }, (response) => {
          this.loading = false;
          this.loadingRef = false;
          this.disabled = false;
          this.referralUsername = response;
        }, (error) => {
          this.loading = this.loadingRef = false;
          this.disabled = true;
          this.referralUsername = null;

          if (typeof error.message === "string") {
            this.errors = [];
            this.infos = [];
            this.errors.push(this.$t(error.message.toUpperCase()));
          } else {
            this.errors = error.message;
          }
        });
      }, 2000);
    },

    /** Добавляем ноль для таймера */
    timeDurationToString (duration) {
      return duration > 9
        ? duration
        : "0" + duration;
    },

    /** Таймер
     * В параметре this.duration указывается кол-во секунд
     */
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
.ui-form {
  &__password-view {
    cursor: pointer;
    opacity: 0.5;
    transition: .3s;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 1;
    }
    img {
      width: 18px;
    }
  }
}
.ui-form__fieldset + .ui-form__fieldset {
  margin-top: 20px;
}
.auth {
  &__box {
    background: #242527;
    margin: auto;
    width: 100%;
    max-width: 540px;
    overflow: hidden;
  }

  &__header {
    display: flex;

    &-item {
      width: 50%;
      color: #555860;
      background: rgba(167, 169, 183, 0.07);
      text-align: center;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid transparent;
      justify-content: center;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      padding: 21px;
      cursor: pointer;

      @include respond-before("xs") {
        font-size: 14px;
      }
      @include respond-before("sm") {
        font-size: 16px;
      }
      @include respond-before("md") {
        font-size: 18px;
      }

      &--active {
        color: #fff;
        cursor: default;
        font-weight: 500;
        background: #555860;
        //border-color: #fff;
      }
    }
  }

  &__content {
    padding: 40px;
  }
}
</style>
