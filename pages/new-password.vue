<template>
  <div class="page-new-password">
    <div class="container">
      <h1 class="title">
        {{ $t("SET_NEW_PASSWORD") }}
      </h1>
      <div class="new-password-box">
        <div v-if="info" class="color-success text-center" v-html="info" />
        <form v-else class="new-password-box" @submit.prevent="setPasswordHandle">
          <div class="ui-form__fieldset">
            <ui-text-field
              v-model="password"
              :floating="true"
              autocomplete="off"
              autofocus="on"
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
                />
              </template>
            </ui-text-field>
          </div>
          <div class="ui-form__fieldset m-t-40">
            <button :disabled="!password || loading" type="submit" class="btn btn-solid btn-big btn-full">
              {{ $t("SET_NEW_PASSWORD") }}
            </button>
          </div>
        </form>
      </div>
      <nuxt-link
        v-if="status === 'success'"
        :to="localePath('index')"
        class="btn btn-solid"
      >
        {{ $t("GO_HOME") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPassword",
  layout: "public",
  data () {
    return {
      password: "",
      viewPassword: false,

      loading: false,
      disabled: false,
      errors: [],
      info: null
    };
  },
  computed: {
    email () {
      return this.$route.query?.email ?? null;
    },
    code () {
      return this.$route.query?.code ?? null;
    }
  },
  created () {
    // if (!this.$route.query.status) {
    //   this.$router.push(this.localePath("index"));
    // }
  },
  methods: {
    onKeydown () {
      this.disabled = !this.password || this.loading;
      this.errors = [];
      this.info = "";
    },
    passwordViewToggle () {
      this.viewPassword = !this.viewPassword;
    },
    setPasswordHandle () {
      this.errors = [];
      this.info = "";

      if (!this.password) {
        this.errors.push(this.$t("AUTH.INFO.PASSWORD_EMPTY"));
      }

      if (!this.errors.length) {
        const params = {
          email: this.email,
          password: this.$base64.encode(this.password),
          code: this.code
        };

        this.loading = true;
        this.$API.UserPasswordRecoverySet(params, (data) => {
          this.loading = false;

          this.info = this.$t("SET_NEW_PASSWORD_SUCCESS");

          setTimeout(() => {
            if (data.access_token) {
              this.$store.dispatch("login", {
                token: data.access_token,
                user: data.user
              });
              this.$router.push(this.localePath("index"));
            }
          }, 3000);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.page-new-password {
  .title {
    text-align: center;
  }

  &__content {

  }
}

.new-password-box {
  margin: auto;
  width: 100%;
  max-width: 540px;
}
</style>
