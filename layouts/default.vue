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
    window.clearInterval(this.intervalUpdate);
  },
  mounted () {
    this.FooterToBottom();

    console.log("default");

    this.$socket.on("user_update", (r) => {
      console.log("user_update", r);
    });
    this.$socket.on("operation_update", (r) => {
      console.log("operation_update", r);
    });

    if (this.hastToken) {
      this.Update(); // запускаем сразу
      // this.intervalUpdate = window.setInterval(this.Update, 5000); // и регулярно обновляем данные
    }
  },
  methods: {
    /** Load user update */
    Update () {
      // Обновляем юзера
      this.$API.User((data) => {
        this.$store.dispatch("updateUser", data.user);
      });

      // Обновляем курсы токенов
      this.$API.getCurrency((data) => {
        this.$store.dispatch("updateCurrency", data);
      });

      // Обновляем статусы реф. программы
      // this.$API.getStatusList((r) => {
      //   this.$store.dispatch("updateStatuses", r.statuses);
      // });
    },

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
