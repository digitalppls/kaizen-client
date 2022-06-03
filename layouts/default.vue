<template>
  <div>
    <site-header :key="`header-${lang}`" />
    <Nuxt ref="nuxt" />
    <site-footer :key="`footer-${lang}`" />
  </div>
</template>

<script>
import VGlobalMixin from "~/mixins";
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";

export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  mixins: [VGlobalMixin],
  middleware: ["auth"],
  data () {
    return {
      intervalUpdate: 0
    };
  },
  computed: {
    hastToken () {
      return this.$store.getters.hasToken;
    },
    lang () {
      return this.$i18n.locale;
    }
  },
  beforeDestroy () {
    this.$socket.off("currency_update", this.updateCurrency);
    this.$socket.off("user_update", this.updateUser);
  },
  mounted () {
    console.log("default");

    if (this.hastToken) {
      this.Update(); // запускаем сразу
    }
  },
  methods: {
    /** Обновление данных */
    Update () {
      // курсы валют
      this.$socket.on("currency_update", this.updateCurrency);
      // юзер
      this.$socket.on("user_update", this.updateUser);
      this.$API.User((r) => {
        this.$store.dispatch("updateUser", r.user);
      }, (e) => {
        if (e.message === "incorrect_access_token") {
          this.$store.dispatch("logout");
          this.$router.push(this.localePath("auth"));
        }
      });
      // последняя операция
      this.$socket.on("operation_update", this.updateOperation);
    },

    /** Обновление курсов валют */
    updateCurrency (r) {
      this.$store.dispatch("updateCurrency", r);
    },

    /** Обновление юзера */
    updateUser (r) {
      if (r.message === "incorrect_access_token") {
        this.$store.dispatch("logout");
        this.$router.push(this.localePath("auth"));
      }
      this.$store.dispatch("updateUser", r);
    },

    /** Обновление операцию */
    updateOperation (r) {
      // this.$store.dispatch("updateOperation", r);
      console.log("operation_update", r);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;

  @include respond-before("md") {
    flex-direction: row !important;
    //flex-wrap: wrap;
  }
}

.site-wrap {
  flex: 1;

  &::v-deep .header {
    position: sticky;
  }
}

.site-messenger {
  background: #000;
  height: 100%;

  @include respond-before("md") {
    width: 380px;
  }
}
</style>
