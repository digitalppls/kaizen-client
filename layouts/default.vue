<template>
  <div>
    <site-header />
    <div class="site-content">
      <Nuxt ref="nuxt" />
    </div>
    <site-footer />
    <clear-storage v-if="isDev" />
  </div>
</template>

<script>
import VGlobalMixin from "~/mixins";
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";
import ClearStorage from "~/components/dev/clear-storage";

export default {
  components: {
    ClearStorage,
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
    isDev () {
      return process.env.isDev;
    }
  },
  watch: {
    $route () {
      setTimeout(this.FooterToBottom, 100);
    }
  },
  beforeDestroy () {
    this.$socket.off("currency_update", this.updateCurrency);
    this.$socket.off("user_update", this.updateUser);
  },
  mounted () {
    this.FooterToBottom();
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
      // последняя операция
      this.$socket.on("operation_update", this.updateOperation);
    },

    /** Обновление курсов валют */
    updateCurrency (r) {
      this.$store.dispatch("updateCurrency", r);
    },

    /** Обновление юзера */
    updateUser (r) {
      this.$store.dispatch("updateUser", r);
    },

    /** Обновление операцию */
    updateOperation (r) {
      // this.$store.dispatch("updateOperation", r);
      console.log("operation_update", r);
    },

    /** Прижимаем футер */
    FooterToBottom () {
      const bodyHeight = document.querySelector("body").offsetHeight;
      const siteContentHeight = document.querySelector(".site-content").offsetHeight;
      if (siteContentHeight <= bodyHeight) {
        document.querySelector("body").classList.add("footer-to-bottom");
      } else {
        document.querySelector("body").classList.remove("footer-to-bottom");
      }
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
